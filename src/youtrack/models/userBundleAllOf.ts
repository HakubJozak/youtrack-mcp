/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { UserGroup } from "./userGroup";
import type { User } from "./user";

export type UserBundleAllOf = {
  readonly id?: string;
  groups?: UserGroup[];
  individuals?: User[];
  readonly aggregatedUsers?: readonly User[];
};
