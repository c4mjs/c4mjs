# Group Schema

```txt
C4MJS#/definitions/SourceWorkspaceDto/properties/groups/items
```

Workspace Group, sits inside a workspace to logically break up parts

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [source-workspace.schema.json\*](source-workspace.schema.json "open original schema") |

## items Type

`object` ([Group](source-workspace-definitions-group.md))

# items Properties

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                      |
| :------------------ | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| [id](#id)           | `string` | Required | cannot be null | [C4MJS Schema](source-workspace-definitions-group-properties-id.md "C4MJS#/definitions/SourceGroupDto/properties/id")           |
| [name](#name)       | `string` | Required | cannot be null | [C4MJS Schema](source-workspace-definitions-group-properties-name.md "C4MJS#/definitions/SourceGroupDto/properties/name")       |
| [people](#people)   | `array`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-group-properties-people.md "C4MJS#/definitions/SourceGroupDto/properties/people")   |
| [systems](#systems) | `array`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-group-properties-systems.md "C4MJS#/definitions/SourceGroupDto/properties/systems") |
| [tags](#tags)       | `array`  | Optional | cannot be null | [C4MJS Schema](source-workspace-definitions-group-properties-tags.md "C4MJS#/definitions/SourceGroupDto/properties/tags")       |

## id

ID, must be camel case

`id`

- is required

- Type: `string` ([ID](source-workspace-definitions-group-properties-id.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-group-properties-id.md "C4MJS#/definitions/SourceGroupDto/properties/id")

### id Type

`string` ([ID](source-workspace-definitions-group-properties-id.md))

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

- Type: `string` ([Name](source-workspace-definitions-group-properties-name.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-group-properties-name.md "C4MJS#/definitions/SourceGroupDto/properties/name")

### name Type

`string` ([Name](source-workspace-definitions-group-properties-name.md))

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

## people

People in the Group

`people`

- is optional

- Type: `object[]` ([Person](source-workspace-definitions-person.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-group-properties-people.md "C4MJS#/definitions/SourceGroupDto/properties/people")

### people Type

`object[]` ([Person](source-workspace-definitions-person.md))

## systems

Software Systems in the Group

`systems`

- is optional

- Type: `object[]` ([System](source-workspace-definitions-system.md))

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-group-properties-systems.md "C4MJS#/definitions/SourceGroupDto/properties/systems")

### systems Type

`object[]` ([System](source-workspace-definitions-system.md))

## tags

Tags that can be attached to an item, tags are included in the items class list so combine this with a custom stylesheet to customize the look of items where certain tags are present

`tags`

- is optional

- Type: `string[]`

- cannot be null

- defined in: [C4MJS Schema](source-workspace-definitions-group-properties-tags.md "C4MJS#/definitions/SourceGroupDto/properties/tags")

### tags Type

`string[]`

### tags Examples

```json
"cba"
```

```json
"critical"
```
