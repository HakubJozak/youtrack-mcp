/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { BundleElement } from './bundleElement';
import type { VersionBundleElementAllOf } from './versionBundleElementAllOf';
import type { VersionBundleElementType } from './versionBundleElementType';

export type VersionBundleElement = BundleElement & VersionBundleElementAllOf & {
  $type: VersionBundleElementType;
};
