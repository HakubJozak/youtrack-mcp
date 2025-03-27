import { z } from 'zod';

// YouTrack API Configuration Schema
export const YouTrackConfigSchema = z.object({
  baseUrl: z.string().url(),
  token: z.string(), // Allow any token format, as requirements may vary
  defaultProject: z.string().optional(), // Optional default project ID or shortName
});

export type YouTrackConfig = z.infer<typeof YouTrackConfigSchema>;

// Project Schema
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  description: z.string().optional(),
  // Add more fields as needed
});

export type Project = z.infer<typeof ProjectSchema>;

// Issue Schema
export const IssueSchema = z.object({
  id: z.string(),
  summary: z.string(),
  description: z.string().optional(),
  project: z.object({
    id: z.string(),
    shortName: z.string(),
  }),
  // Add more fields as needed
});

export type Issue = z.infer<typeof IssueSchema>;

/**
 * YouTrack Service for interacting with the YouTrack REST API
 */
export class YouTrackService {
  private config: YouTrackConfig;
  
  constructor(config: YouTrackConfig) {
    this.config = YouTrackConfigSchema.parse(config);
  }
  
  /**
   * Get the default project identifier if it exists
   * @returns The default project ID or shortName, or null if not set
   */
  getDefaultProject(): string | null {
    return this.config.defaultProject || null;
  }

  /**
   * Make an authenticated request to the YouTrack API
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = new URL(endpoint, this.config.baseUrl).toString();
    
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${this.config.token}`);
    headers.set('Accept', 'application/json');
    
    if (options.method === 'POST' || options.method === 'PUT') {
      headers.set('Content-Type', 'application/json');
    }
    
    const requestDetails = {
      method: options.method || 'GET',
      url,
      body: options.body ? JSON.parse(options.body as string) : undefined
    };
    console.debug('Request details:', JSON.stringify(requestDetails, null, 2));
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorBody);
      } catch (e) {
        errorDetails = errorBody;
      }
      
      throw new Error(
        `YouTrack API error: ${response.status} ${response.statusText}\n` +
        `URL: ${url}\n` +
        `Method: ${options.method || 'GET'}\n` +
        `Response: ${JSON.stringify(errorDetails, null, 2)}`
      );
    }
    
    return response.json() as Promise<T>;
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser() {
    return this.request('/api/users/me');
  }

  /**
   * Search for issues
   */
  async searchIssues(query: string, limit: number = 10) {
    // YouTrack API expects fields parameter to define what to return
    // Without it, the API might not return all the fields we need
    return this.request<Issue[]>(
      `/api/issues?query=${encodeURIComponent(query)}&$top=${limit}&fields=id,summary,description,project(id,shortName)`
    );
  }

  /**
   * Resolve an issue identifier (ID or readable ID) to an issue ID
   * @private
   */
  private async resolveIssueIdentifier(identifier: string): Promise<string> {
    // If it looks like a numeric ID, use it directly
    if (/^\d+$/.test(identifier)) {
      return identifier;
    }
    
    // Otherwise, try to find issue by readable ID (e.g. 'PROJ-123')
    // Query for the specific issue
    const query = `#${identifier}`;
    const issues = await this.searchIssues(query, 1);
    
    if (!issues || issues.length === 0) {
      throw new Error(`Issue with identifier '${identifier}' not found`);
    }
    
    return issues[0].id;
  }

  /**
   * Create a new issue
   * @param projectIdentifier Project ID or shortName. If not provided, uses default project.
   */
  async createIssue(projectIdentifier: string | null = null, summary: string, description?: string) {
    // Use provided project or fall back to default
    const projectIdOrName = projectIdentifier || this.getDefaultProject();
    
    if (!projectIdOrName) {
      throw new Error('Project identifier must be provided or set as default project in environment variables');
    }
    
    const projectId = await this.resolveProjectIdentifier(projectIdOrName);
    return this.request<Issue>('/api/issues?fields=id,summary,description,project(id,shortName)', {
      method: 'POST',
      body: JSON.stringify({
        project: { id: projectId },
        summary,
        description,
      }),
    });
  }

  /**
   * Update an existing issue
   */
  async updateIssue(issueIdentifier: string, updates: Partial<Omit<Issue, 'id'>>) {
    const issueId = await this.resolveIssueIdentifier(issueIdentifier);
    return this.request<Issue>(`/api/issues/${issueId}`, {
      method: 'POST',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Delete an issue
   */
  async deleteIssue(issueIdentifier: string) {
    const issueId = await this.resolveIssueIdentifier(issueIdentifier);
    return this.request(`/api/issues/${issueId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Get all projects
   */
  async getProjects() {
    return this.request<Project[]>(
      '/api/admin/projects?fields=id,name,shortName,description'
    );
  }

  /**
   * Resolve a project identifier (ID or shortName) to a project ID
   * @private
   */
  private async resolveProjectIdentifier(identifier: string): Promise<string> {
    // If identifier looks like a numeric ID, use it directly
    if (/^\d+$/.test(identifier)) {
      return identifier;
    }
    
    // Otherwise, try to find project by shortName
    const projects = await this.getProjects();
    const project = projects.find(p => p.shortName === identifier);
    
    if (!project) {
      throw new Error(`Project with identifier '${identifier}' not found`);
    }
    
    return project.id;
  }

  /**
   * Get a project by ID or shortName
   */
  async getProject(projectIdentifier: string) {
    const projectId = await this.resolveProjectIdentifier(projectIdentifier);
    return this.request<Project>(
      `/api/admin/projects/${projectId}?fields=id,name,shortName,description`
    );
  }

  /**
   * Create a new project
   */
  async createProject(name: string, shortName: string, description?: string) {
    return this.request<Project>('/api/admin/projects?fields=id,name,shortName,description', {
      method: 'POST',
      body: JSON.stringify({
        name,
        shortName,
        description,
      }),
    });
  }

  /**
   * Update an existing project
   */
  async updateProject(projectIdentifier: string, updates: Partial<Omit<Project, 'id'>>) {
    const projectId = await this.resolveProjectIdentifier(projectIdentifier);
    return this.request<Project>(`/api/admin/projects/${projectId}?fields=id,name,shortName,description`, {
      method: 'POST',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Delete a project
   */
  async deleteProject(projectIdentifier: string) {
    const projectId = await this.resolveProjectIdentifier(projectIdentifier);
    return this.request(`/api/admin/projects/${projectId}`, {
      method: 'DELETE',
    });
  }
}