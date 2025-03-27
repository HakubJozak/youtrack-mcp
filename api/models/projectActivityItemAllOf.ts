/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { IssueKey } from './issueKey';
import type { Issue } from './issue';

export type ProjectActivityItemAllOf = {
  readonly id?: string;
  readonly added?: IssueKey;
  readonly removed?: IssueKey;
  readonly target?: Issue;
};
