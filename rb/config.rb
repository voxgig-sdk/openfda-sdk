# Openfda SDK configuration

module OpenfdaConfig
  def self.make_config
    {
      "main" => {
        "name" => "Openfda",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.fda.gov",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "classification" => {},
          "drug" => {},
          "drugsfda" => {},
          "enforcement" => {},
          "event" => {},
          "label" => {},
          "n510k" => {},
          "ndc" => {},
          "nsde" => {},
          "pma" => {},
          "problem" => {},
          "shortage" => {},
          "substance" => {},
        },
      },
      "entity" => {
        "classification" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "classification",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/device/classification.json",
                  "parts" => [
                    "device",
                    "classification.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "drug" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "drug",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:aspirin",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/drug/event.json",
                  "parts" => [
                    "drug",
                    "event.json",
                  ],
                  "select" => {
                    "$action" => "event",
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "drugsfda" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "drugsfda",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/drug/drugsfda.json",
                  "parts" => [
                    "drug",
                    "drugsfda.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "enforcement" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "enforcement",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/device/enforcement.json",
                  "parts" => [
                    "device",
                    "enforcement.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/drug/enforcement.json",
                  "parts" => [
                    "drug",
                    "enforcement.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/food/enforcement.json",
                  "parts" => [
                    "food",
                    "enforcement.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 2,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "event" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "event",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cosmetic/event.json",
                  "parts" => [
                    "cosmetic",
                    "event.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/device/event.json",
                  "parts" => [
                    "device",
                    "event.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/food/event.json",
                  "parts" => [
                    "food",
                    "event.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 2,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "label" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "label",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/drug/label.json",
                  "parts" => [
                    "drug",
                    "label.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "n510k" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "n510k",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/device/510k.json",
                  "parts" => [
                    "device",
                    "510k.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "ndc" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "ndc",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/drug/ndc.json",
                  "parts" => [
                    "drug",
                    "ndc.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "nsde" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "nsde",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/other/nsde.json",
                  "parts" => [
                    "other",
                    "nsde.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "pma" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "pma",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/device/pma.json",
                  "parts" => [
                    "device",
                    "pma.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "problem" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "problem",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/tobacco/problem.json",
                  "parts" => [
                    "tobacco",
                    "problem.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "shortage" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "shortage",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/drug/shortages.json",
                  "parts" => [
                    "drug",
                    "shortages.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "substance" => {
          "fields" => [
            {
              "active" => true,
              "name" => "meta",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "substance",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "patient.reaction.reactionmeddrapt.exact",
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => "patient.drug.openfda.brand_name:lipitor",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/other/substance.json",
                  "parts" => [
                    "other",
                    "substance.json",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "search",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OpenfdaFeatures.make_feature(name)
  end
end
