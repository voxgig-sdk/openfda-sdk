# Openfda Lua SDK



The Lua SDK for the Openfda API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Classification()` — each with the same small set of operations (`list`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/openfda-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("openfda_sdk")

local client = sdk.new({
  apikey = os.getenv("OPENFDA_APIKEY"),
})
```

### 2. List classification records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local classifications, err = client:Classification():list()
if err then error(err) end

for _, item in ipairs(classifications) do
  print(item["meta"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local classifications, err = client:Classification():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Classification():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### OpenfdaSDK

```lua
local sdk = require("openfda_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenfdaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local classification, err = client:Classification():load()
    if err then error(err) end
    -- classification is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local classification = client:Classification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local classifications, err = client:Classification():list()
```


### Drug

Create an instance: `local drug = client:Drug(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local drugs, err = client:Drug():list()
```


### Drugsfda

Create an instance: `local drugsfda = client:Drugsfda(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local drugsfdas, err = client:Drugsfda():list()
```


### Enforcement

Create an instance: `local enforcement = client:Enforcement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local enforcements, err = client:Enforcement():list()
```


### Event

Create an instance: `local event = client:Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local events, err = client:Event():list()
```


### Label

Create an instance: `local label = client:Label(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local labels, err = client:Label():list()
```


### N510k

Create an instance: `local n510k = client:N510k(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local n510ks, err = client:N510k():list()
```


### Ndc

Create an instance: `local ndc = client:Ndc(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local ndcs, err = client:Ndc():list()
```


### Nsde

Create an instance: `local nsde = client:Nsde(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local nsdes, err = client:Nsde():list()
```


### Pma

Create an instance: `local pma = client:Pma(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local pmas, err = client:Pma():list()
```


### Problem

Create an instance: `local problem = client:Problem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local problems, err = client:Problem():list()
```


### Shortage

Create an instance: `local shortage = client:Shortage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local shortages, err = client:Shortage():list()
```


### Substance

Create an instance: `local substance = client:Substance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | `table` |  |
| `result` | `table` |  |

#### Example: List

```lua
local substances, err = client:Substance():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── openfda_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`openfda_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local classification = client:Classification()
classification:list()

-- classification:data_get() now returns the classification data from the last list
-- classification:match_get() returns the last match criteria
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
