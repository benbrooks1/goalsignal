<template>
  <div>
    <div class="stat-table">
      <table-head />
      <div id="Table_Body">
        <div v-for="item in tableData" :key="item.id">
          <league-row :key="item.id" :item="item" />
          <div
            v-for="child in item.matches"
            class="Match_Row table-data eng-body stat-row-highlight"
            @click="selectMatch(child)"
          >
            <!-- <div class="Scanner_Checkbox">
              <p-check
                @change="changes(child.id)"
                :checked="returnSelectedMatches.includes(child.id)"
                class="p-icon p-smooth"
                color="success"
              ></p-check>
            </div>-->
            <div class="Scanner_Match_Time">
              <div
                v-if="child.time.status == 'FT' || child.time.status == 'HT' || child.time.status == 'ET' "
              >{{ child.time.status }}</div>
              <div>
                {{child.time.minute}}
                <span v-if="child.time.minute">'</span>
                <span v-else>--</span>
              </div>
            </div>
            <div class="Scanner_Alert_Circle alert-circle-outer">
              <span v-if="tableMode !== 'signals'" class>
                
               <font-awesome-icon
                  
                  icon="bell"
                  size="lg"
                  
                  class="pointer"
                 
                />
              </span>
            </div>
            <div class="Scanner_Odds table-each-item live-odd-data-out">
                 <div
                class="SP_Odds_Divider"
                v-if="child.flatOdds != null||undefined"
                v-for="odds in child.flatOdds.data"
              >
                <span v-for="value in odds.odds" class="sp-odd-data">
                  <span class="strong">({{value.value}})</span>
                </span>
              </div>
              <div
                class="Live_Odds"
                v-if="child.inplayOdds != null||undefined"
                v-for="odds in child.inplayOdds.data"
                style="width:100%"
              >
                <span v-for="value in odds.values" class="live-odd-data">
                  <span class="strong">{{value.value}}</span>
                </span>
              </div>
           
            </div>
            <div class="Scanner_Teams table-each-item teams">
              <table style="width:100%">
                <tr>
                  <td class="multi-table-data largest-box-data">
                    <div class="teamContainer">
                      <img
                        class="team_logo"
                        v-if="child.localTeam.data.logo_path !== null||undefined"
                        :src="child.localTeam.data.logo_path"
                      />

                      <span v-else></span>
                      <p class="dots">{{child.localTeam.data.name}}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="largest-box-data">
                    <div class="teamContainer">
                      <img
                        class="team_logo"
                        v-if="child.visitorTeam.data.logo_path !== null||undefined"
                        :src="child.visitorTeam.data.logo_path"
                      />

                      <span v-else></span>
                      <p class="dots">{{child.visitorTeam.data.name}}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Scores table-each-item">
              <table class="score-count">
                <tr>
                  <td class="multi-table-data">
                    <span class="bold-no">{{child.scores.localteam_score}}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="bold-no">{{child.scores.visitorteam_score}}</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Supremacy table-each-item">
              <table style="width:100%">
                <tr v-if="child.supremacy.localTeam != null||undefined">
                  <td
                    class="multi-table-data"
                    :class="Math.round(child.supremacy.localTeam) >= 61?'text-green': Math.round(child.supremacy.localTeam)<=39? 'text-red':''"
                  >{{Math.round(child.supremacy.localTeam)}}%</td>
                </tr>
                <tr v-else>
                  <td class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>
                <tr v-if="child.supremacy.visitorTeam != null||undefined">
                  <td
                    :class="Math.round(child.supremacy.visitorTeam) >= 61?'text-green': Math.round(child.supremacy.visitorTeam)<=39? 'text-red':''"
                  >{{Math.round(child.supremacy.visitorTeam)}}%</td>
                </tr>
                <tr v-else>
                  <td>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Possession table-each-item">
              <table style="width:100%">
                <tr>
                  <td v-if="child.stats != null||undefined" class="multi-table-data">
                    <span v-if="child.stats.data[0] != null||undefined">
                      <span
                        v-if="child.stats.data[0].possessiontime != null||undefined"
                      >{{ child.stats.data[0].possessiontime + '%'}}</span>
                      <span v-else>-</span>
                    </span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>

                <tr>
                  <td v-if="child.stats.data[1] != null||undefined" class>
                    <span v-if="child.stats.data[1] != null||undefined">
                      <span
                        v-if="child.stats.data[1].possessiontime != null||undefined"
                      >{{child.stats.data[1].possessiontime + '%'}}</span>
                      <span v-else>-</span>
                    </span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>

            <div class="Scanner_Shots table-each-item">
              <table style="width:100%">
                <tr>
                  <td v-if="child.stats.data[0] != null||undefined" class="multi-table-data">
                    <span
                      v-if="child.stats.data[0].shots != null||undefined"
                    >{{child.stats.data[0].shots.total}}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>

                <tr>
                  <td v-if="child.stats.data[1]  != null||undefined">
                    <span
                      v-if="child.stats.data[1].shots!= null||undefined"
                    >{{child.stats.data[1].shots.total}}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_On_Target table-each-item">
              <table style="width:100%">
                <tr>
                  <td v-if="child.stats.data[0] != null||undefined" class="multi-table-data">
                    <span
                      v-if="child.stats.data[0].shots != null||undefined"
                    >{{child.stats.data[0].shots.ongoal}}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>

                <tr>
                  <td v-if="child.stats.data[1] != null||undefined" class>
                    <span
                      v-if="child.stats.data[1].shots != null||undefined"
                    >{{child.stats.data[1].shots.ongoal}}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Inside_Dangerous_Attacks table-each-item">
              <table style="width:100%">
                <tr>
                  <td class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>

                <tr>
                  <td class>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Corners table-each-item">
              <table style="width:100%">
                <tr>
                  <td v-if="child.stats.data[0] != null||undefined" class="multi-table-data">
                    <span
                      v-if="child.stats.data[0].corners != null||undefined"
                    >{{child.stats.data[0].corners}}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>
                <tr>
                  <td v-if="child.stats.data[1] != null||undefined">
                    <span
                      v-if="child.stats.data[1].corners != null||undefined"
                    >{{child.stats.data[1].corners}}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Yellow_Cards table-each-item">
              <table style="width:100%">
                <tr>
                  <td v-if="child.stats.data[0] != null||undefined" class="multi-table-data">
                    <span>{{child.stats.data[0].yellowcards}}</span>
                    <span v-if="!child.stats.data[0].yellowcards">-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>
                <tr>
                  <td v-if="child.stats.data[1] != null||undefined">
                    <span>{{child.stats.data[0].yellowcards}}</span>
                    <span v-if="!child.stats.data[0].yellowcards">-</span>
                  </td>
                  <td v-else class>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>
            <match-flow-item :child="child" type="Supremacy" />
            <match-flow-item :child="child" type="Dangerous-Attacks" />
            <match-flow-item :child="child" type="Shots" />
            <match-flow-item :child="child" type="Corners" />
            <preassure-guage :child="child" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const topTable = () => import("./Components/Top-Table");
