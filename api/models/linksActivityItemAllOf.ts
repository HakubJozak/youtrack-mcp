/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { Issue } from './issue';

export type LinksActivityItemAllOf = {
  readonly id?: string;
  readonly added?: readonly Issue[];
  readonly removed?: readonly Issue[];
  readonly target?: Issue;
};
