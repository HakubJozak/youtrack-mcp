/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { MultiValueActivityItem } from "./multiValueActivityItem";
import type { WorkItemTypeActivityItemAllOf } from "./workItemTypeActivityItemAllOf";
import type { WorkItemTypeActivityItemType } from "./workItemTypeActivityItemType";

/**
 * Represents a change in the `type` attribute of the work item.
 */
export type WorkItemTypeActivityItem = MultiValueActivityItem &
  WorkItemTypeActivityItemAllOf & {
    $type: WorkItemTypeActivityItemType;
  };
