import Constants from "./index";
export default {
  FILTER: {
    "TIME IS": {
      FOR_CRITERIA: {
        IS_ENABLED: false
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS: 3,
      UNIT: "minutes"
    },
    "TOTAL GOALS ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: false,
        OPTIONS: {
          HOME: {
            IS_ENABLED: false,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: false,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: false,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS : 2
    },
    "SCORE IS": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: false,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: false,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: false,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: false
      },
      MAX_DIGITS: 2
    },
    "POSSESSION IS": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: false,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      UNIT: "%",
      MAX_DIGITS : 2
    },
    "SUPREMACY IS": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: false,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      UNIT: "%",
      MAX_DIGITS : 2
    },

    "GOAL ATTEMPTS ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: true,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS: 2
    },
  
    "SHOTS ON TARGET ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: true,
            TEXT: "Overall"
          }
        },
       
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS: 2
    },
    "CORNERS ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: true,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS: 2
    },
    "MATCH STATUS IS": {
      FOR_CRITERIA: {
        IS_ENABLED: false
      },
      VALUE_CRITERIA: {
        IS_ENABLED: false
      },
      MATCH_STATUS: {
        IS_ENABLED: true,
        OPTIONS: {
          FIRST_HALF: {
            IS_ENABLED: true,
            TEXT: "Firt Half"
          },
          HALF_TIME: {
            IS_ENABLED: true,
            TEXT: "Half Time"
          },
          SECOND_HALF: {
            IS_ENABLED: true,
            TEXT: "Second Half"
          },
          EXTRA_TIME: {
            IS_ENABLED: true,
            TEXT: "Extra Time"
          }
        }
      },
      MAX_DIGITS: 2
    },
    "YELLOW CARDS ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: true,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS: 2
    },
    "RED CARDS ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: true,
            TEXT: "Overall"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS: 1
    },
    "LIVE ODDS ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: true,
            TEXT: "Draw"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },
      MAX_DIGITS: 4
    },
    "SP ODDS ARE": {
      FOR_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          HOME: {
            IS_ENABLED: true,
            TEXT: "Home"
          },
          AWAY: {
            IS_ENABLED: true,
            TEXT: "Away"
          },
          OVERALL: {
            IS_ENABLED: true,
            TEXT: "Draw"
          }
        }
      },
      VALUE_CRITERIA: {
        IS_ENABLED: true,
        OPTIONS: {
          OR_MORE: {
            IS_ENABLED: true,
            TEXT: "or more"
          },
          OR_LESS: {
            IS_ENABLED: true,
            TEXT: "or less"
          },
          EXACTLY: {
            IS_ENABLED: true,
            TEXT: "exactly"
          }
        }
      },MAX_DIGITS: 4
    }
  }
};
