/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { UserGroup } from "./userGroup";
import type { RegisteredUsersGroupType } from "./registeredUsersGroupType";

/**
 * Represents a group containing all users excluding guest.
 */
export type RegisteredUsersGroup = UserGroup & {
  $type: RegisteredUsersGroupType;
};
