/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { BaseWorkItem } from "./baseWorkItem";
import type { WorkItemProjectAttribute } from "./workItemProjectAttribute";
import type { WorkItemAttributeValue } from "./workItemAttributeValue";

/**
 * Represents the attribute of a specific work item.
 */
export interface WorkItemAttribute {
  readonly id?: string;
  readonly workItem?: BaseWorkItem;
  readonly projectAttribute?: WorkItemProjectAttribute;
  value?: WorkItemAttributeValue;
  readonly name?: string;
  readonly $type?: string;
}
