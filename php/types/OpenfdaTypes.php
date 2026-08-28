<?php
declare(strict_types=1);

// Typed models for the Openfda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Classification entity data model. */
class Classification
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Classification#list. */
class ClassificationListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Drug entity data model. */
class Drug
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Drug#list. */
class DrugListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Drugsfda entity data model. */
class Drugsfda
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Drugsfda#list. */
class DrugsfdaListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Enforcement entity data model. */
class Enforcement
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Enforcement#list. */
class EnforcementListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Event entity data model. */
class Event
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Event#list. */
class EventListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Label entity data model. */
class Label
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Label#list. */
class LabelListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** N510k entity data model. */
class N510k
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for N510k#list. */
class N510kListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Ndc entity data model. */
class Ndc
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Ndc#list. */
class NdcListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Nsde entity data model. */
class Nsde
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Nsde#list. */
class NsdeListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Pma entity data model. */
class Pma
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Pma#list. */
class PmaListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Problem entity data model. */
class Problem
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Problem#list. */
class ProblemListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Shortage entity data model. */
class Shortage
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Shortage#list. */
class ShortageListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

/** Substance entity data model. */
class Substance
{
    public ?array $meta = null;
    public ?array $results = null;
}

/** Request payload for Substance#list. */
class SubstanceListMatch
{
    public ?string $count = null;
    public ?int $limit = null;
    public ?string $search = null;
    public ?int $skip = null;
}

