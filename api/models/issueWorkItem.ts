/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { BaseWorkItem } from './baseWorkItem';
import type { IssueWorkItemAllOf } from './issueWorkItemAllOf';
import type { IssueWorkItemType } from './issueWorkItemType';

export type IssueWorkItem = BaseWorkItem & IssueWorkItemAllOf & {
  $type: IssueWorkItemType;
};
