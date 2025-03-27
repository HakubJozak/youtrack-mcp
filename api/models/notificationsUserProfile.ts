/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */

export interface NotificationsUserProfile {
  readonly id?: string;
  notifyOnOwnChanges?: boolean;
  emailNotificationsEnabled?: boolean;
  mentionNotificationsEnabled?: boolean;
  duplicateClusterNotificationsEnabled?: boolean;
  mailboxIntegrationNotificationsEnabled?: boolean;
  usePlainTextEmails?: boolean;
  autoWatchOnComment?: boolean;
  autoWatchOnCreate?: boolean;
  autoWatchOnVote?: boolean;
  autoWatchOnUpdate?: boolean;
  readonly $type?: string;
}
