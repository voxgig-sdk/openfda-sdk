# Openfda Golang SDK



The Golang SDK for the Openfda API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/openfda-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/openfda-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/openfda-sdk/go=../openfda-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/openfda-sdk/go"
)

func main() {
    client := sdk.NewOpenfdaSDK(map[string]any{
        "apikey": os.Getenv("OPENFDA_APIKEY"),
    })

    // List classification records — the value is the array of records itself.
    classifications, err := client.Classification(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range classifications.([]any) {
        fmt.Println(item)
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

classification, err := client.Classification(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(classification) // the loaded mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOpenfdaSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewOpenfdaSDK

```go
func NewOpenfdaSDK(options map[string]any) *OpenfdaSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OpenfdaSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenfdaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Classification` | `(data map[string]any) OpenfdaEntity` | Create a Classification entity instance. |
| `Drug` | `(data map[string]any) OpenfdaEntity` | Create a Drug entity instance. |
| `Drugsfda` | `(data map[string]any) OpenfdaEntity` | Create a Drugsfda entity instance. |
| `Enforcement` | `(data map[string]any) OpenfdaEntity` | Create an Enforcement entity instance. |
| `Event` | `(data map[string]any) OpenfdaEntity` | Create an Event entity instance. |
| `Label` | `(data map[string]any) OpenfdaEntity` | Create a Label entity instance. |
| `N510k` | `(data map[string]any) OpenfdaEntity` | Create a N510k entity instance. |
| `Ndc` | `(data map[string]any) OpenfdaEntity` | Create a Ndc entity instance. |
| `Nsde` | `(data map[string]any) OpenfdaEntity` | Create a Nsde entity instance. |
| `Pma` | `(data map[string]any) OpenfdaEntity` | Create a Pma entity instance. |
| `Problem` | `(data map[string]any) OpenfdaEntity` | Create a Problem entity instance. |
| `Shortage` | `(data map[string]any) OpenfdaEntity` | Create a Shortage entity instance. |
| `Substance` | `(data map[string]any) OpenfdaEntity` | Create a Substance entity instance. |

### Entity interface (OpenfdaEntity)

All entities implement the `OpenfdaEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    classification, err := client.Classification(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // classification is the loaded record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Classification

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/device/classification.json`

#### Drug

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/drug/event.json`

#### Drugsfda

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/drug/drugsfda.json`

#### Enforcement

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/device/enforcement.json`

#### Event

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/cosmetic/event.json`

#### Label

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/drug/label.json`

#### N510k

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/device/510k.json`

#### Ndc

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/drug/ndc.json`

#### Nsde

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/other/nsde.json`

#### Pma

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/device/pma.json`

#### Problem

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/tobacco/problem.json`

#### Shortage

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/drug/shortages.json`

#### Substance

| Field | Description |
| --- | --- |
| `"meta"` |  |
| `"result"` |  |

Operations: List.

API path: `/other/substance.json`



## Entities


### Classification

Create an instance: `classification := client.Classification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
classifications, err := client.Classification(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(classifications) // the array of records
```


### Drug

Create an instance: `drug := client.Drug(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
drugs, err := client.Drug(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(drugs) // the array of records
```


### Drugsfda

Create an instance: `drugsfda := client.Drugsfda(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
drugsfdas, err := client.Drugsfda(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(drugsfdas) // the array of records
```


### Enforcement

Create an instance: `enforcement := client.Enforcement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
enforcements, err := client.Enforcement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(enforcements) // the array of records
```


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
events, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(events) // the array of records
```


### Label

Create an instance: `label := client.Label(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
labels, err := client.Label(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(labels) // the array of records
```


### N510k

Create an instance: `n510k := client.N510k(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
n510ks, err := client.N510k(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(n510ks) // the array of records
```


### Ndc

Create an instance: `ndc := client.Ndc(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
ndcs, err := client.Ndc(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ndcs) // the array of records
```


### Nsde

Create an instance: `nsde := client.Nsde(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
nsdes, err := client.Nsde(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(nsdes) // the array of records
```


### Pma

Create an instance: `pma := client.Pma(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
pmas, err := client.Pma(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(pmas) // the array of records
```


### Problem

Create an instance: `problem := client.Problem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
problems, err := client.Problem(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(problems) // the array of records
```


### Shortage

Create an instance: `shortage := client.Shortage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
shortages, err := client.Shortage(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(shortages) // the array of records
```


### Substance

Create an instance: `substance := client.Substance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meta` | ``$OBJECT`` |  |
| `result` | ``$ARRAY`` |  |

#### Example: List

```go
substances, err := client.Substance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(substances) // the array of records
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/openfda-sdk/go/
├── openfda.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/openfda-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
classification := client.Classification(nil)
classification.Load(map[string]any{"id": "example_id"}, nil)

// classification.Data() now returns the loaded classification data
// classification.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
