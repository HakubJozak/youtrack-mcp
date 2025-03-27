/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { ChangesProcessor } from './changesProcessor';
import type { JenkinsChangesProcessorAllOf } from './jenkinsChangesProcessorAllOf';
import type { JenkinsChangesProcessorType } from './jenkinsChangesProcessorType';

/**
 * Represents a Jenkins integration configured for a project.
 */
export type JenkinsChangesProcessor = ChangesProcessor & JenkinsChangesProcessorAllOf & {
  $type: JenkinsChangesProcessorType;
};
