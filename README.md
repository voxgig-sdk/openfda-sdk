# Openfda SDK

Query FDA public datasets on drugs, medical devices, food, tobacco, and animal/veterinary products through one JSON API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About openFDA API

[openFDA](https://open.fda.gov/) is an initiative of the [U.S. Food and Drug Administration](https://www.fda.gov/) that exposes a large slice of the agency's public datasets through a single JSON HTTP API served from `https://api.fda.gov`.

The API is organised by product area — drugs, medical devices, food, tobacco, and animal & veterinary products — with endpoints for adverse event reports, product labels, recall/enforcement notices, registrations, and reference catalogues such as NDC and substance lists.

Responses follow a consistent shape: a `meta` object (query metadata, disclaimer, last-updated timestamp) and a `results` array of matching records. The backend is Elasticsearch-based, so endpoints support rich field queries, full-text search, counts, and pagination via the standard `search`, `count`, `limit`, and `skip` parameters.

Access is open and CORS-enabled. An optional API key (from open.fda.gov) lifts the default per-IP request quota for production use.

## Try it

**TypeScript**
```bash
npm install openfda
```

**Python**
```bash
pip install openfda-sdk
```

**PHP**
```bash
composer require voxgig/openfda-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/openfda-sdk/go
```

**Ruby**
```bash
gem install openfda-sdk
```

**Lua**
```bash
luarocks install openfda-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenfdaSDK } from 'openfda'

const client = new OpenfdaSDK({})

// List all classifications
const classifications = await client.Classification().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o openfda-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "openfda": {
      "command": "/abs/path/to/openfda-mcp"
    }
  }
}
```

## Entities

The API exposes 13 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Classification** | Medical device classification records from the FDA product classification database (e.g. `/device/classification.json`). | `/device/classification.json` |
| **Drug** | Drug-related resources covering adverse event reports, labelling, and reference data under the `/drug/*` namespace. | `/drug/event.json` |
| **Drugsfda** | Records from the Drugs@FDA dataset of approved drug products and their application history (e.g. `/drug/drugsfda.json`). | `/drug/drugsfda.json` |
| **Enforcement** | Recall and enforcement reports issued by the FDA across drug, device, and food product areas (e.g. `/drug/enforcement.json`, `/device/enforcement.json`, `/food/enforcement.json`). | `/device/enforcement.json` |
| **Event** | Adverse event reports for drugs, devices, foods, and animal/veterinary products (e.g. `/drug/event.json`, `/device/event.json`, `/food/event.json`). | `/cosmetic/event.json` |
| **Label** | Structured Product Labeling (SPL) data for human and animal drugs, including indications, warnings, and dosage (e.g. `/drug/label.json`, `/animalandveterinary/event.json` companion labelling). | `/drug/label.json` |
| **N510k** | Medical device 510(k) premarket notification clearances (e.g. `/device/510k.json`). | `/device/510k.json` |
| **Ndc** | National Drug Code directory entries identifying marketed drug products (e.g. `/drug/ndc.json`). | `/drug/ndc.json` |
| **Nsde** | Comprehensive NDC SPL Data Elements file — a unified view of marketed drug listing data (e.g. `/drug/nsde.json`). | `/other/nsde.json` |
| **Pma** | Medical device Premarket Approval (PMA) submissions and supplements (e.g. `/device/pma.json`). | `/device/pma.json` |
| **Problem** | Reports of device problems and adverse experiences associated with FDA-regulated medical devices. | `/tobacco/problem.json` |
| **Shortage** | Drug shortage information drawn from FDA's drug shortage database (e.g. `/drug/shortages.json`). | `/drug/shortages.json` |
| **Substance** | Substance reference data identifying ingredients and chemical substances used in regulated products (e.g. `/other/substance.json`). | `/other/substance.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openfda_sdk import OpenfdaSDK

client = OpenfdaSDK({})

# List all classifications
classifications, err = client.Classification(None).list(None, None)
```

### PHP

```php
<?php
require_once 'openfda_sdk.php';

$client = new OpenfdaSDK([]);

// List all classifications
[$classifications, $err] = $client->Classification(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/openfda-sdk/go"

client := sdk.NewOpenfdaSDK(map[string]any{})

// List all classifications
classifications, err := client.Classification(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Openfda_sdk"

client = OpenfdaSDK.new({})

# List all classifications
classifications, err = client.Classification(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("openfda_sdk")

local client = sdk.new({})

-- List all classifications
local classifications, err = client:Classification(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenfdaSDK.test()
const result = await client.Classification().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenfdaSDK.test(None, None)
result, err = client.Classification(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenfdaSDK::test(null, null);
[$result, $err] = $client->Classification(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Classification(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenfdaSDK.test(nil, nil)
result, err = client.Classification(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Classification(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the openFDA API

- Upstream: [https://open.fda.gov/](https://open.fda.gov/)
- API docs: [https://open.fda.gov/apis/](https://open.fda.gov/apis/)

- Data is published by the U.S. Food and Drug Administration as a U.S. Government work and is generally in the public domain.
- The openFDA documentation notes that not all data has been validated for clinical or production use, so use it accordingly.
- Only publicly available data is served; no sensitive patient or proprietary information is exposed.
- Review the terms on [open.fda.gov](https://open.fda.gov/) before redistributing or building on the data.

---

Generated from the openFDA API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
