/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { IssueWorkItem } from './issueWorkItem';
import type { WorkItemType } from './workItemType';

export type WorkItemTypeActivityItemAllOf = {
  readonly id?: string;
  readonly target?: IssueWorkItem;
  readonly removed?: readonly WorkItemType[];
  readonly added?: readonly WorkItemType[];
};
