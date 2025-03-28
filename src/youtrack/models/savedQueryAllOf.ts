/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { Issue } from "./issue";
import type { UserGroup } from "./userGroup";
import type { WatchFolderSharingSettings } from "./watchFolderSharingSettings";

export type SavedQueryAllOf = {
  readonly id?: string;
  query?: string;
  readonly issues?: readonly Issue[];
  visibleFor?: UserGroup;
  updateableBy?: UserGroup;
  readonly readSharingSettings?: WatchFolderSharingSettings;
  readonly updateSharingSettings?: WatchFolderSharingSettings;
};
