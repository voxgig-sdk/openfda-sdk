
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Openfda',
        slug: "openfda",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.fda.gov",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      classification: {
      },

      drug: {
      },

      drugsfda: {
      },

      enforcement: {
      },

      event: {
      },

      label: {
      },

      n510k: {
      },

      ndc: {
      },

      nsde: {
      },

      pma: {
      },

      problem: {
      },

      shortage: {
      },

      substance: {
      },

    }
  }


  entity = {
    "classification": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "classification",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/device/classification.json",
              "parts": [
                "device",
                "classification.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "drug": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "type": "`$ARRAY`"
        }
      ],
      "name": "drug",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:aspirin",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/drug/event.json",
              "parts": [
                "drug",
                "event.json"
              ],
              "select": {
                "$action": "event",
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "drugsfda": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "drugsfda",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/drug/drugsfda.json",
              "parts": [
                "drug",
                "drugsfda.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "enforcement": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "enforcement",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/device/enforcement.json",
              "parts": [
                "device",
                "enforcement.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/drug/enforcement.json",
              "parts": [
                "drug",
                "enforcement.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/food/enforcement.json",
              "parts": [
                "food",
                "enforcement.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "event": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "event",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/cosmetic/event.json",
              "parts": [
                "cosmetic",
                "event.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/device/event.json",
              "parts": [
                "device",
                "event.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/food/event.json",
              "parts": [
                "food",
                "event.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "label": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "label",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/drug/label.json",
              "parts": [
                "drug",
                "label.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "n510k": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "n510k",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/device/510k.json",
              "parts": [
                "device",
                "510k.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ndc": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "ndc",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/drug/ndc.json",
              "parts": [
                "drug",
                "ndc.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "nsde": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "nsde",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/other/nsde.json",
              "parts": [
                "other",
                "nsde.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pma": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "pma",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/device/pma.json",
              "parts": [
                "device",
                "pma.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "problem": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "problem",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/tobacco/problem.json",
              "parts": [
                "tobacco",
                "problem.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "shortage": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "shortage",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/drug/shortages.json",
              "parts": [
                "drug",
                "shortages.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "substance": {
      "fields": [
        {
          "name": "meta",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "short": "Array of result objects matching the query",
          "type": "`$ARRAY`"
        }
      ],
      "name": "substance",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "patient.reaction.reactionmeddrapt.exact",
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "patient.drug.openfda.brand_name:lipitor",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/other/substance.json",
              "parts": [
                "other",
                "substance.json"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "search",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

