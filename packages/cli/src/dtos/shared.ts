/**
 * @title ID
 * @description ID, must be camel case
 * @pattern ^([a-zA-Z0-9])*$
 * @examples ["bigBankPlc", "mainframeBankingSystem", "emailSystem", "webApplication"]
 */
export type ID = string;

/**
 * @title Name
 * @description Workspace name
 * @examples ["Big Bank PLC", "Mainframe Banking System", "Email System", "Web Application"]
 */
export type Name = string;

/**
 * @title Version
 * @description Version, must be in semantic version format
 * @format semver
 * @examples ["1.0.0"]
 */
export type Version = string;

/**
 * @title Description
 * @description Description to be used to convey information about the entity
 */
export type Description = string;

/**
 * @title Notes
 * @description Notes to be used to convey information about the entity
 */
export type Notes = string;

/**
 * @title Tags
 * @description Tags that can be attached to an entity
 * @examples ["cba", "critical"]
 */
export type Tags = string[];

/**
 * @title Tech
 * @description What technology does the entity use
 * @examples ["React App", "Spring MVC Controller"]
 */
export type Tech = string;

/**
 * @title Dependencies
 * @description Multiline string representing the entities dependecies, seperate dependecies with a new line. 'this' can be used to reference the current entity
 * @examples ["this -> emailSystem : Sends Emails using"]
 */
export type Dependecies = string;

/**
 * @title External
 * @description Is the entity external or not
 * @examples ["true", "false"]
 */
export type External = boolean;

/**
 * @title Deprecated
 * @description Is the entity deprecated or not
 * @examples ["true", "false"]
 */
export type Deprecated = boolean;

/**
 * @title Cluster
 * @description Cluster Name, logically groups entities when rendering
 * @examples ["legacy", "api"]
 */
export type Cluster = string;
