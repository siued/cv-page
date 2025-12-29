# Copilot Instruction Guide

## Project Snapshot

- NestJS monolith with discrete domains under `src/` (`company`, `work-experience`, `common`, etc.).
- `common/` module holds shared decorators (`ApiBadRequestResponse`, `BearerAuth`, `ApiNotFoundResponse`), validators (`ObjectIdValidationPipe`), enums, and pagination DTOs—reuse these instead of redefining swagger/error boilerplate.
- Domain folders follow controller/service/module/mapper/dto/schema patterns; mirror that structure for new features.

## Coding Guidelines

- Eliminate duplication: share logic via mappers/utilities or base DTOs (e.g., `WorkExperienceBaseDto`). Prefer extracting helpers to `common/` when used by multiple modules.
- NEVER introduce `any`, `unknown`, or unchecked casts. Lean on narrow interfaces, enums, and DTO classes for data flow.
- Keep files ASCII-only and add comments only where logic is non-obvious.
- Follow Nest conventions: defensive service methods, DTO validation decorators, and mapper utilities converting Mongoose docs to DTOs.
- Preserve existing eslint/prettier style (single quotes, trailing commas where configured).

## Typing Patterns

- **Subdocument typing:** See `work-experience/schema/work-experience.schema.ts` for `WorkExperienceDocumentOverride` + `HydratedDocument`. Replicate that approach when schemas contain `Types.DocumentArray` or similar subdocuments so inference stays intact.

- **Populate typing:** Use typed `populate` generics instead of casts, e.g.:

  ```ts
  await this.workExperienceModel

    .findById(id)

    .populate<{ company: CompanyDocument }>('company')
  ```

  Extend document types with `Omit<Doc, 'field'> & { field: PopulatedDoc }` when a populated projection is required.

## Swagger & Decorators

- Reuse the custom swagger helpers from `common/decorators` (`@ApiBadRequestResponse()`, `@ApiNotFoundResponse()`, `@BearerAuth()`) instead of repeating inline metadata.
- Tag routes consistently with `@ApiTags` and add `@ApiOperation` summaries for resources.

## General Good Practices

- Keep controllers thin: validation + delegation; complex logic belongs in services.
- Always validate/transform request DTOs via `ValidationPipe` or `@Body()` classes.
- Return DTOs via mapper classes so responses stay stable; never leak raw Mongoose documents.
- Prefer pure functions in `util/` for shared logic, and unit-test them (see `util/string.util.spec.ts`).
- Update or add tests alongside feature work when behavior changes, using the existing spec layout.
- Husky hooks should use the new `husky` command wrapper; avoid the deprecated `#!/bin/sh` + `. "$(dirname "$0")/_/husky.sh"` shim when adding hooks.
