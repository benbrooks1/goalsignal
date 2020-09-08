<template>
  <div>
    <div class="stat-table top-live">
      <table-head />
      <div id="Table_Body">
        <div v-for="item in tableData" :key="item.id">
          <league-row :key="item.id" :item="item" />
          <div
            v-for="child in item.matches"
            class="Match_Row table-data eng-body stat-row-highlight"
            v-bind:class="{ 'is-green': isActiveGoalAndTick(child) === true,'is-amber': isAmberColor(child) === true,'is-gray': isGrayColor(child) === true }"
          >
            <!-- <div class="Scanner_Checkbox">
              <p-check
                @change="changes(child.id)"
                :checked="returnSelectedMatches.includes(child.id)"
                class="p-icon p-smooth"
                color="success"
              ></p-check>
            </div> -->
            <div class="Scanner_Alert_Circle alert-circle-outer"  @click="onClickBellIcon(child)">
              <!-- <span v-if="tableMode !== 'signals'" class>
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
              </span> -->
              <span class="record-bell is-pointer" >
              <img class="is-pointer" src="./../../Assets/Images/Logos/bell-3.png"
                  />
                  </span>
            </div>
            <div class="Scanner_Match_Time">
              <div
                v-if="child.time.status == 'FT' || child.time.status == 'HT' || child.time.status == 'ET'"
              >{{ child.time.status }}</div>
              <div>
                {{ child.time.minute }}
                <span class="fadeInAndOut">'</span>
              </div>
            </div>
            
            <div class="Scanner_Odds table-each-item live-odd-data-out">
              <div
                class="SP_Odds SP_Odds_Divider"
                v-if="child.flatOdds != null||undefined"
                v-for="odds in child.flatOdds.data"
              >
                <span v-for="value in odds.odds" class="sp-odd-data">
                  <span >({{value.value}})</span>
                </span>
              </div>
              <div
                class="Live_Odds "
                v-if="child.inplayOdds != null||undefined"
                v-for="odds in child.inplayOdds.data"
                style="width:100%"
              >
                <span v-for="value in odds.values" class="live-odd-data">
                  <span class="strong">{{value.value}}</span>
                </span>
              </div>
              
            </div>
            <div class="Scanner_Teams table-each-item teams" @click="selectMatch(child)">
              <table style="width:100%">
                <tr v-bind:class="{ 'is-green': isActiveGoalAndTick(child) === true,'is-amber': isAmberColor(child) === true,'is-gray': isGrayColor(child) === true }">
                  <td class="multi-table-data largest-box-data">
                    <div class="teamContainer">
                      <img
                        class="team_logo"
                        v-if="child.localTeam.data.logo_path !== null||undefined"
                        :src="child.localTeam.data.logo_path"
                      />

                      <span v-else></span>
                      <p class="dots">{{child.localTeam.data.name}} <span class="goal-tag"  v-if="isThisTeamScoredGoal(child.localTeam.data.id,child)" >Goal</span > <span v-if="numberOfRedCard(child.localTeam.data,child.stats) >0" style="position: relative;"> <img style="max-width: 15px;max-height: 25px;" class="pointer" src="./../../Assets/Images/Icons/Red-Card.png" />  
                      <span style="position: absolute;left: 4px;">{{numberOfRedCard(child.localTeam.data,child.stats)}}</span> </span></p>
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
                      <p class="dots">{{child.visitorTeam.data.name}} <span class="goal-tag"  v-if="isThisTeamScoredGoal(child.visitorTeam.data.id,child)" >Goal</span > <span v-if="numberOfRedCard(child.visitorTeam.data,child.stats) >0" style="position: relative;"> <img style="max-width: 15px;max-height: 25px;" class="pointer" src="./../../Assets/Images/Icons/Red-Card.png" />  
                      <span style="position: absolute;left: 4px;">{{numberOfRedCard(child.visitorTeam.data,child.stats)}}</span> </span></p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="Scanner_Scores table-each-item">
              <table class="score-count">
                <tr v-bind:class="{ 'is-green': isActiveGoalAndTick(child) === true,'is-amber': isAmberColor(child) === true,'is-gray': isGrayColor(child) === true }">
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

              <div class="mobile-view-strength">
                <table style="">
                  <tr v-if="child.supremacy.localTeam != null || undefined">
                   <td
    class="pressure-g-outer"
    :class="Math.round(getSupermacy(child.supremacy.localTeam,child.supremacy.visitorTeam)) >= 61?'text-green': Math.round(getSupermacy(child.supremacy.localTeam,child.supremacy.visitorTeam))<=39? 'text-red':''"
  >{{ Math.round(getSupermacy(child.supremacy.localTeam,child.supremacy.visitorTeam)) }}%</td>
                    
                  <tr v-else>
                    <td>
                      <span>-</span>
                    </td>
                  </tr>
                </table>
              </div>
            <div style="border-left: 1.5px solid rgba(172, 188, 178, 1);" class="Scanner_Possession table-each-item">
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
                    <span
                      v-if="child.stats.data && child.stats.data[0] && child.stats.data[0].attacks"
                    >{{child.stats.data[0].attacks.dangerous_attacks}}</span>
                    <span v-else>-</span>
                  </td>
                </tr>

                <tr>
                  <td class>
                    <span
                      v-if="child.stats.data && child.stats.data[1] && child.stats.data[1].attacks"
                    >{{child.stats.data[1].attacks.dangerous_attacks}}</span>
                    <span v-else>-</span>
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
               <!-- <div class="Scanner_Yellow_Cards table-each-item">
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
            </div> -->
          <match-flow-item :child="child" type="Dangerous-Attacks" />
            <match-flow-item :child="child" type="Shots" />
            <match-flow-item :child="child" type="Corners" />
                 <td class="table-each-item mf-area">
    <table style="width:100%">
    
        <td v-if="isActiveGoalAndTick(child) === true"
    class="pressure-g-outer"
  ><font-awesome-icon
           
             size="2x"
            class="pointer"
            icon="check-circle"
          
          /></td>
    </table>
  </td>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
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
     getSupermacy(local,visitor){
      let maxSupermacy = Math.max(local,visitor);
      return Math.min(Math.round(maxSupermacy) + 7,99) ;
    },
    isActiveGoal(match){
      if( match.color == 'green'){
        // unnecessary console.log("TRUEEEEEEEEEEEEEEEEEEEee")
        return true;
      }
      return false;
    },
    isActiveGoalAndTick(match){
     let matchesInGoal =  this.$store.getters.returnMatchesInGol;
     let flag = false;
    //  console.log("Mathes IN GOAL",matchesInGoal);
      for(let i = 0 ;  i < matchesInGoal.length ; i++ ){
        // console.log(matchesInGoal[i], match.id, "LIVE MATCHES  ")
        if(matchesInGoal[i].matchId === match.id){
            flag = true;
            break;
        }
      }
      
      if(flag){
        return true;
      }
      return false;
    },
      isThisTeamScoredGoal(teamId,match){
        
        if(teamId && match && match.goalText && match.goalText.toString() === teamId.toString() ){
          return true;
        }
    },
     isAmberColor(match){
      if( match.color == 'Amber'){
        return true;
      }
      return false;
    },
      isGrayColor(match){
      if( match.color == 'grey'){
        return true;
      }
      return false;
    },
      onClickBellIcon(match) {
      var payload = {
        favMatch: {
          id: match.id
        },
        user_id: this.returnUser._id
      };
     if (match.is_my_favorite) {
        //  console.log("Should de-active");
        // match.is_my_favorite = false;
        
          var data = {
            user: this.returnUser._id,
            idToBeRemoved: match.id
          };
          // this.$io.emit("removeShortlistItem", data);
          this.$io.emit("removeToShortlistAndFav", {
          match: match.id,
          _id: this.returnUser._id
        });
          this.$store.commit("pullMatachIdFavAndShortList",match.id);
         
        // this.$store.commit("resetSelectedMatchesState");
         
        //  console.log(this.$store.getters.returnLiveMatches,match.id);
        //  this.$store.getters.returnLiveMatches
        // console.log("REMIVED");
        if(this.returnUser.popupShow){
      Vue.notify({
          title: "Success!",
          text: "Removed to your shortlist!",
          type: "success",
          group: "Main",
       
        });
        }

      }  else {
        // match.is_my_favorite = true;
      // match.is_my_favorite = true;
        // this.$io.emit("addFavMatch", payload);
        // this.$store.commit("pushSelectedMatch", match.id);
      //  console.log("User",this.$store.getters.returnUser);
       this.$store.commit("pushMatchIdFavAndShortList",{_id :match.id,time:match.time.minute});
       // console.log(this.returnSelectedMatches,this.returnUser._id)
        this.$io.emit("addToShortlistAndFav", {
          match: match.id,
          _id: this.returnUser._id
        });
        // console.log("ADDD");
        if(this.returnUser.popupShow){
       Vue.notify({
          title: "Success!",
          text: "Added to your shortlist!",
          type: "success",
          group: "Main",
          reverse : true
        });
        }
        // this.$store.getters.returnLiveMatches
        // console.log(,match.id);



      }
      this.$store.dispatch('getLiveMatches') ;
      // console.log("THERE");
      
      // this.$store.dispatch("setLiveMatchUpdateIsFav",{matchId:match.id,status:!match.is_my_favorite});
      this.$store.getters.returnLiveMatches
      this.$forceUpdate();
      // this.changes(match.id)
      
      // this.$store.commit(
      //     "removeSelectedMatch",
      //     this.returnSelectedMatches.findIndex(x => val === x)
      // );
    },
    returnTime() {
      var tz = moment("dddd, MMMM Do YYYY, h:mm a").tz.guess();
      return tz;
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
.is-pointer{
  cursor: pointer; 
}
.is-green{
      background: #9eff9e !important
}
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
.is-amber{
      background: #FFBF00 !important
}
.is-gray{
       background: #DBDBDB !important
}

#lo2 {
  border-right: 2px solid #dce1e4;
}
</style>
