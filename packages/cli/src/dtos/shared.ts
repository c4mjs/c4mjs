/**
 * @title ID
 * @description ID, must be camel case
 * @pattern ^([a-zA-Z0-9])*$
 * @examples ["bigBankPlc", "mainframeBankingSystem", "emailSystem", "webApplication"]
 */
export type ID = string;

/**
 * @title Name
 * @description Items Name, can be free text and will be used as the C4 Title within the boxes
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
 * @description Items Description, can be free text and will be displayed as the C4 Body within the boxes
 */
export type Description = string;

/**
 * @title Notes
 * @description Notes about the item, this is displayed in the tooltip when hovering the cursor over an item
 */
export type Notes = string;

/**
 * @title Tags
 * @description Tags that can be attached to an item, tags are included in the items class list so combine this with a custom stylesheet to customize the look of items where certain tags are present
 * @examples ["critical"]
 */
export type Tags = string[];

/**
 * @title Tech
 * @description Items Technology, this is displayed in the C4 Diagram Between the Title and Body
 * @examples ["React App", "Spring MVC Controller"]
 */
export type Tech = string;

/**
 * @title Dependencies
 * @description Multiline string representing the entities dependecies, seperate dependecies with a new line. 'this' can be used to reference the current item and gets replaced with its address at buildtime.
 * @examples ["this -> emailSystem : Sends Emails using"]
 */
export type Dependecies = string;

/**
 * @title External
 * @description If the item is external or not, this is used to swap the defaut color out for Greyscale as per the C4 standard.
 * @examples ["true", "false"]
 */
export type External = boolean;

/**
 * @title Deprecated
 * @description If the item is deprecated or not, this will append [DEPRECATED] to the end of the item and surround it in a dashed red stroke
 * @examples ["true", "false"]
 */
export type Deprecated = boolean;

/**
 * @title Cluster
 * @description Apply a cluster name to an item, match this with the same cluster name for another item to force them to be placed inside a Graphviz subgraph. This helps to keep items grouped together such as containers in a microservices architecture.
 * @examples ["legacy", "api"]
 */
export type Cluster = string;

/**
 * @title Styles
 * @description URL to a custom stylesheet, mix this with tags (which are applied as class names) to customize the look and appearance of nodes
 * @examples ["http://localhost:9876/workspace.css"]
 */
export type Styles = string;
