/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { BundleProjectCustomField } from "./bundleProjectCustomField";
import type { BundleElement } from "./bundleElement";

export type FieldBasedConditionAllOf = {
  readonly id?: string;
  field?: BundleProjectCustomField;
  values?: BundleElement[];
  showForNullValue?: boolean;
};
