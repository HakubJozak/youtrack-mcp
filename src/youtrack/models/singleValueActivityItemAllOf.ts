/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { SingleValueActivityItemAllOfAdded } from "./singleValueActivityItemAllOfAdded";
import type { SingleValueActivityItemAllOfRemoved } from "./singleValueActivityItemAllOfRemoved";

export type SingleValueActivityItemAllOf = {
  readonly id?: string;
  readonly added?: SingleValueActivityItemAllOfAdded;
  readonly removed?: SingleValueActivityItemAllOfRemoved;
};
