/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { Issue } from "./issue";
import type { Sprint } from "./sprint";

export type SprintActivityItemAllOf = {
  readonly id?: string;
  readonly target?: Issue;
  readonly removed?: readonly Sprint[];
  readonly added?: readonly Sprint[];
};
