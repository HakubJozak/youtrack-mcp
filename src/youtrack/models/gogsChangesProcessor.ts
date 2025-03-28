/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { VcsHostingChangesProcessor } from "./vcsHostingChangesProcessor";
import type { GogsChangesProcessorAllOf } from "./gogsChangesProcessorAllOf";
import type { GogsChangesProcessorType } from "./gogsChangesProcessorType";

/**
 * Represents a Gogs integration configured for a project.
 */
export type GogsChangesProcessor = VcsHostingChangesProcessor &
  GogsChangesProcessorAllOf & {
    $type: GogsChangesProcessorType;
  };
