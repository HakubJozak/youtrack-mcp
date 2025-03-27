/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { IssueFolderType } from './issueFolderType';

/**
 * Represents an issue folder, such as a project, a saved search, or a tag.
 */
export interface IssueFolder {
  readonly id?: string;
  name?: string;
  $type: IssueFolderType;
}
