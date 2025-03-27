/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { DatabaseMultiValueIssueCustomField } from './databaseMultiValueIssueCustomField';
import type { MultiBuildIssueCustomFieldAllOf } from './multiBuildIssueCustomFieldAllOf';
import type { MultiBuildIssueCustomFieldType } from './multiBuildIssueCustomFieldType';

/**
 * Represents a multi-value build-type custom field in the issue.
 */
export type MultiBuildIssueCustomField = DatabaseMultiValueIssueCustomField & MultiBuildIssueCustomFieldAllOf & {
  $type: MultiBuildIssueCustomFieldType;
};
