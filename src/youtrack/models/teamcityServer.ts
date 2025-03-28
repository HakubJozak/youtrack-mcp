/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { VcsServer } from "./vcsServer";
import type { TeamcityServerAllOf } from "./teamcityServerAllOf";
import type { TeamcityServerType } from "./teamcityServerType";

/**
 * Represents a TeamCity server.
 */
export type TeamcityServer = VcsServer &
  TeamcityServerAllOf & {
    $type: TeamcityServerType;
  };
