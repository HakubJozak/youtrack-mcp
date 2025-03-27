/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { UserGroup } from './userGroup';
import type { User } from './user';

/**
 * Stores users and groups that have access to a tag.
 */
export interface TagSharingSettings {
  readonly id?: string;
  permittedGroups?: UserGroup[];
  permittedUsers?: User[];
  readonly $type?: string;
}
