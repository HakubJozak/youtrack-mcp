/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { Project } from './project';

/**
 * Stores information about a project where the issue belongs or previously belonged. This entity appears as part of the ProjectActivityItem object.
 */
export interface IssueKey {
  readonly id?: string;
  readonly project?: Project;
  readonly numberInProject?: number;
  readonly $type?: string;
}
