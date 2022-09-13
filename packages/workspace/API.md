<a name="ValidationService"></a>

## ValidationService

Ancillary validation service to perform validation on a workspace object

**Kind**: global variable

- [ValidationService](#ValidationService)
  - [.validateWorkspace(workspace)](#ValidationService.validateWorkspace)
  - [.assertValidWorkspace(workspace)](#ValidationService.assertValidWorkspace)

<a name="ValidationService.validateWorkspace"></a>

### ValidationService.validateWorkspace(workspace)

Validate the workspace returning any errors if present

**Kind**: static method of [<code>ValidationService</code>](#ValidationService)

| Param     | Type                      | Description               |
| --------- | ------------------------- | ------------------------- |
| workspace | <code>WorkspaceDto</code> | workspace to be validated |

<a name="ValidationService.assertValidWorkspace"></a>

### ValidationService.assertValidWorkspace(workspace)

Assert that the workspace is valid by throwing a ValidationError if any errors are present

**Kind**: static method of [<code>ValidationService</code>](#ValidationService)

| Param     | Type                      | Description               |
| --------- | ------------------------- | ------------------------- |
| workspace | <code>WorkspaceDto</code> | workspace to be validated |
