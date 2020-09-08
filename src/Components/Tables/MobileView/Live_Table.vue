<template>
  <div>
    <div class="mobileview-screen">
        <!-- <div class="navbar-top">
          <div class="refereshicon" @click="refreshing()">
            
           
             <font-awesome-icon
            
             size="2x"
            class="pointer"
            icon="sync-alt"
            v-bind:class="{ 'rotating': retrunLoadingState}"
          />
            
            </div>
          <div class=""><img src="./../../../Assets/Images/Logos/gosignalogom.png" /></div>
          <div class="mobileviewmenu" @click="showTopMenu = !showTopMenu"><img src="./../../../Assets/Images/Logos/menuicon.png" /></div>
          
        </div>
        <div class="Mobileviewhamburgermenu" v-if="showTopMenu">
          <ul>
            <li>Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
          </ul>
        </div>
        <ul class="goaltabs">
          <li :class="{
            activeli: returnRoute === '/scanner/shortlist' && !returnSelectedFilter
          }"
          @click="$router.push('/scanner/shortlist')"> ShortList <span>({{ returnShortlistCount }})</span></li>
            <li style="border-right: 1px solid #a4a4a4" v-for="(filter, index) in returnFilter"  @click="updateSelectedFilter(index)"
          :key="filter.name" :class="{
            activeItem2:
              returnFilter[index].name ===
                returnSelectedFilter.name &&
              $router.app._route.path == '/scanner/live'
          }" >{{mainHeading(filter.name)}} <span>{{subHeading(filter.name)}}</span></li>
        </ul> -->
        <!-- <nav-Bar /> -->
        <div v-if="tableData.length >= 1" id="Table_Body">
          <div v-for="item in tableData" :key="item.id">
            <league-row :key="item.id" :item="item" />
            <div
              v-for="child in item.matches"
              class="match-table-mobile-view"
              v-bind:class="{ 'is-green': isActiveGoalAndTick(child) === true,'is-amber': isAmberColor(child) === true, 'is-gray': isGrayColor(child) === true}"
            >
              <div class="mobile-view-time">
                <div
                  v-if="child.time.status == 'FT' || child.time.status == 'HT' || child.time.status == 'ET'"
                >{{ child.time.status }}</div>
                <div>
                  <span  style="margin: auto" class="record-bell is-pointer"  v-if="child.is_my_favorite">
                  <img class="is-pointer" src="./../../../Assets/Images/Logos/bell-3.png"
                    @click="onClickBellIcon(child)"
                  />
                </span>
                  <span style="margin: auto" class="record-bell is-pointer" v-else>
                  <img src="./../../../Assets/Images/Logos/bell-1.png"
                    @click="onClickBellIcon(child)"
                  />
                </span>
                  {{ child.time.minute }}
                  <span class="fadeInAndOut">'</span>
                </div>
              </div>
              <div class="mobile-view-matches" @click="selectMatch(child)">
                <table>
                  <tr>
                    <td class="">
                      <div class="mobileview-team-box">
                        <img
                          class=""
                          v-if="
                            child.localTeam.data.logo_path !== null || undefined
                          "
                          :src="child.localTeam.data.logo_path"
                        />

                        <span v-else></span>
                        <p>{{ splitingTeamName(child.localTeam.data.name) }} <span class="goal-tag"  v-if="isThisTeamScoredGoal(child.localTeam.data.id,child)" >Goal</span > <span v-if="numberOfRedCard(child.localTeam.data,child.stats) >0" style="position: relative;" > <img style="max-width: 15px;max-height: 20px;" class="pointer" src="./../../../Assets/Images/Icons/Red-Card.png" />  
                        <span style="position: absolute;left: 4px;top:1px">{{numberOfRedCard(child.localTeam.data,child.stats)}}</span> </span> </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="">
                      <div class="mobileview-team-box">
                        <img
                          class=""
                          v-if="
                            child.visitorTeam.data.logo_path !== null || undefined
                          "
                          :src="child.visitorTeam.data.logo_path"
                        />

                        <span v-else></span>
                        <p>{{ splitingTeamName(child.visitorTeam.data.name) }} <span class="goal-tag"  v-if="isThisTeamScoredGoal(child.visitorTeam.data.id,child)" >Goal</span > <span v-if="numberOfRedCard(child.visitorTeam.data,child.stats) >0" style="position: relative;"> <img style="max-width: 15px;max-height: 20px;" class="pointer" src="./../../../Assets/Images/Icons/Red-Card.png" />  
                        <span style="position: absolute;left: 4px;top:1px">{{numberOfRedCard(child.visitorTeam.data,child.stats)}}</span> </span> </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="mobile-view-score">
                <table class="">
                  <tr>
                    <td class="">
                      <span class="">
                        {{+
                        child.scores.localteam_score
                        }}
                      </span>
                      <!-- <span class="half-score" > <span v-if="child.scores.ht_score"> ({{splitingHalfGoal(child.scores.ht_score,'first')}}) </span> </span>  -->
                      <!-- <div class="ht-score" v-if="child.scores.ht_score">({{child.scores.ht_score}})<span class="half-score" v-if="child.scores.ht_score"> ({{splitingHalfGoal(child.scores.ht_score,'first')}}) </span> </div> -->
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="">
                        {{
                        child.scores.visitorteam_score
                        }} 
                      </span>
                      <!-- <span class="half-score" > <span v-if="child.scores.ht_score">({{splitingHalfGoal(child.scores.ht_score,'second')}}) </span> </span> -->
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

             
              
            </div>
          </div>
        </div>
    <div class="mobile-nomatch" v-else>
      <p>There Are No Goal Predictions At This Time</p><p>Searching Live Matches… </p> <img style="width: 60px;height: 60px;" src="./../../../Assets/Images/Logos/loadingif.svg"/>
    </div>
    </div>
   
  </div>
