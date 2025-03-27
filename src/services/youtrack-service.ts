import { z } from 'zod';

// YouTrack API Configuration Schema
export const YouTrackConfigSchema = z.object({
  baseUrl: z.string().url(),
  token: z.string().startsWith('perm:'),
});

export type YouTrackConfig = z.infer<typeof YouTrackConfigSchema>;

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
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`YouTrack API error: ${response.status} ${response.statusText}`);
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
    return this.request<Issue[]>(`/api/issues?query=${encodeURIComponent(query)}&$top=${limit}`);
  }

  /**
   * Create a new issue
   */
  async createIssue(projectId: string, summary: string, description?: string) {
    return this.request<Issue>('/api/issues', {
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
}