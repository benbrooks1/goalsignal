<template>
  <td class="table-each-item mf-area">
    <table style="width:100%">
      <tr>
        <td class="multi-table-data">
          <span v-if="stat && stat.localTeam !== null">{{ stat.localTeam }}</span>
          <span v-else>-</span>
        </td>
      </tr>
      <tr>
        <td>
          <span v-if="stat &&  stat.localTeam !== null">{{ stat.visitorTeam }}</span>
          <span v-else>-</span>
        </td>
      </tr>
    </table>
  </td>
</template>

<script>
import {
  localTeamSupremacy,
  visitorTeamSupremacy
} from "./supremacyCalculation.js";
export default {
  data() {
    return {
      stat: Object
    };
  },
  components: {},
  props: ["child", "history", "type"],
  computed: {
    whichHistory() {
      switch (this.$store.getters.returnActiveMatchFlow) {
        case 1:
          return "fiveMinutesPrior";
        case 2:
          return "tenMinutesPrior";
        case 3:
          return "fifteenMinutesPrior";
      }
    }
  },
  watch: {
    whichHistory: function(old, newVal) {
      this.stat = this.computeData(this.child);
    }
  },
  beforeMount() {
    this.stat = this.computeData(this.child);
  },
  methods: {
    computeData(baseObject) {
      // console.log("##################",this.whichHistory);
      if (baseObject.dataHistory != null || undefined) {
        switch (this.type) {
          case "Possession":
            if (
              baseObject.dataHistory[this.whichHistory] != "-" && baseObject.dataHistory[this.whichHistory].stats &&
              baseObject.dataHistory[this.whichHistory].stats.data[0]
            ) {
              if (
                baseObject.dataHistory[this.whichHistory].stats.data[0]
                  .possessiontime !== null ||
                undefined
              ) {
                // console.log(
                //   baseObject.dataHistory[this.whichHistory].stats.data[0]
                //     .attacks.attacks
                // );
                return {
                  localTeam:
                    baseObject.stats.data[0].attacks.attacks -
                    baseObject.dataHistory[this.whichHistory].stats.data[0]
                      .attacks.attacks,
                  visitorTeam:
                    baseObject.stats.data[1].attacks.attacks -
                    baseObject.dataHistory[this.whichHistory].stats.data[1]
                      .attacks.attacks
                };
              } else {
                return {
                  localTeam: "-",
                  visitorTeam: "-"
                };
              }
            } else {
              return {
                localTeam: "-",
                visitorTeam: "-"
              };
            }

            break;
          case "Supremacyyy":
            if (
              baseObject.dataHistory[this.whichHistory] &&
              baseObject.dataHistory[this.whichHistory].supremacy
            ) {
              return {
                localTeam:
                  Math.round(
                    baseObject.dataHistory[this.whichHistory].supremacy
                      .localTeam
                  ) + "%",
                visitorTeam:
                  Math.round(
                    baseObject.dataHistory[this.whichHistory].supremacy
                      .visitorTeam
                  ) + "%"
              };
            } else {
              return {
                localTeam: "-",
                visitorTeam: "-"
              };
            }

            break;
          case "Dangerous-Attacks":
            if (
              baseObject.dataHistory[this.whichHistory] && baseObject.dataHistory[this.whichHistory].stats &&
              baseObject.dataHistory[this.whichHistory].stats.data[0] && baseObject.dataHistory[this.whichHistory].stats.data[0].attacks
            ) {
              return {
                localTeam:
                  baseObject.stats.data[0].attacks.dangerous_attacks -
                  Number(
                    baseObject.dataHistory[this.whichHistory].stats.data[0]
                      .attacks.dangerous_attacks
                  ),
                visitorTeam:
                  baseObject.stats.data[1].attacks.dangerous_attacks -
                  Number(
                    baseObject.dataHistory[this.whichHistory].stats.data[1]
                      .attacks.dangerous_attacks
                  )
              };
            } else {
              return {
                localTeam: "-",
                visitorTeam: "-"
              };
            }

            break;
          case "Shots":
            if (
              baseObject.dataHistory[this.whichHistory] && baseObject.dataHistory[this.whichHistory].stats &&
              baseObject.dataHistory[this.whichHistory].stats.data[0] && baseObject.dataHistory[this.whichHistory].stats.data[0].shots
            ) {
              return {
                localTeam:
                  baseObject.stats.data[0].shots.total -
                  baseObject.dataHistory[this.whichHistory].stats.data[0].shots
                    .total,
                visitorTeam:
                  baseObject.stats.data[1].shots.total -
                  baseObject.dataHistory[this.whichHistory].stats.data[1].shots
                    .total
              };
            } else {
              return {
                localTeam: "-",
                visitorTeam: "-"
              };
            }
            break;

          case "Corners":
               if (
              baseObject.dataHistory[this.whichHistory] && baseObject.dataHistory[this.whichHistory].stats &&
              baseObject.dataHistory[this.whichHistory].stats.data[0] && baseObject.stats.data[0].shots
            ) {
              return {
                localTeam:
                  baseObject.stats.data[0].corners -
                  baseObject.dataHistory[this.whichHistory].stats.data[0]
                    .corners,
                visitorTeam:
                  baseObject.stats.data[1].corners -
                  baseObject.dataHistory[this.whichHistory].stats.data[1]
                    .corners
              };
            } else {
              return {
                localTeam: "-",
                visitorTeam: "-"
              };
            }
            break;

          default:
            console.error({
              Error: "Invalid Match Flow Type"
            });
        }
      } else {
        return {
          localTeam: "-",
          visitorTeam: "-"
        };
      }
    }
  }
};
</script>
