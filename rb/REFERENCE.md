# Openfda Ruby SDK Reference

Complete API reference for the Openfda Ruby SDK.


## OpenfdaSDK

### Constructor

```ruby
require_relative 'Openfda_sdk'

client = OpenfdaSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenfdaSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OpenfdaSDK.test
```


### Instance Methods

#### `Classification(data = nil)`

Create a new `Classification` entity instance. Pass `nil` for no initial data.

#### `Drug(data = nil)`

Create a new `Drug` entity instance. Pass `nil` for no initial data.

#### `Drugsfda(data = nil)`

Create a new `Drugsfda` entity instance. Pass `nil` for no initial data.

#### `Enforcement(data = nil)`

Create a new `Enforcement` entity instance. Pass `nil` for no initial data.

#### `Event(data = nil)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Label(data = nil)`

Create a new `Label` entity instance. Pass `nil` for no initial data.

#### `N510k(data = nil)`

Create a new `N510k` entity instance. Pass `nil` for no initial data.

#### `Ndc(data = nil)`

Create a new `Ndc` entity instance. Pass `nil` for no initial data.

#### `Nsde(data = nil)`

Create a new `Nsde` entity instance. Pass `nil` for no initial data.

#### `Pma(data = nil)`

Create a new `Pma` entity instance. Pass `nil` for no initial data.

#### `Problem(data = nil)`

Create a new `Problem` entity instance. Pass `nil` for no initial data.

#### `Shortage(data = nil)`

Create a new `Shortage` entity instance. Pass `nil` for no initial data.

#### `Substance(data = nil)`

Create a new `Substance` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ClassificationEntity

```ruby
classification = client.Classification
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Classification.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ClassificationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DrugEntity

```ruby
drug = client.Drug
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Drug.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DrugEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DrugsfdaEntity

```ruby
drugsfda = client.Drugsfda
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Drugsfda.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DrugsfdaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EnforcementEntity

```ruby
enforcement = client.Enforcement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Enforcement.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EnforcementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventEntity

```ruby
event = client.Event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Event.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LabelEntity

```ruby
label = client.Label
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Label.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LabelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## N510kEntity

```ruby
n510k = client.N510k
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.N510k.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `N510kEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NdcEntity

```ruby
ndc = client.Ndc
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Ndc.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NdcEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NsdeEntity

```ruby
nsde = client.Nsde
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Nsde.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NsdeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PmaEntity

```ruby
pma = client.Pma
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Pma.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PmaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProblemEntity

```ruby
problem = client.Problem
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Problem.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProblemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ShortageEntity

```ruby
shortage = client.Shortage
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Shortage.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ShortageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SubstanceEntity

```ruby
substance = client.Substance
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `Hash` | No |  |
| `result` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Substance.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SubstanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OpenfdaSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

