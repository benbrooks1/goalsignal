<template>
  <div>
    <div class="stat-table top-live">
      <!-- <table-head /> -->
       <!-- <loading :active.sync="true" 
        :can-cancel="true" 
     
        :is-full-page="true"></loading> -->
      <div id="Table_Body">
        
        <div v-for="item in tableData" :key="item.id">
         
          <league-row :key="item.id" :item="item" />
          <div
            v-for="child in item.matches"
            class="Match_Row table-data eng-body stat-row-highlight"
            
          >
            <!-- <div class="Scanner_Checkbox">
              <p-check
                @change="changes(child.id)"
                :checked="returnSelectedMatches.includes(child.id)"
                class="p-icon p-smooth"
                color="success"
              ></p-check>
            </div>-->
            <div class="Scanner_Alert_Circle alert-circle-outer">
                <span v-if="tableMode !== 'signals'" class>
                <font-awesome-icon
                  v-if="child.is_my_favorite"
                  icon="bell"
                  size="lg"
                  style="color: green;"
                  class="pointer"
                  @click="onClickBellIcon(child)"
                />
                <font-awesome-icon
                  v-else
                  icon="bell"
                  size="lg"
                  class="pointer"
                  @click="onClickBellIcon(child)"
                />
              </span>
            </div>
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
            
            <div class="Scanner_Odds table-each-item live-odd-data-out">
              <div
                class="SP_Odds SP_Odds_Divider"
                v-if="child.flatOdds != null || undefined"
                v-for="odds in child.flatOdds.data"
              >
                <span v-for="value in odds.odds" class="sp-odd-data">
                  <span >({{ value.value }})</span>
                </span>
              </div>
              <div
                class="Live_Odds"
                v-if="child.inplayOdds != null || undefined"
                v-for="odds in child.inplayOdds.data"
                style="width:100%"
              >
                <span v-for="value in odds.values" class="live-odd-data">
                  <span class="strong">{{ value.value }}</span>
                </span>
              </div>
              
            </div>
            <div class="Scanner_Teams table-each-item teams" @click="selectMatch(child)">
              <table style="width:100%">
                <tr>
                  <td class="multi-table-data largest-box-data">
                    <div class="teamContainer">
                      <img
                        class="team_logo"
                        v-if="
                          child.localTeam.data.logo_path !== null || undefined
                        "
                        :src="child.localTeam.data.logo_path"
                      />

                      <span v-else></span>
                      <p class="dots">{{ child.localTeam.data.name }} <span v-if="numberOfRedCard(child.localTeam.data,child.stats) >0" style="position: relative;"> <img style="max-width: 15px;max-height: 25px;" class="pointer" src="./../../Assets/Images/Icons/Red-Card.png" />  
                      <span style="position: absolute;left: 4px;">{{numberOfRedCard(child.localTeam.data,child.stats)}}</span> </span> </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="largest-box-data">
                    <div class="teamContainer">
                      <img
                        class="team_logo"
                        v-if="
                          child.visitorTeam.data.logo_path !== null || undefined
                        "
                        :src="child.visitorTeam.data.logo_path"
                      />

                      <span v-else></span>
                      <p class="dots">{{ child.visitorTeam.data.name }} <span v-if="numberOfRedCard(child.visitorTeam.data,child.stats) >0" style="position: relative;"> <img style="max-width: 15px;max-height: 25px;" class="pointer" src="./../../Assets/Images/Icons/Red-Card.png" />  
                      <span style="position: absolute;left: 4px;">{{numberOfRedCard(child.visitorTeam.data,child.stats)}}</span> </span> </p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Scores table-each-item">
              <table class="score-count">
                <tr>
                  <td class="multi-table-data">
                    <span class="bold-no">{{ child.scores.localteam_score }} <span class="half-score" v-if="child.scores.ht_score"> ({{splitingHalfGoal(child.scores.ht_score,'first')}}) </span> </span>
                    <!-- <div class="ht-score" v-if="child.scores.ht_score">({{child.scores.ht_score}} )</div> -->
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="bold-no">{{ child.scores.visitorteam_score }}  <span class="half-score" v-if="child.scores.ht_score"> ({{splitingHalfGoal(child.scores.ht_score,'second')}}) </span> </span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Supremacy table-each-item">
              <table style="width:100%">
                <tr v-if="child.supremacy.localTeam != null || undefined">
                  <td
                    class="multi-table-data"
                    :class="Math.round(child.supremacy.localTeam) >= 61?'text-green': Math.round(child.supremacy.localTeam)<=39? 'text-red':''"
                  >{{ Math.round(child.supremacy.localTeam) }}%</td>
                </tr>
                <tr v-else>
                  <td class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>
                <tr v-if="child.supremacy.visitorTeam != null || undefined">
                  <td
                    class="multi-table-data"
                    :class="Math.round(child.supremacy.visitorTeam) >= 61?'text-green': Math.round(child.supremacy.visitorTeam)<=39? 'text-red':''"
                  >{{ Math.round(child.supremacy.visitorTeam) }}%</td>
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
                  <td v-if="child.stats != null || undefined" class="multi-table-data">
                    <span v-if="child.stats.data[0] != null || undefined">
                      <span
                        v-if="
                          child.stats.data[0].possessiontime != null ||
                            undefined
                        "
                      >{{ child.stats.data[0].possessiontime + "%" }}</span>
                      <span v-else>-</span>
                    </span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>

                <tr>
                  <td v-if="child.stats.data[1] != null || undefined" class>
                    <span v-if="child.stats.data[1] != null || undefined">
                      <span
                        v-if="
                          child.stats.data[1].possessiontime != null ||
                            undefined
                        "
                      >{{ child.stats.data[1].possessiontime + "%" }}</span>
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
                  <td v-if="child.stats.data[0] != null || undefined" class="multi-table-data">
                    <span
                      v-if="child.stats.data[0].shots != null || undefined"
                    >{{ child.stats.data[0].shots.total }}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>

                <tr>
                  <td v-if="child.stats.data[1] != null || undefined">
                    <span
                      v-if="child.stats.data[1].shots != null || undefined"
                    >{{ child.stats.data[1].shots.total }}</span>
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
                  <td v-if="child.stats.data[0] != null || undefined" class="multi-table-data">
                    <span
                      v-if="child.stats.data[0].shots != null || undefined"
                    >{{ child.stats.data[0].shots.ongoal }}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>

                <tr>
                  <td v-if="child.stats.data[1] != null || undefined" class>
                    <span
                      v-if="child.stats.data[1].shots != null || undefined"
                    >{{ child.stats.data[1].shots.ongoal }}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class>
                    <span>-</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Inside_Box table-each-item">
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
                  <td v-if="child.stats.data[0] != null || undefined" class="multi-table-data">
                    <span
                      v-if="child.stats.data[0].corners != null || undefined"
                    >{{ child.stats.data[0].corners }}</span>
                    <span v-else>-</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>
                <tr>
                  <td v-if="child.stats.data[1] != null || undefined">
                    <span
                      v-if="child.stats.data[1].corners != null || undefined"
                    >{{ child.stats.data[1].corners }}</span>
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
                  <td v-if="child.stats.data[0] != null || undefined" class="multi-table-data">
                    <span>{{ child.stats.data[0].yellowcards }}</span>
                  </td>
                  <td v-else class="multi-table-data">
                    <span>-</span>
                  </td>
                </tr>
                <tr>
                  <td v-if="child.stats.data[1] != null || undefined">
                    <span>{{ child.stats.data[1].yellowcards }}</span>
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
import Loading from "vue-loading-overlay";
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
      check: false,
      page: 1
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
    Loading,
    matchFlowItem
  },
  props: ["tableData", "tableMode"],
  // created() {
  //   this.$store.commit("updateAllMatches", { shouldClearData: true });
  //   this.getAllMatches();
  // },
  mounted() {
    // Detect when scrolled to bottom.
    const listElm = document.querySelector("#table_wrap");
    listElm.addEventListener("scroll", e => {
      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        setTimeout(() => {
          this.getAllMatches();
        });
      }
    });
  },
  methods: {
    getAllMatches() {
      if (this.page < this.$store.state.$Api.allMatchesTotalPages) {
        this.page++;
        this.isLoading = true;
        this.$store.dispatch("requestAllMatches", this.page).then(resp => {
          this.isLoading = false;
        });
      }
    },
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
    numberOfRedCard(idOfTeam,statsOfMatch){
      // console.log(statsOfMatch,idOfTeam);
      for(const stat of  statsOfMatch.data){
        if(stat.team_id == idOfTeam.id)
        {
          // console.log("***************")
          return stat.redcards
        }
      }
      // console.log(id,stats,"STATS");
      // return 2;
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
    },
    splitingHalfGoal(goal,type){
     var splitingHlafGoal  = goal.split("-");
     if(type ==="first"){
       return splitingHlafGoal[0];
     }else{
       return splitingHlafGoal[1];
     }
    },
    onClickBellIcon(match) {
      return ;
      /*
      var payload = {
        favMatch: {
          id: match.id
        },
        user_id: this.returnUser._id
      };
      if (match.is_my_favorite) {
        // console.log("Should be added on Shortlist");
        match.is_my_favorite = false;
        this.$io.emit("removeFavMatch", payload);
        
          var data = {
            user: this.returnUser._id,
            idToBeRemoved: match.id
          };
          this.$io.emit("removeShortlistItem", data);
        
        this.$store.commit("resetSelectedMatchesState");
      } else {
        // console.log("Should be added on Shortlist");
        match.is_my_favorite = true;
        this.$io.emit("addFavMatch", payload);
        this.$store.commit("pushSelectedMatch", match.id);
        // console.log(this.returnSelectedMatches, "Retrun MAtchees",this.returnUser._id)
        this.$io.emit("addToShortlist", {
          matches: this.returnSelectedMatches,
          _id: this.returnUser._id
        });




      }
      */
      // this.changes(match.id)
      
      // this.$store.commit(
      //     "removeSelectedMatch",
      //     this.returnSelectedMatches.findIndex(x => val === x)
      // );
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
.half-score{
  width: 35px;
  font-size: 11px;
  color: black;
}
.oddsHR {
  margin: 0;
  padding: 0;
  border-top: 2px solid #dce1e4;
}
.top-live{
  margin-top: 80px !important;
}
#lo2 {
  border-right: 2px solid #dce1e4;
}
</style>
