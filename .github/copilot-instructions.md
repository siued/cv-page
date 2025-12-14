# Copilot Instruction Guide

## Project Snapshot

## Coding Guidelines

## Typing Patterns

```ts
await this.workExperienceModel
  .findById(id)
  .populate<{ company: CompanyDocument }>('company')
```

Extend document types with `Omit<Doc, 'field'> & { field: PopulatedDoc }` when a populated projection is required.

## Swagger & Decorators

## General Good Practices

- Husky hooks should use the new `husky` command wrapper; avoid the deprecated `#!/bin/sh` + `. "$(dirname "$0")/_/husky.sh"` shim when adding hooks.
