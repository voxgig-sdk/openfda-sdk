# Openfda Python SDK Reference

Complete API reference for the Openfda Python SDK.


## OpenfdaSDK

### Constructor

```python
from openfda_sdk import OpenfdaSDK

client = OpenfdaSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenfdaSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OpenfdaSDK.test()
```


### Instance Methods

#### `Classification(data=None)`

Create a new `ClassificationEntity` instance. Pass `None` for no initial data.

#### `Drug(data=None)`

Create a new `DrugEntity` instance. Pass `None` for no initial data.

#### `Drugsfda(data=None)`

Create a new `DrugsfdaEntity` instance. Pass `None` for no initial data.

#### `Enforcement(data=None)`

Create a new `EnforcementEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `Label(data=None)`

Create a new `LabelEntity` instance. Pass `None` for no initial data.

#### `N510k(data=None)`

Create a new `N510kEntity` instance. Pass `None` for no initial data.

#### `Ndc(data=None)`

Create a new `NdcEntity` instance. Pass `None` for no initial data.

#### `Nsde(data=None)`

Create a new `NsdeEntity` instance. Pass `None` for no initial data.

#### `Pma(data=None)`

Create a new `PmaEntity` instance. Pass `None` for no initial data.

#### `Problem(data=None)`

Create a new `ProblemEntity` instance. Pass `None` for no initial data.

#### `Shortage(data=None)`

Create a new `ShortageEntity` instance. Pass `None` for no initial data.

#### `Substance(data=None)`

Create a new `SubstanceEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ClassificationEntity

```python
classification = client.Classification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Classification().list()
for classification in results:
    print(classification)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClassificationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DrugEntity

```python
drug = client.Drug()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Drug().list()
for drug in results:
    print(drug)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DrugEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DrugsfdaEntity

```python
drugsfda = client.Drugsfda()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Drugsfda().list()
for drugsfda in results:
    print(drugsfda)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DrugsfdaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EnforcementEntity

```python
enforcement = client.Enforcement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Enforcement().list()
for enforcement in results:
    print(enforcement)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EnforcementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Event().list()
for event in results:
    print(event)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LabelEntity

```python
label = client.Label()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Label().list()
for label in results:
    print(label)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## N510kEntity

```python
n510k = client.N510k()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.N510k().list()
for n510k in results:
    print(n510k)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `N510kEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NdcEntity

```python
ndc = client.Ndc()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Ndc().list()
for ndc in results:
    print(ndc)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NdcEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NsdeEntity

```python
nsde = client.Nsde()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Nsde().list()
for nsde in results:
    print(nsde)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NsdeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PmaEntity

```python
pma = client.Pma()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Pma().list()
for pma in results:
    print(pma)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PmaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProblemEntity

```python
problem = client.Problem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Problem().list()
for problem in results:
    print(problem)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProblemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ShortageEntity

```python
shortage = client.Shortage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Shortage().list()
for shortage in results:
    print(shortage)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShortageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubstanceEntity

```python
substance = client.Substance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `dict` | No |  |
| `result` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Substance().list()
for substance in results:
    print(substance)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubstanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OpenfdaSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

