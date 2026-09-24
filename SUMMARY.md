# openFDA API

openFDA provides access to a variety of public data related to FDA-regulated products. It offers APIs for searching FDA data for drugs, devices, food, and other relevant categories crucial for healthcare decisions and research.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 13 entities and 17 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Classification

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Drug

Results: Successful response.

SDK operations: `list`.

### Drugsfda

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Enforcement

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Event

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Label

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### N510k

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Ndc

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Nsde

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Pma

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Problem

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Shortage

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Substance

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `results`: Array of result objects matching the query

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Classification | `list` | `GET /device/classification.json` | Not required |
| Drug | `list` | `GET /drug/event.json` | Not required |
| Drugsfda | `list` | `GET /drug/drugsfda.json` | Not required |
| Enforcement | `list` | `GET /device/enforcement.json` | Not required |
| Enforcement | `list` | `GET /drug/enforcement.json` | Not required |
| Enforcement | `list` | `GET /food/enforcement.json` | Not required |
| Event | `list` | `GET /cosmetic/event.json` | Not required |
| Event | `list` | `GET /device/event.json` | Not required |
| Event | `list` | `GET /food/event.json` | Not required |
| Label | `list` | `GET /drug/label.json` | Not required |
| N510k | `list` | `GET /device/510k.json` | Not required |
| Ndc | `list` | `GET /drug/ndc.json` | Not required |
| Nsde | `list` | `GET /other/nsde.json` | Not required |
| Pma | `list` | `GET /device/pma.json` | Not required |
| Problem | `list` | `GET /tobacco/problem.json` | Not required |
| Shortage | `list` | `GET /drug/shortages.json` | Not required |
| Substance | `list` | `GET /other/substance.json` | Not required |

## Connect to the API

- Production server: `https://api.fda.gov`

The default credential is sent in the `api_key` query.

Optional API key for higher rate limits. Without a key, requests are limited to 240 per minute and 1000 per day. With a key, limits increase to 240 per minute and 120000 per day.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /device/classification.json`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.fda.gov/device/classification.json'
```

Inspect the response using the Classification reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `openfda_list`: List records for an entity. Supported entities: `classification`, `drug`, `drugsfda`, `enforcement`, `event`, `label`, `n510k`, `ndc`, `nsde`, `pma`, `problem`, `shortage`, `substance`.
- `openfda_load`: Load one record for an entity. No active entity supports this operation.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

