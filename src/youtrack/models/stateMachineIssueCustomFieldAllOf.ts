/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { StateMachineIssueCustomFieldAllOfValue } from "./stateMachineIssueCustomFieldAllOfValue";
import type { Event } from "./event";

export type StateMachineIssueCustomFieldAllOf = {
  readonly id?: string;
  readonly value?: StateMachineIssueCustomFieldAllOfValue;
  readonly event?: Event;
  readonly possibleEvents?: readonly Event[];
};
