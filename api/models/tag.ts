/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { WatchFolder } from './watchFolder';
import type { TagAllOf } from './tagAllOf';
import type { TagType } from './tagType';

export type Tag = WatchFolder & TagAllOf & {
  $type: TagType;
};
