package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/openfda-sdk/go"
	"github.com/voxgig-sdk/openfda-sdk/go/core"

	vs "github.com/voxgig-sdk/openfda-sdk/go/utility/struct"
)

func TestN510kEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.N510k(nil)
		if ent == nil {
			t.Fatal("expected non-nil N510kEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := n510kBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "n510k." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENFDA_TEST_N___K_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		n510kRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.n510k", setup.data)))
		var n510kRef01Data map[string]any
		if len(n510kRef01DataRaw) > 0 {
			n510kRef01Data = core.ToMapAny(n510kRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = n510kRef01Data

		// LIST
		n510kRef01Ent := client.N510k(nil)
		n510kRef01Match := map[string]any{}

		n510kRef01ListResult, err := n510kRef01Ent.List(n510kRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, n510kRef01ListOk := n510kRef01ListResult.([]any)
		if !n510kRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", n510kRef01ListResult)
		}

	})
}

func n510kBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "n510k", "N510kTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read n510k test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse n510k test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"n510k01", "n510k02", "n510k03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENFDA_TEST_N___K_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENFDA_TEST_N___K_ENTID": idmap,
		"OPENFDA_TEST_LIVE":      "FALSE",
		"OPENFDA_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OPENFDA_TEST_N___K_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENFDA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewOpenfdaSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENFDA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENFDA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
