/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { TimeZoneDescriptor } from './timeZoneDescriptor';
import type { DateFormatDescriptor } from './dateFormatDescriptor';
import type { Logo } from './logo';

export interface AppearanceSettings {
  readonly id?: string;
  timeZone?: TimeZoneDescriptor;
  dateFieldFormat?: DateFormatDescriptor;
  readonly logo?: Logo;
  readonly $type?: string;
}
