/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { BaseBundle } from './baseBundle';
import type { StateBundleAllOf } from './stateBundleAllOf';
import type { StateBundleType } from './stateBundleType';

export type StateBundle = BaseBundle & StateBundleAllOf & {
  $type: StateBundleType;
};
