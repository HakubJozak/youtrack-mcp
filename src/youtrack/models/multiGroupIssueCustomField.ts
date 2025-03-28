/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { DatabaseMultiValueIssueCustomField } from "./databaseMultiValueIssueCustomField";
import type { MultiGroupIssueCustomFieldAllOf } from "./multiGroupIssueCustomFieldAllOf";
import type { MultiGroupIssueCustomFieldType } from "./multiGroupIssueCustomFieldType";

/**
 * Represents a multi-value group-type custom field in the issue.
 */
export type MultiGroupIssueCustomField = DatabaseMultiValueIssueCustomField &
  MultiGroupIssueCustomFieldAllOf & {
    $type: MultiGroupIssueCustomFieldType;
  };
