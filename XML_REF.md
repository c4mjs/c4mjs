# C4ModelJS - XML Reference

## Workspace

Workspaces are the top level and are what `c4model.app` uses to render and provide navigation etc.

Workspaces have a `name` and `version`

```xml
<Workspace name="Big Bank PLC" version="1.0.0">
    ...
</Workspace>
```

## Group

Workspaces have multiple groups, these logically divide your systems as necessary

The group sits inside the workspace

Groups have a `name`

```xml
<Group name="Internet Banking System">
		...
</Group>
```

## Person

Groups have people, these are used to represent actors in the system

The Person sits inside the group

People have a `name` and `description` and can be marked as `external`

People may contain relationships

```xml
<Person id="personalBankingCustomer-310381" name="Personal Banking Customer" desc="A customer of the bank, with personal bank accounts.">
  ...
</Person>
```

## System

## Container

## Component

## Relationship