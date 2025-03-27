/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * YouTrack REST API
 * YouTrack issue tracking and project management system
 * OpenAPI spec version: 2025.1
 */
import type { MultiValueActivityItem } from './multiValueActivityItem';
import type { LinksActivityItemAllOf } from './linksActivityItemAllOf';
import type { LinksActivityItemType } from './linksActivityItemType';

/**
 * Represents a change in the `issues` attribute of an IssueLink entity.
That is, each issue has the `links` attribute that contains an array of IssueLink entities.
Each of them represents a link between the target issue and a collection of issues.
For example, a set of issues to which the target one is linked as "Duplicated by".
The change in the list of these issues is represented by `LinksActivityItem` entity.
 */
export type LinksActivityItem = MultiValueActivityItem & LinksActivityItemAllOf & {
  $type: LinksActivityItemType;
};
