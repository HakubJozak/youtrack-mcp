/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { CustomField } from "./customField";
import type { AgileColumn } from "./agileColumn";

/**
 * Agile board columns settings.
 */
export interface ColumnSettings {
  readonly id?: string;
  field?: CustomField;
  columns?: AgileColumn[];
  readonly $type?: string;
}
