/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { UserGroup } from "./userGroup";

export type VisibilityGroupActivityItemAllOf = {
  readonly id?: string;
  readonly added?: readonly UserGroup[];
  readonly removed?: readonly UserGroup[];
  readonly targetMember?: string;
  readonly targetSubMember?: string;
};
