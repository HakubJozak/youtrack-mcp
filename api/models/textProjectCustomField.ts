/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { SimpleProjectCustomField } from './simpleProjectCustomField';
import type { TextProjectCustomFieldAllOf } from './textProjectCustomFieldAllOf';
import type { TextProjectCustomFieldType } from './textProjectCustomFieldType';

/**
 * Represents settings of the text-type field in the project.
 */
export type TextProjectCustomField = SimpleProjectCustomField & TextProjectCustomFieldAllOf & {
  $type: TextProjectCustomFieldType;
};
