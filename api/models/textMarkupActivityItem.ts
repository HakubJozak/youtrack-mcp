/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { SimpleValueActivityItem } from './simpleValueActivityItem';
import type { TextMarkupActivityItemAllOf } from './textMarkupActivityItemAllOf';
import type { TextMarkupActivityItemType } from './textMarkupActivityItemType';

/**
 * Represents a change in a `String`-type attribute with the support of markup:
`description` in an Issue or IssueWorkItem, and the `text` of the IssueComment.
This entity lets you get the rendered text after the change.
 */
export type TextMarkupActivityItem = SimpleValueActivityItem & TextMarkupActivityItemAllOf & {
  $type: TextMarkupActivityItemType;
};
