# Dependencies Schema

```txt
C4MJS#/definitions/SourceContainerDto/properties/deps
```

Multiline string representing the entities dependecies, seperate dependecies with a new line. 'this' can be used to reference the current item and gets replaced with its address at buildtime.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [source-workspace.schema.json\*](source-workspace.schema.json "open original schema") |

## deps Type

`string` ([Dependencies](source-workspace-definitions-container-properties-dependencies.md))

## deps Examples

```json
"this -> emailSystem : Sends Emails using"
```
