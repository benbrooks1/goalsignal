<template>
<div>
    <div class="mobileview-screen">
     <div v-if="tableData.length >= 1" id="Table_Body">
          <div v-for="item in tableData" :key="item.id">
            <league-row :key="item.id" :item="item" />
            <div
              v-for="child in item.matches"
              class="match-table-mobile-view"
              v-bind:class="{ 'is-green': isActiveGoalAndTick(child) === true,'is-amber': isAmberColor(child) === true,'is-gray': isGrayColor(child) === true }"
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
                  <span class="record-bell is-pointer" v-else>
                  <img  src="./../../../Assets/Images/Logos/bell-1.png"
                    @click="onClickBellIcon(child)"
                  />
                </span>
                  {{ child.time.minute }}
                  <span class="fadeInAndOut">'</span>
                </div>
              </div>
              <div class="mobile-view-matches">
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
      <p>You Have No Goal Predictions Added To The Shortlist.</p> <p>To Add a Goal Alert Click The Bell Icon</p>
      <p>
        <img src="./../../../Assets/Images/Logos/bell-1.png"/>
      </p>
    </div>
    </div>
    </div>
</template>

<script>
import Vue from 'vue';
const leagueRow = () => import("./../Components/League-Row");
const navBar = () => import ("./Nav_bar");
export default {
    computed :{
        returnUser() {
      return this.$store.getters.returnUser;
    }
    },
     methods: {
         isActiveGoal(match){
      if( match.color == 'green'){
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
    },isGrayColor(match){
      if( match.color == 'grey'){
        return true;
      }
      return false;
    },
    getSupermacy(local,visitor){
      let maxSupermacy = Math.max(local,visitor);
      return Math.min(Math.round(maxSupermacy) + 7,99) ;
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
    }
     },
    props: ["tableData", "tableMode", "myLeagues"],
     components: {
         navBar,
         leagueRow
     }
}
</script>