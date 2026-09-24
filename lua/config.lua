-- Openfda SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Openfda",
      slug = "openfda",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.fda.gov",
      auth = {
        prefix = "",
        ["in"] = "query",
        name = "api_key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["classification"] = {},
        ["drug"] = {},
        ["drugsfda"] = {},
        ["enforcement"] = {},
        ["event"] = {},
        ["label"] = {},
        ["n510k"] = {},
        ["ndc"] = {},
        ["nsde"] = {},
        ["pma"] = {},
        ["problem"] = {},
        ["shortage"] = {},
        ["substance"] = {},
      },
    },
    entity = {
      ["classification"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "classification",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/device/classification.json",
                ["segments"] = {
                  {
                    ["lit"] = "device",
                  },
                  {
                    ["lit"] = "classification.json",
                  },
                },
                ["parts"] = {
                  "device",
                  "classification.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["drug"] = {
        ["fields"] = {},
        ["name"] = "drug",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/drug/event.json",
                ["segments"] = {
                  {
                    ["lit"] = "drug",
                  },
                  {
                    ["lit"] = "event.json",
                  },
                },
                ["parts"] = {
                  "drug",
                  "event.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:aspirin",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "event",
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["drugsfda"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "drugsfda",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/drug/drugsfda.json",
                ["segments"] = {
                  {
                    ["lit"] = "drug",
                  },
                  {
                    ["lit"] = "drugsfda.json",
                  },
                },
                ["parts"] = {
                  "drug",
                  "drugsfda.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["enforcement"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "enforcement",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/device/enforcement.json",
                ["segments"] = {
                  {
                    ["lit"] = "device",
                  },
                  {
                    ["lit"] = "enforcement.json",
                  },
                },
                ["parts"] = {
                  "device",
                  "enforcement.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/drug/enforcement.json",
                ["segments"] = {
                  {
                    ["lit"] = "drug",
                  },
                  {
                    ["lit"] = "enforcement.json",
                  },
                },
                ["parts"] = {
                  "drug",
                  "enforcement.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/food/enforcement.json",
                ["segments"] = {
                  {
                    ["lit"] = "food",
                  },
                  {
                    ["lit"] = "enforcement.json",
                  },
                },
                ["parts"] = {
                  "food",
                  "enforcement.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["event"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "event",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cosmetic/event.json",
                ["segments"] = {
                  {
                    ["lit"] = "cosmetic",
                  },
                  {
                    ["lit"] = "event.json",
                  },
                },
                ["parts"] = {
                  "cosmetic",
                  "event.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/device/event.json",
                ["segments"] = {
                  {
                    ["lit"] = "device",
                  },
                  {
                    ["lit"] = "event.json",
                  },
                },
                ["parts"] = {
                  "device",
                  "event.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/food/event.json",
                ["segments"] = {
                  {
                    ["lit"] = "food",
                  },
                  {
                    ["lit"] = "event.json",
                  },
                },
                ["parts"] = {
                  "food",
                  "event.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["label"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "label",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/drug/label.json",
                ["segments"] = {
                  {
                    ["lit"] = "drug",
                  },
                  {
                    ["lit"] = "label.json",
                  },
                },
                ["parts"] = {
                  "drug",
                  "label.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["n510k"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "n510k",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/device/510k.json",
                ["segments"] = {
                  {
                    ["lit"] = "device",
                  },
                  {
                    ["lit"] = "510k.json",
                  },
                },
                ["parts"] = {
                  "device",
                  "510k.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["ndc"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "ndc",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/drug/ndc.json",
                ["segments"] = {
                  {
                    ["lit"] = "drug",
                  },
                  {
                    ["lit"] = "ndc.json",
                  },
                },
                ["parts"] = {
                  "drug",
                  "ndc.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["nsde"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "nsde",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/other/nsde.json",
                ["segments"] = {
                  {
                    ["lit"] = "other",
                  },
                  {
                    ["lit"] = "nsde.json",
                  },
                },
                ["parts"] = {
                  "other",
                  "nsde.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pma"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "pma",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/device/pma.json",
                ["segments"] = {
                  {
                    ["lit"] = "device",
                  },
                  {
                    ["lit"] = "pma.json",
                  },
                },
                ["parts"] = {
                  "device",
                  "pma.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["problem"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "problem",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/tobacco/problem.json",
                ["segments"] = {
                  {
                    ["lit"] = "tobacco",
                  },
                  {
                    ["lit"] = "problem.json",
                  },
                },
                ["parts"] = {
                  "tobacco",
                  "problem.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["shortage"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "shortage",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/drug/shortages.json",
                ["segments"] = {
                  {
                    ["lit"] = "drug",
                  },
                  {
                    ["lit"] = "shortages.json",
                  },
                },
                ["parts"] = {
                  "drug",
                  "shortages.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["substance"] = {
        ["fields"] = {
          {
            ["name"] = "meta",
            ["title"] = "Meta",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of result objects matching the query",
          },
        },
        ["name"] = "substance",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/other/substance.json",
                ["segments"] = {
                  {
                    ["lit"] = "other",
                  },
                  {
                    ["lit"] = "substance.json",
                  },
                },
                ["parts"] = {
                  "other",
                  "substance.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.reaction.reactionmeddrapt.exact",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "patient.drug.openfda.brand_name:lipitor",
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "search",
                    "skip",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
