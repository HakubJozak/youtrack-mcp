/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { BuildBundle } from "./buildBundle";
import type { BuildBundleElement } from "./buildBundleElement";

export type BuildBundleCustomFieldDefaultsAllOf = {
  readonly id?: string;
  bundle?: BuildBundle;
  defaultValues?: BuildBundleElement[];
};
