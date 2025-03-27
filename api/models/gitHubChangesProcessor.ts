/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { VcsHostingChangesProcessor } from './vcsHostingChangesProcessor';
import type { GitHubChangesProcessorAllOf } from './gitHubChangesProcessorAllOf';
import type { GitHubChangesProcessorType } from './gitHubChangesProcessorType';

/**
 * Represents a GitHub integration configured for a project.
 */
export type GitHubChangesProcessor = VcsHostingChangesProcessor & GitHubChangesProcessorAllOf & {
  $type: GitHubChangesProcessorType;
};
