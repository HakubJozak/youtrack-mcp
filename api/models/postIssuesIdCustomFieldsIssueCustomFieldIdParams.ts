/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */

export type PostIssuesIdCustomFieldsIssueCustomFieldIdParams = {
/**
 * Set this parameter to `true` if no notifications should be sent on changes made by this request. This doesn't mute notifications sent by any workflow rules. Using this parameter requires <control>Apply Commands Silently</control> permission in all projects affected by the request. Available since 2021.3.
 */
muteUpdateNotifications?: boolean;
fields?: string;
};
