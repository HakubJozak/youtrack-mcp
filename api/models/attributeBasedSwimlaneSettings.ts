/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { SwimlaneSettings } from './swimlaneSettings';
import type { AttributeBasedSwimlaneSettingsAllOf } from './attributeBasedSwimlaneSettingsAllOf';
import type { AttributeBasedSwimlaneSettingsType } from './attributeBasedSwimlaneSettingsType';

export type AttributeBasedSwimlaneSettings = SwimlaneSettings & AttributeBasedSwimlaneSettingsAllOf & {
  $type: AttributeBasedSwimlaneSettingsType;
};
