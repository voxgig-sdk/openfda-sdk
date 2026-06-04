# Openfda TypeScript SDK

The TypeScript SDK for the Openfda API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install openfda
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpenfdaSDK } from 'openfda'

const client = new OpenfdaSDK({})
```

### 2. List classifications

```ts
const result = await client.Classification().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpenfdaSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new OpenfdaSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpenfdaSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENFDA_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### OpenfdaSDK

#### Constructor

```ts
new OpenfdaSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Classification(data?)` | `ClassificationEntity` | Create a Classification entity instance. |
| `Drug(data?)` | `DrugEntity` | Create a Drug entity instance. |
| `Drugsfda(data?)` | `DrugsfdaEntity` | Create a Drugsfda entity instance. |
| `Enforcement(data?)` | `EnforcementEntity` | Create a Enforcement entity instance. |
| `Event(data?)` | `EventEntity` | Create a Event entity instance. |
| `Label(data?)` | `LabelEntity` | Create a Label entity instance. |
| `N510k(data?)` | `N510kEntity` | Create a N510k entity instance. |
| `Ndc(data?)` | `NdcEntity` | Create a Ndc entity instance. |
| `Nsde(data?)` | `NsdeEntity` | Create a Nsde entity instance. |
| `Pma(data?)` | `PmaEntity` | Create a Pma entity instance. |
| `Problem(data?)` | `ProblemEntity` | Create a Problem entity instance. |
| `Shortage(data?)` | `ShortageEntity` | Create a Shortage entity instance. |
| `Substance(data?)` | `SubstanceEntity` | Create a Substance entity instance. |
| `tester(testopts?, sdkopts?)` | `OpenfdaSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpenfdaSDK.test(testopts?, sdkopts?)` | `OpenfdaSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenfdaSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Classification

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/device/classification.json`

#### Drug

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/drug/event.json`

#### Drugsfda

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/drug/drugsfda.json`

#### Enforcement

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/device/enforcement.json`

#### Event

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/cosmetic/event.json`

#### Label

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/drug/label.json`

#### N510k

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/device/510k.json`

#### Ndc

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/drug/ndc.json`

#### Nsde

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/other/nsde.json`

#### Pma

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/device/pma.json`

#### Problem

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/tobacco/problem.json`

#### Shortage

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

API path: `/drug/shortages.json`

#### Substance

| Field | Description |
| --- | --- |
| `meta` |  |
| `result` |  |

Operations: list.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
openfda/
├── src/
│   ├── OpenfdaSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpenfdaSDK } from 'openfda'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