</template>

<script>
import Vue from 'vue';
import loadingGif from "./../../../Assets/Images/Logos/loadingif.gif";
const topTable = () => import("./../Components/Top-Table");
const tableHead = () => import("./../Components/Table-Head");
const leagueRow = () => import("./../Components/League-Row");
const noData = () => import("./../Components/No-Data");
const matchFlowItem = () => import("./../Table_Items/Match_Flow/Match_Flow");
const yellowCards = () => import("./../Table_Items/Yellow_Cards/Yellow_Cards");
const redCards = () => import("./../Table_Items/Red_Cards/Red_Cards");
const preassureGuage = () => import("./../Table_Items/Gauge/Guage");
const alt = () => import("./../Table_Items/Alt");
const checkIcon = () => import("vue-material-design-icons/Check.vue");
const navBar = () => import ("./Nav_bar");
export default {
  data() {
    return {
      selected: 1,
      showTopMenu:false,
      check: false,
      
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
    },
    retrunLoadingState(){
      // console.log("Compute is working ",this.$store.getters.retrunUpdateIsCircleLoading);
     return this.$store.getters.retrunUpdateIsCircleLoading;
    },
    returnRoute() {
      return this.$router.app._route.path;
    },
    returnFilter() {
      // console.log("FILTER ARRAY", this.$store.getters.returnFilter)
      return this.$store.getters.returnFilter;
    },
    returnShortlistCount() {
      var shortlistMatchCount = 0;
      this.$store.getters.returnShortlistData.forEach(league => {
        league.matches.forEach(match => {
          shortlistMatchCount++;
        });
      });
      return shortlistMatchCount;
    },
    returnSelectedFilter() {
      function isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) return false;
        }
        return true;
      }
      if (isEmpty(this.$store.getters.returnSelectedFilter)) {
        return false;
      } else {
        return this.$store.getters.returnSelectedFilter;
      }
    }
  },
  components: {
    checkIcon,
    alt,
    navBar,
    preassureGuage,
    noData,
    topTable,
    tableHead,
    leagueRow,
    matchFlowItem
  },
  props: ["tableData", "tableMode", "myLeagues"],
  methods: {
    stopTheEvent: event => event.stopPropagation(),
    selectMatch(child) {
      this.$store.state.$Ui.ui.selectedMatch = child;
      this.$modal.show("Match_Info");
      console.log("THERER");
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
    splitingTeamName(teamName){
      teamName = teamName
      if(teamName.length > 18){
        return teamName.slice(0,18) + "..."
      }else{
        return teamName;
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
    mainHeading(value){
      return value.split("(")[0];
    },
    subHeading(value){
      
      return `(${value.split("(")[1]}`;
    },
    updateSelectedFilter(index) {
    
      this.$router.push("/scanner/live");

      this.$store.commit("updateFilterCount", {
        filter_id: this.returnFilter[index].id,
        count: 0
      });
      switch (index) {
        case false:
          this.$store.commit("updateSelectedFilter", {});
          break;
        default:
          this.$store.commit(
            "updateSelectedFilter",
            this.returnFilter[index]
          );
      }
    },
    refreshing(){
      this.$store.commit("updateCricle", true);
      setTimeout(()=>{
        this.$store.commit("updateCricle", false);
      },500);
      return this.$store.dispatch('getLiveMatches') ;
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
      // console.log("CLICK ON BELL");
      if (!this.returnSelectedMatches.includes(val)) {
        this.$store.commit("pushSelectedMatch", val);
      } else if (this.returnSelectedMatches.includes(val)) {
        this.$store.commit(
          "removeSelectedMatch",
          this.returnSelectedMatches.findIndex(x => val === x)
        );
      }
    this.$store.dispatch("getLiveMatches");

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
      var payload = {
        favMatch: {
          id: match.id
        },
        user_id: this.returnUser._id
      };
      if (match.is_my_favorite) {
        //  console.log("Should de-active");
        // match.is_my_favorite = false;
        // this.$io.emit("removeFavMatch", payload);
        
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
        // });

      } else {
        // match.is_my_favorite = true;
        // this.$io.emit("addFavMatch", payload);
        // this.$store.commit("pushSelectedMatch", match.id);
      //  console.log("User",this.$store.getters.returnUser);
       this.$store.commit("pushMatchIdFavAndShortList",{_id :match.id,time:match.time.minute});
       // console.log(this.returnSelectedMatches,this.returnUser._id)
        // this.$io.emit("addToShortlistAndFav", {
        //   match: match.id,
        //   _id: this.returnUser._id
        // });
        this.$io.emit("addToShortlistAndFav", {
          match: match.id,
          matchData : match,
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
      // this.$store.dispatch('getLiveMatches') ;
      // console.log("THERE");
      
      this.$store.dispatch("setLiveMatchUpdateIsFav",{matchId:match.id,status:!match.is_my_favorite});
      // this.$store.getters.returnLiveMatches
      // this.$forceUpdate();
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
/* Mobile View Start*/


</style>
