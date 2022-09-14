# Cluster Schema

```txt
C4MJS#/definitions/SourceContainerDto/properties/cluster
```

Apply a cluster name to an item, match this with the same cluster name for another item to force them to be placed inside a Graphviz subgraph. This helps to keep items grouped together such as containers in a microservices architecture.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [source-workspace.schema.json\*](source-workspace.schema.json "open original schema") |

## cluster Type

`string` ([Cluster](source-workspace-definitions-container-properties-cluster.md))

## cluster Examples

```json
"legacy"
```

```json
"api"
```
