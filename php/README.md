# Openfda PHP SDK

The PHP SDK for the Openfda API. Provides an entity-oriented interface using PHP conventions.


## Install
```bash
composer require voxgig/openfda-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openfda_sdk.php';

$client = new OpenfdaSDK([]);
```

### 2. List classifications

```php
[$result, $err] = $client->Classification(null)->list(null, null);
if ($err) { throw new \Exception($err); }

if (is_array($result)) {
    foreach ($result as $item) {
        $d = $item->data_get();
        echo $d["id"] . " " . $d["name"] . "\n";
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = OpenfdaSDK::test(null, null);

[$result, $err] = $client->Openfda(null)->load(
    ["id" => "test01"], null
);
// $result contains mock response data
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
| `Enforcement` | `($data): EnforcementEntity` | Create a Enforcement entity instance. |
| `Event` | `($data): EventEntity` | Create a Event entity instance. |
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
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

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

Create an instance: `const classification = client.Classification()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const classifications = await client.Classification().list()
```


### Drug

Create an instance: `const drug = client.Drug()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const drugs = await client.Drug().list()
```


### Drugsfda

Create an instance: `const drugsfda = client.Drugsfda()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const drugsfdas = await client.Drugsfda().list()
```


### Enforcement

Create an instance: `const enforcement = client.Enforcement()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const enforcements = await client.Enforcement().list()
```


### Event

Create an instance: `const event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const events = await client.Event().list()
```


### Label

Create an instance: `const label = client.Label()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const labels = await client.Label().list()
```


### N510k

Create an instance: `const n510k = client.N510k()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const n510ks = await client.N510k().list()
```


### Ndc

Create an instance: `const ndc = client.Ndc()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const ndcs = await client.Ndc().list()
```


### Nsde

Create an instance: `const nsde = client.Nsde()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const nsdes = await client.Nsde().list()
```


### Pma

Create an instance: `const pma = client.Pma()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const pmas = await client.Pma().list()
```


### Problem

Create an instance: `const problem = client.Problem()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const problems = await client.Problem().list()
```


### Shortage

Create an instance: `const shortage = client.Shortage()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const shortages = await client.Shortage().list()
```


### Substance

Create an instance: `const substance = client.Substance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```ts
const substances = await client.Substance().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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
