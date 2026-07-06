# Openfda TypeScript SDK Reference

Complete API reference for the Openfda TypeScript SDK.


## OpenfdaSDK

### Constructor

```ts
new OpenfdaSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenfdaSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenfdaSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenfdaSDK` instance in test mode.


### Instance Methods

#### `Classification(data?: object)`

Create a new `Classification` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ClassificationEntity` instance.

#### `Drug(data?: object)`

Create a new `Drug` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DrugEntity` instance.

#### `Drugsfda(data?: object)`

Create a new `Drugsfda` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DrugsfdaEntity` instance.

#### `Enforcement(data?: object)`

Create a new `Enforcement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnforcementEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `Label(data?: object)`

Create a new `Label` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LabelEntity` instance.

#### `N510k(data?: object)`

Create a new `N510k` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `N510kEntity` instance.

#### `Ndc(data?: object)`

Create a new `Ndc` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NdcEntity` instance.

#### `Nsde(data?: object)`

Create a new `Nsde` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NsdeEntity` instance.

#### `Pma(data?: object)`

Create a new `Pma` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PmaEntity` instance.

#### `Problem(data?: object)`

Create a new `Problem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProblemEntity` instance.

#### `Shortage(data?: object)`

Create a new `Shortage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ShortageEntity` instance.

#### `Substance(data?: object)`

Create a new `Substance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubstanceEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpenfdaSDK.test()`.

**Returns:** `OpenfdaSDK` instance in test mode.


---

## ClassificationEntity

```ts
const classification = client.Classification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Classification().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ClassificationEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DrugEntity

```ts
const drug = client.Drug()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Drug().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DrugEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DrugsfdaEntity

```ts
const drugsfda = client.Drugsfda()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Drugsfda().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DrugsfdaEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnforcementEntity

```ts
const enforcement = client.Enforcement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Enforcement().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnforcementEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Event().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LabelEntity

```ts
const label = client.Label()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Label().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LabelEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## N510kEntity

```ts
const n510k = client.N510k()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.N510k().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `N510kEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NdcEntity

```ts
const ndc = client.Ndc()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ndc().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NdcEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NsdeEntity

```ts
const nsde = client.Nsde()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Nsde().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NsdeEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PmaEntity

```ts
const pma = client.Pma()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Pma().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PmaEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProblemEntity

```ts
const problem = client.Problem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Problem().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProblemEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ShortageEntity

```ts
const shortage = client.Shortage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Shortage().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ShortageEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubstanceEntity

```ts
const substance = client.Substance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Record<string, any>` | No |  |
| `result` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Substance().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenfdaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OpenfdaSDK({
  feature: {
    test: { active: true },
  }
})
```

