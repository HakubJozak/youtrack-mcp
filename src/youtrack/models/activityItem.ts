/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { ActivityItemAdded } from "./activityItemAdded";
import type { User } from "./user";
import type { ActivityCategory } from "./activityCategory";
import type { FilterField } from "./filterField";
import type { ActivityItemRemoved } from "./activityItemRemoved";
import type { ActivityItemTarget } from "./activityItemTarget";
import type { ActivityItemType } from "./activityItemType";

export interface ActivityItem {
  readonly id?: string;
  readonly added?: ActivityItemAdded;
  readonly author?: User;
  readonly category?: ActivityCategory;
  readonly field?: FilterField;
  readonly removed?: ActivityItemRemoved;
  readonly target?: ActivityItemTarget;
  readonly targetMember?: string;
  readonly timestamp?: number;
  $type: ActivityItemType;
}
