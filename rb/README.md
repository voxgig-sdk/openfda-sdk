# Openfda Ruby SDK



The Ruby SDK for the Openfda API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Classification` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openfda-sdk/releases](https://github.com/voxgig-sdk/openfda-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Openfda_sdk"

client = OpenfdaSDK.new({
  "apikey" => ENV["OPENFDA_APIKEY"],
})
```

### 2. List classification records

```ruby
begin
  # list returns an Array of Classification records — iterate directly.
  classifications = client.Classification.list
  classifications.each do |item|
    puts "#{item["meta"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  classifications = client.Classification.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = OpenfdaSDK.test

# Entity ops return the bare mock record (raises on error).
classification = client.Classification.list()
puts classification
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = OpenfdaSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENFDA_TEST_LIVE=TRUE
OPENFDA_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### OpenfdaSDK

```ruby
require_relative "Openfda_sdk"
client = OpenfdaSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = OpenfdaSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenfdaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Classification` | `(data) -> ClassificationEntity` | Create a Classification entity instance. |
| `Drug` | `(data) -> DrugEntity` | Create a Drug entity instance. |
| `Drugsfda` | `(data) -> DrugsfdaEntity` | Create a Drugsfda entity instance. |
| `Enforcement` | `(data) -> EnforcementEntity` | Create an Enforcement entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `Label` | `(data) -> LabelEntity` | Create a Label entity instance. |
| `N510k` | `(data) -> N510kEntity` | Create a N510k entity instance. |
| `Ndc` | `(data) -> NdcEntity` | Create a Ndc entity instance. |
| `Nsde` | `(data) -> NsdeEntity` | Create a Nsde entity instance. |
| `Pma` | `(data) -> PmaEntity` | Create a Pma entity instance. |
| `Problem` | `(data) -> ProblemEntity` | Create a Problem entity instance. |
| `Shortage` | `(data) -> ShortageEntity` | Create a Shortage entity instance. |
| `Substance` | `(data) -> SubstanceEntity` | Create a Substance entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `OpenfdaError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `classification = client.Classification`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Classification records (raises on error).
classifications = client.Classification.list
```


### Drug

Create an instance: `drug = client.Drug`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Drug records (raises on error).
drugs = client.Drug.list
```


### Drugsfda

Create an instance: `drugsfda = client.Drugsfda`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Drugsfda records (raises on error).
drugsfdas = client.Drugsfda.list
```


### Enforcement

Create an instance: `enforcement = client.Enforcement`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Enforcement records (raises on error).
enforcements = client.Enforcement.list
```


### Event

Create an instance: `event = client.Event`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Event records (raises on error).
events = client.Event.list
```


### Label

Create an instance: `label = client.Label`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Label records (raises on error).
labels = client.Label.list
```


### N510k

Create an instance: `n510k = client.N510k`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of N510k records (raises on error).
n510ks = client.N510k.list
```


### Ndc

Create an instance: `ndc = client.Ndc`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Ndc records (raises on error).
ndcs = client.Ndc.list
```


### Nsde

Create an instance: `nsde = client.Nsde`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Nsde records (raises on error).
nsdes = client.Nsde.list
```


### Pma

Create an instance: `pma = client.Pma`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Pma records (raises on error).
pmas = client.Pma.list
```


### Problem

Create an instance: `problem = client.Problem`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Problem records (raises on error).
problems = client.Problem.list
```


### Shortage

Create an instance: `shortage = client.Shortage`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Shortage records (raises on error).
shortages = client.Shortage.list
```


### Substance

Create an instance: `substance = client.Substance`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `Hash` |  |
| `result` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Substance records (raises on error).
substances = client.Substance.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Openfda_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Openfda_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
classification = client.Classification
classification.list()

# classification.data_get now returns the classification data from the last list
# classification.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
