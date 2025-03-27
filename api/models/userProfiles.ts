/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { GeneralUserProfile } from './generalUserProfile';
import type { NotificationsUserProfile } from './notificationsUserProfile';
import type { TimeTrackingUserProfile } from './timeTrackingUserProfile';

/**
 * Represents a group of settings of a user profile in YouTrack.
 */
export interface UserProfiles {
  readonly id?: string;
  readonly general?: GeneralUserProfile;
  readonly notifications?: NotificationsUserProfile;
  readonly timetracking?: TimeTrackingUserProfile;
  readonly $type?: string;
}
