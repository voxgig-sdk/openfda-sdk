# Openfda PHP SDK



The PHP SDK for the Openfda API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Classification()` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openfda-sdk/releases](https://github.com/voxgig-sdk/openfda-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openfda_sdk.php';

$client = new OpenfdaSDK([
    "apikey" => getenv("OPENFDA_APIKEY"),
]);
```

### 2. List classification records

```php
try {
    // list() returns an array of Classification records — iterate directly.
    $classifications = $client->Classification()->list();
    foreach ($classifications as $item) {
        echo $item["meta"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $classifications = $client->Classification()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = OpenfdaSDK::test();

// Entity ops return the bare mock record (throws on error).
$classification = $client->Classification()->list();
print_r($classification);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OpenfdaSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENFDA_TEST_LIVE=TRUE
OPENFDA_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OpenfdaSDK

```php
require_once 'openfda_sdk.php';
$client = new OpenfdaSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OpenfdaSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OpenfdaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Classification` | `($data): ClassificationEntity` | Create a Classification entity instance. |
| `Drug` | `($data): DrugEntity` | Create a Drug entity instance. |
| `Drugsfda` | `($data): DrugsfdaEntity` | Create a Drugsfda entity instance. |
| `Enforcement` | `($data): EnforcementEntity` | Create an Enforcement entity instance. |
| `Event` | `($data): EventEntity` | Create an Event entity instance. |
| `Label` | `($data): LabelEntity` | Create a Label entity instance. |
| `N510k` | `($data): N510kEntity` | Create a N510k entity instance. |
| `Ndc` | `($data): NdcEntity` | Create a Ndc entity instance. |
| `Nsde` | `($data): NsdeEntity` | Create a Nsde entity instance. |
| `Pma` | `($data): PmaEntity` | Create a Pma entity instance. |
| `Problem` | `($data): ProblemEntity` | Create a Problem entity instance. |
| `Shortage` | `($data): ShortageEntity` | Create a Shortage entity instance. |
| `Substance` | `($data): SubstanceEntity` | Create a Substance entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Classification

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/device/classification.json`

#### Drug

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/drug/event.json`

#### Drugsfda

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/drug/drugsfda.json`

#### Enforcement

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/device/enforcement.json`

#### Event

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/cosmetic/event.json`

#### Label

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/drug/label.json`

#### N510k

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/device/510k.json`

#### Ndc

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/drug/ndc.json`

#### Nsde

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/other/nsde.json`

#### Pma

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/device/pma.json`

#### Problem

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/tobacco/problem.json`

#### Shortage

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/drug/shortages.json`

#### Substance

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: List.

API path: `/other/substance.json`



## Entities


### Classification

Create an instance: `$classification = $client->Classification();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Classification records (throws on error).
$classifications = $client->Classification()->list();
```


### Drug

Create an instance: `$drug = $client->Drug();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Drug records (throws on error).
$drugs = $client->Drug()->list();
```


### Drugsfda

Create an instance: `$drugsfda = $client->Drugsfda();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Drugsfda records (throws on error).
$drugsfdas = $client->Drugsfda()->list();
```


### Enforcement

Create an instance: `$enforcement = $client->Enforcement();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Enforcement records (throws on error).
$enforcements = $client->Enforcement()->list();
```


### Event

Create an instance: `$event = $client->Event();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Event records (throws on error).
$events = $client->Event()->list();
```


### Label

Create an instance: `$label = $client->Label();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Label records (throws on error).
$labels = $client->Label()->list();
```


### N510k

Create an instance: `$n510k = $client->N510k();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of N510k records (throws on error).
$n510ks = $client->N510k()->list();
```


### Ndc

Create an instance: `$ndc = $client->Ndc();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Ndc records (throws on error).
$ndcs = $client->Ndc()->list();
```


### Nsde

Create an instance: `$nsde = $client->Nsde();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Nsde records (throws on error).
$nsdes = $client->Nsde()->list();
```


### Pma

Create an instance: `$pma = $client->Pma();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Pma records (throws on error).
$pmas = $client->Pma()->list();
```


### Problem

Create an instance: `$problem = $client->Problem();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Problem records (throws on error).
$problems = $client->Problem()->list();
```


### Shortage

Create an instance: `$shortage = $client->Shortage();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Shortage records (throws on error).
$shortages = $client->Shortage()->list();
```


### Substance

Create an instance: `$substance = $client->Substance();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `array` |  |
| `result` | `array` |  |

#### Example: List

```php
// list() returns an array of Substance records (throws on error).
$substances = $client->Substance()->list();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── openfda_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`openfda_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$classification = $client->Classification();
$classification->list();

// $classification->data_get() now returns the classification data from the last list
// $classification->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
