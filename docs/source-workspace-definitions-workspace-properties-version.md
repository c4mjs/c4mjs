# Version Schema

```txt
C4MJS#/definitions/SourceWorkspaceDto/properties/version
```

Version, must be in semantic version format

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [source-workspace.schema.json\*](source-workspace.schema.json "open original schema") |

## version Type

`string` ([Version](source-workspace-definitions-workspace-properties-version.md))

## version Constraints

**unknown format**: the value of this string must follow the format: `semver`

## version Examples

```json
"1.0.0"
```
