# Person Schema

```txt
C4MJS#/definitions/SourceGroupDto/properties/people/items
```

Person inside a Workspace Group, represents an actor in the Group

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [source-workspace.schema.json\*](source-workspace.schema.json "open original schema") |

## items Type

`object` ([Person](source-workspace-definitions-person.md))

# items Properties

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                          |
| :-------------------- | :-------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| [deps](#deps)         | `string`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-person-properties-dependencies.md "C4MJS#/definitions/SourcePersonDto/properties/deps") |
| [desc](#desc)         | `string`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-person-properties-description.md "C4MJS#/definitions/SourcePersonDto/properties/desc")  |
| [external](#external) | `boolean` | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-person-properties-external.md "C4MJS#/definitions/SourcePersonDto/properties/external") |
| [id](#id)             | `string`  | Required | cannot be null | [C4MJS Schema](source-workspace-definitions-person-properties-id.md "C4MJS#/definitions/SourcePersonDto/properties/id")             |
| [name](#name)         | `string`  | Required | cannot be null | [C4MJS Schema](source-workspace-definitions-person-properties-name.md "C4MJS#/definitions/SourcePersonDto/properties/name")         |
| [tags](#tags)         | `array`   | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-person-properties-tags.md "C4MJS#/definitions/SourcePersonDto/properties/tags")         |

## deps

Multiline string representing the entities dependecies, seperate dependecies with a new line. 'this' can be used to reference the current entity

`deps`

*   is optional

*   Type: `string` ([Dependencies](source-workspace-definitions-person-properties-dependencies.md))

*   cannot be null

*   defined in: [C4MJS Schema](source-workspace-definitions-person-properties-dependencies.md "C4MJS#/definitions/SourcePersonDto/properties/deps")

### deps Type

`string` ([Dependencies](source-workspace-definitions-person-properties-dependencies.md))

### deps Examples

```json
"this -> emailSystem : Sends Emails using"
```

## desc

Description to be used to convey information about the entity

`desc`

*   is optional

*   Type: `string` ([Description](source-workspace-definitions-person-properties-description.md))

*   cannot be null

*   defined in: [C4MJS Schema](source-workspace-definitions-person-properties-description.md "C4MJS#/definitions/SourcePersonDto/properties/desc")

### desc Type

`string` ([Description](source-workspace-definitions-person-properties-description.md))

## external

Is the entity external or not

`external`

*   is optional

*   Type: `boolean` ([External](source-workspace-definitions-person-properties-external.md))

*   cannot be null

*   defined in: [C4MJS Schema](source-workspace-definitions-person-properties-external.md "C4MJS#/definitions/SourcePersonDto/properties/external")

### external Type

`boolean` ([External](source-workspace-definitions-person-properties-external.md))

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

*   is required

*   Type: `string` ([ID](source-workspace-definitions-person-properties-id.md))

*   cannot be null

*   defined in: [C4MJS Schema](source-workspace-definitions-person-properties-id.md "C4MJS#/definitions/SourcePersonDto/properties/id")

### id Type

`string` ([ID](source-workspace-definitions-person-properties-id.md))

### id Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^([a-zA-Z0-9])*$
```

[try pattern](https://regexr.com/?expression=%5E\(%5Ba-zA-Z0-9%5D\)*%24 "try regular expression with regexr.com")

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

Workspace name

`name`

*   is required

*   Type: `string` ([Name](source-workspace-definitions-person-properties-name.md))

*   cannot be null

*   defined in: [C4MJS Schema](source-workspace-definitions-person-properties-name.md "C4MJS#/definitions/SourcePersonDto/properties/name")

### name Type

`string` ([Name](source-workspace-definitions-person-properties-name.md))

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

## tags

Tags that can be attached to an entity

`tags`

*   is optional

*   Type: `string[]`

*   cannot be null

*   defined in: [C4MJS Schema](source-workspace-definitions-person-properties-tags.md "C4MJS#/definitions/SourcePersonDto/properties/tags")

### tags Type

`string[]`

### tags Examples

```json
"cba"
```

```json
"critical"
```