const tableHead = () => import("./Components/Table-Head");
const leagueRow = () => import("./Components/League-Row");
const noData = () => import("./Components/No-Data");
const matchFlowItem = () => import("./Table_Items/Match_Flow/Match_Flow");
const yellowCards = () => import("./Table_Items/Yellow_Cards/Yellow_Cards");
const redCards = () => import("./Table_Items/Red_Cards/Red_Cards");
const preassureGuage = () => import("./Table_Items/Gauge/Guage");
const alt = () => import("./Table_Items/Alt");
const checkIcon = () => import("vue-material-design-icons/Check.vue");
export default {
  data() {
    return {
      check: false
    };
  },
  computed: {
    returnSelectedMatches() {
      return this.$store.getters.returnSelectedMatches;
    },
    returnSignalAlerts() {
      return this.$store.getters.returnUser.appData.signalAlerts;
    },
    returnSelectedSignal() {
      return this.$store.getters.returnSelectedSignal;
    },
    returnUser() {
      return this.$store.getters.returnUser;
    }
  },
  components: {
    checkIcon,
    alt,
    preassureGuage,
    noData,
    topTable,
    tableHead,
    leagueRow,
    matchFlowItem
  },
  props: ["tableData", "tableMode"],
  methods: {
    selectMatch(child) {
      this.$store.state.$Ui.ui.selectedMatch = child;
      this.$modal.show("Match_Info");
    },
    parseTime(time) {
      return (
        child.time.starting_at.timestamp |
        moment("dddd, MMMM Do YYYY, h:mm a").utcOffset()
      );
    },
    returnTime() {
      var tz = moment("dddd, MMMM Do YYYY, h:mm a").tz.guess();
      return tz;
    },
    changes(val) {
      if (!this.returnSelectedMatches.includes(val)) {
        this.$store.commit("pushSelectedMatch", val);
      } else if (this.returnSelectedMatches.includes(val)) {
        this.$store.commit(
          "removeSelectedMatch",
          this.returnSelectedMatches.findIndex(x => val === x)
        );
      }
    }
  }
};
</script>

<style>
.Scanner_Odds {
  /* justify-items: center; */
  text-align: center;
  grid-template-columns: 50% 50%;
  /* grid-column-gap: 10px; */
  grid-auto-flow: column;
  display: grid;
  font-size: 13px;
  /* align-content: end; */
}
.pressure-g-outer {
  position: relative;
  padding: 10px !important;
  color: #d88808;
}

.oddsHR {
  margin: 0;
  padding: 0;
  border-top: 2px solid #dce1e4;
}

#lo2 {
  border-right: 2px solid #dce1e4;
}
</style>
