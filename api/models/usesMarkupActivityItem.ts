/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { SimpleValueActivityItem } from './simpleValueActivityItem';
import type { UsesMarkupActivityItemAllOf } from './usesMarkupActivityItemAllOf';
import type { UsesMarkupActivityItemType } from './usesMarkupActivityItemType';

/**
 * Represents the change of the boolean flag that indicates whether YouTrack Wiki or Markdown
is used in the target entity as a markup language. If `true`, then the markdown is used.
Otherwise, YouTrack Wiki markup.
 */
export type UsesMarkupActivityItem = SimpleValueActivityItem & UsesMarkupActivityItemAllOf & {
  $type: UsesMarkupActivityItemType;
};
