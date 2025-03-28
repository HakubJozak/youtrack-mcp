/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { ProjectCustomField } from "./projectCustomField";
import type { BundleProjectCustomFieldType } from "./bundleProjectCustomFieldType";

/**
 * Represents project settings for a custom field with a defined set of values.
 */
export type BundleProjectCustomField = ProjectCustomField & {
  $type: BundleProjectCustomFieldType;
};
