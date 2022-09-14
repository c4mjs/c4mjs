# Container Schema

```txt
C4MJS#/definitions/SourceSystemDto/properties/containers/items
```

Container inside a workspace System, represents a container for code

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [source-workspace.schema.json\*](source-workspace.schema.json "open original schema") |

## items Type

`object` ([Container](source-workspace-definitions-container.md))

# items Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                    |
| :------------------------ | :-------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| [cluster](#cluster)       | `string`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-cluster.md "C4MJS#/definitions/SourceContainerDto/properties/cluster")       |
| [components](#components) | `array`   | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-components.md "C4MJS#/definitions/SourceContainerDto/properties/components") |
| [deprecated](#deprecated) | `boolean` | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-deprecated.md "C4MJS#/definitions/SourceContainerDto/properties/deprecated") |
| [deps](#deps)             | `string`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-dependencies.md "C4MJS#/definitions/SourceContainerDto/properties/deps")     |
| [desc](#desc)             | `string`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-description.md "C4MJS#/definitions/SourceContainerDto/properties/desc")      |
| [external](#external)     | `boolean` | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-external.md "C4MJS#/definitions/SourceContainerDto/properties/external")     |
| [id](#id)                 | `string`  | Required | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-id.md "C4MJS#/definitions/SourceContainerDto/properties/id")                 |
| [name](#name)             | `string`  | Required | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-name.md "C4MJS#/definitions/SourceContainerDto/properties/name")             |
| [notes](#notes)           | `string`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-notes.md "C4MJS#/definitions/SourceContainerDto/properties/notes")           |
| [tags](#tags)             | `array`   | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-tags.md "C4MJS#/definitions/SourceContainerDto/properties/tags")             |
| [tech](#tech)             | `string`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-container-properties-tech.md "C4MJS#/definitions/SourceContainerDto/properties/tech")             |

## cluster

Apply a cluster name to an item, match this with the same cluster name for another item to force them to be placed inside a Graphviz subgraph. This helps to keep items grouped together such as containers in a microservices architecture.

`cluster`

- is optional

- Type: `string` ([Cluster](source-workspace-definitions-container-properties-cluster.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-cluster.md "C4MJS#/definitions/SourceContainerDto/properties/cluster")

### cluster Type

`string` ([Cluster](source-workspace-definitions-container-properties-cluster.md))

### cluster Examples

```json
"legacy"
```

```json
"api"
```

## components

Container Components

`components`

- is optional

- Type: `object[]` ([Component](source-workspace-definitions-component.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-components.md "C4MJS#/definitions/SourceContainerDto/properties/components")

### components Type

`object[]` ([Component](source-workspace-definitions-component.md))

## deprecated

If the item is deprecated or not, this will append \[DEPRECATED] to the end of the item and surround it in a dashed red stroke

`deprecated`

- is optional

- Type: `boolean` ([Deprecated](source-workspace-definitions-container-properties-deprecated.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-deprecated.md "C4MJS#/definitions/SourceContainerDto/properties/deprecated")

### deprecated Type

`boolean` ([Deprecated](source-workspace-definitions-container-properties-deprecated.md))

### deprecated Examples

```json
"true"
```

```json
"false"
```

## deps

Multiline string representing the entities dependecies, seperate dependecies with a new line. 'this' can be used to reference the current item and gets replaced with its address at buildtime.

`deps`

- is optional

- Type: `string` ([Dependencies](source-workspace-definitions-container-properties-dependencies.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-dependencies.md "C4MJS#/definitions/SourceContainerDto/properties/deps")

### deps Type

`string` ([Dependencies](source-workspace-definitions-container-properties-dependencies.md))

### deps Examples

```json
"this -> emailSystem : Sends Emails using"
```

## desc

Items Description, can be free text and will be displayed as the C4 Body within the boxes

`desc`

- is optional

- Type: `string` ([Description](source-workspace-definitions-container-properties-description.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-description.md "C4MJS#/definitions/SourceContainerDto/properties/desc")

### desc Type

`string` ([Description](source-workspace-definitions-container-properties-description.md))

## external

If the item is external or not, this is used to swap the defaut color out for Greyscale as per the C4 standard.

`external`

- is optional

- Type: `boolean` ([External](source-workspace-definitions-container-properties-external.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-external.md "C4MJS#/definitions/SourceContainerDto/properties/external")

### external Type

`boolean` ([External](source-workspace-definitions-container-properties-external.md))

### external Examples

```json
"true"
```

```json
"false"
```

## id

ID, must be camel case

`id`

- is required

- Type: `string` ([ID](source-workspace-definitions-container-properties-id.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-id.md "C4MJS#/definitions/SourceContainerDto/properties/id")

### id Type

`string` ([ID](source-workspace-definitions-container-properties-id.md))

### id Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^([a-zA-Z0-9])*$
```

[try pattern](<https://regexr.com/?expression=%5E(%5Ba-zA-Z0-9%5D)*%24> "try regular expression with regexr.com")

### id Examples

```json
"bigBankPlc"
```

```json
"mainframeBankingSystem"
```

```json
"emailSystem"
```

```json
"webApplication"
```

## name

Items Name, can be free text and will be used as the C4 Title within the boxes

`name`

- is required

- Type: `string` ([Name](source-workspace-definitions-container-properties-name.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-name.md "C4MJS#/definitions/SourceContainerDto/properties/name")

### name Type

`string` ([Name](source-workspace-definitions-container-properties-name.md))

### name Examples

```json
"Big Bank PLC"
```

```json
"Mainframe Banking System"
```

```json
"Email System"
```

```json
"Web Application"
```

## notes

Notes about the item, this is displayed in the tooltip when hovering the cursor over an item

`notes`

- is optional

- Type: `string` ([Notes](source-workspace-definitions-container-properties-notes.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-notes.md "C4MJS#/definitions/SourceContainerDto/properties/notes")

### notes Type

`string` ([Notes](source-workspace-definitions-container-properties-notes.md))

## tags

Tags that can be attached to an item, tags are included in the items class list so combine this with a custom stylesheet to customize the look of items where certain tags are present

`tags`

- is optional

- Type: `string[]`

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-tags.md "C4MJS#/definitions/SourceContainerDto/properties/tags")

### tags Type

`string[]`

### tags Examples

```json
"cba"
```

```json
"critical"
```

## tech

Items Technology, this is displayed in the C4 Diagram Between the Title and Body

`tech`

- is optional

- Type: `string` ([Tech](source-workspace-definitions-container-properties-tech.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-container-properties-tech.md "C4MJS#/definitions/SourceContainerDto/properties/tech")

### tech Type

`string` ([Tech](source-workspace-definitions-container-properties-tech.md))

### tech Examples

```json
"React App"
```

```json
"Spring MVC Controller"
```
