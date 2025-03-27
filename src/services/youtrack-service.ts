import { z } from 'zod';

// YouTrack API Configuration Schema
export const YouTrackConfigSchema = z.object({
  baseUrl: z.string().url(),
  token: z.string(), // Allow any token format, as requirements may vary
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
   * Create a new issue
   */
  async createIssue(projectId: string, summary: string, description?: string) {
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
  async updateIssue(issueId: string, updates: Partial<Omit<Issue, 'id'>>) {
    return this.request<Issue>(`/api/issues/${issueId}`, {
      method: 'POST',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Delete an issue
   */
  async deleteIssue(issueId: string) {
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
   * Get a project by ID
   */
  async getProject(projectId: string) {
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
  async updateProject(projectId: string, updates: Partial<Omit<Project, 'id'>>) {
    return this.request<Project>(`/api/admin/projects/${projectId}?fields=id,name,shortName,description`, {
      method: 'POST',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string) {
    return this.request(`/api/admin/projects/${projectId}`, {
      method: 'DELETE',
    });
  }
}