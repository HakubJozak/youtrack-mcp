/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { Project } from "./project";
import type { FieldStyle } from "./fieldStyle";

/**
 * Represents color setting for one project on the board.
 */
export interface ProjectColor {
  readonly id?: string;
  readonly project?: Project;
  readonly color?: FieldStyle;
  readonly $type?: string;
}
