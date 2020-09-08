<template>
  <div>
    <!-- <loading
      class="auth-screen-loader loader"
      loader="spinner"
      :active="isLoading"
    ></loading>-->
    <loading loader="bars" :active="$store.state.$Ui.ui.isLoading"></loading>
    <!-- <loading :active="store.state.Ui.ui.isLoading" :can-cancel="true" :is-full-page="true"></loading> -->
    <div class="loader">
      <div class="lds-dual-ring"></div>
    </div>

    <router-view />
    <notifications group="Main"  v-bind:reverse="true" />
    <vue-progress-bar></vue-progress-bar>
    <modals-container />
    <modal height="auto" name="Settings">
        <div class="createModal">
          <h1 id="modalHeader" class="header modalHeader">Settings</h1>
          <font-awesome-icon
            @click="$modal.hide('Settings')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <settings-modal />
        </div>
      </modal>
        <modal height="auto" name="Match_Info">
        <div class="createModal">
          <h1 id="modalHeader" class="header modalHeader">Match Info</h1>

          <font-awesome-icon
            @click="onCloseMatchInfoModal()"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <div id="moreInfoBox">
            <span class="moreInfoHeading">
              <match-info-modal />
              <div style="display:none">
                {{ returnLoggedInBoolean }} {{ returnMatchModalStatus }}
              </div>
            </span>
          </div>
        </div>
      </modal>
    <!-- unnecessary <div id="Modals">
      <modal height="auto" :width="900" name="Create_Filter">
        <div class="createModal">
          <p class="modalHeader header">Create New Filter</p>
          <font-awesome-icon
            @click="$modal.hide('Create_Filter')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <create-modal :editMode="false" mode="filter" />
        </div>
      </modal>
      <modal height="auto" :width="900" name="Create_Signal">
        <div class="createModal">
          <p class="modalHeader header">Create Signal</p>
          <font-awesome-icon
            @click="$modal.hide('Create_Signal')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <create-modal :editMode="false" mode="signal" />
        </div>
      </modal>

      <modal height="auto" name="Add_League">
        <div class="createModal">
          <h1 id="modalHeader" class="header modalHeader">Add A League</h1>
          <font-awesome-icon
            @click="$modal.hide('Add_League')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />

          <add-league-modal />
        </div>
      </modal>
      
      <modal height="auto" name="userProfile">
        <div class="createModal">
          <h1 id="modalHeader" class="header modalHeader">Profile</h1>
          <font-awesome-icon
            @click="$modal.hide('userProfile')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <profile-modal />
        </div>
      </modal>
     
      <modal height="auto" name="Settings">
        <div class="createModal">
          <h1 id="modalHeader" class="header modalHeader">Settings</h1>
          <font-awesome-icon
            @click="$modal.hide('Settings')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <settings-modal />
        </div>
      </modal>
      <modal height="auto" :width="800" name="Edit_Signal">
        <div class="createModal">
          <h1 id="modalHeader" class="header modalHeader">Edit Signal</h1>
          <font-awesome-icon
            @click="$modal.hide('Edit_Signal')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <create-modal mode="signal" :editMode="true" />
        </div>
      </modal>
      <modal height="auto" :width="800" name="Edit_Filter">
        <div class="createModal">
          <h1 id="modalHeader" class="header modalHeader">Edit Filter</h1>
          <font-awesome-icon
            @click="$modal.hide('Edit_Filter')"
            size="lg"
            class="pointer closeCon modal_Close_White"
            icon="times"
          />
          <create-modal mode="filter" :editMode="true" />
        </div>
      </modal>
    
    </div> -->
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { Howl } from "howler";
const createModal = () =>
  import("./Components/Modals/Create-Signals-Filters/Create");
const settingsModal = () => import("./Components/Modals/Settings/Settings");
const matchInfoModal = () => import("./Components/Modals/Match_Info");
const profileModal = () => import("./Components/Modals/Profile");
const addLeagueModal = () => import("./Components/Modals/Add_My_League");

import constants from "./Constants/index";
import Constants from "./Constants/index";
import axios from "./Common/interceptor";
import { receiveForegroundNotification } from "./Common/push-notifications";
export default {
  //  el: '#validated-form',
  data() {
    return {
      loadMore: true,
      polling: null,
      isLoading: true,
      fullPage: true
    };
  },
  components: {
    createModal,
    settingsModal,
    matchInfoModal,
    profileModal,
    addLeagueModal,
    Loading
  },
  watch: {},

  computed: {
    returnLoggedInBoolean() {
      if (!this.$store.getters.returnLoggedInBoolean) {
        clearInterval(this.polling);
      }
      return this.$store.getters.returnLoggedInBoolean;
    },
    returnSignalAlerts() {
      return this.$store.getters.returnSignalAlerts;
    },
    returnSignals() {
      return this.$store.getters.returnSignals;
    },
    returnUser() {
      return this.$store.getters.returnUser;
    },
    returnMatchModalStatus() {
      if (this.$store.getters.returnMatchModalStatus) {
        this.$modal.show("Match_Info");
      }
    }
  },
  methods: {

      checkingMatchExistsInFilter(){
      
       this.$store.getters.returnLiveMatchesInRawForm.forEach((league) => {
        league.matches.forEach(match => {
            let ExistsInFilter = false;
            for (let ii = 0; ii < this.$store.getters.returnFilter.length -1; ii++) {
                
                for (let i = 0; i < this.$store.getters.returnFilter[ii].filters.length; i++) {
                    let matchMeetsCriteriaTruthThreshold = 0
                    this.$store.getters.returnFilter[ii].filters[i].forEach((filter) => {
                         switch (filter.currentlySelectedFilterValue.text) {
                             case 'Shots On Target Are':
                                 if (filter.applyTo && filter.applyTo == 'local' && filter.value.singular) {
                                     if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.ongoal >= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.ongoal <= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.ongoal == Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     }
                                 } else if (filter.applyTo && filter.applyTo == 'visitor' && filter.value.singular) {
                                     if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.ongoal >= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.ongoal <= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.ongoal == Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     }
                                 } else {
                                     if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.ongoal >= Number(filter.value.singular) || match.stats.data[0].shots.ongoal >= Number(filter.value.singular))) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.ongoal <= Number(filter.value.singular) || match.stats.data[0].shots.ongoal <= Number(filter.value.singular))) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.ongoal == Number(filter.value.singular) || match.stats.data[0].shots.ongoal == Number(filter.value.singular))) {
                                         matchMeetsCriteriaTruthThreshold++
                                     }
                                 }
                                 break;
                             case 'Goal Attempts Are':
                                 // console.log("Match", match.stats.data )
                                 if (filter.applyTo && filter.applyTo == 'local' && filter.value.singular) {
                                     if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.total >= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.total <= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[0].shots && match.stats.data[0].shots.total == Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     }
                                 } else if (filter.applyTo && filter.applyTo == 'visitor' && filter.value.singular) {
                                     if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.total >= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.total <= Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && match.stats.data[1].shots.total == Number(filter.value.singular)) {
                                         matchMeetsCriteriaTruthThreshold++
                                     }
                                 } else {
                                     // console.log(filter.operator &&  filter.operator == 'more' && match && match.stats.data.length > 0 &&   match.stats.data[1].shots  && (match.stats.data[1].shots.total >= Number(filter.value.singular) || match.stats.data[0].shots.total >= Number(filter.value.singular)))
                                     // console.log(filter.operator ,  filter.operator == 'more' , match , match.stats.data.length > 0 ,   match.stats.data[1].shots  , (match.stats.data[1].shots.total >= Number(filter.value.singular) || match.stats.data[0].shots.total >= Number(filter.value.singular)))
         
                                     if (filter.operator && filter.operator == 'more' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.total >= Number(filter.value.singular) || match.stats.data[0].shots.total >= Number(filter.value.singular))) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'less' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.total <= Number(filter.value.singular) || match.stats.data[0].shots.total <= Number(filter.value.singular))) {
                                         matchMeetsCriteriaTruthThreshold++
                                     } else if (filter.operator && filter.operator == 'exact' && match && match.stats.data.length > 0 && match.stats.data[1].shots && (match.stats.data[1].shots.total == Number(filter.value.singular) || match.stats.data[0].shots.total == Number(filter.value.singular))) {
                                         matchMeetsCriteriaTruthThreshold++
                                     }
                                 }
                                 break;
                             case 'Match Status Is':
                                 switch (filter.applyTo) {
                                     case "first-half":
                                         if (match.time.minute <= Number(45) && match.time.status == 'LIVE') {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                     case "half-time":
                                         if (match.time.minute == Number(45) && match.time.status == 'HT') {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                     case "second-half":
                                         if (match.time.minute > Number(45) && match.time.status == 'LIVE') {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                     case "extra-time":
                                         if (match.time.minute >= Number(90) && match.time.status == 'ET') {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
         
                                 }
                                 break;
         
                             case 'Total Goals Are':
                                 switch (filter.operator) {
                                     case "exact":
                                         if ((match.scores.localteam_score + match.scores.visitorteam_score) === Number(filter.value.singular)) {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                     case "less":
                                         if (match.scores.localteam_score + match.scores.visitorteam_score <= Number(filter.value.singular)) {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                     case "more":
                                         if (match.scores.localteam_score + match.scores.visitorteam_score >= Number(filter.value.singular)) {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                 }
                                 break;
                             case 'Live Odds Are':
                                 switch (filter.applyTo) {
                                     case "Match":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[1].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                         }
                                         break;
                                     case "local":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[0].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                         }
                                         break;
                                     case "visitor":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match && match.inplayOdds && match.inplayOdds.data.length > 0 && match.inplayOdds.data[0].values.length > 0 && match.inplayOdds.data[0].values[2].value >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                         }
                                         break;
                                 }
                                 break;
                             case 'SP Odds Are':
         
                                 switch (filter.applyTo) {
                                     case "Match":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[1].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                         }
                                         break;
                                     case "local":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
         
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[0].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                         }
                                         break;
                                     case "visitor":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match && match.flatOdds && match.flatOdds.data.length > 0 && match.flatOdds.data[0].odds.length > 0 && match.flatOdds.data[0].odds[2].value === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                         }
                                         break;
                                 }
                                 break;
                             case 'Score Is':
                                 switch (filter.applyTo) {
                                     case "match":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match.scores.localteam_score === Number(filter.value.home) && match.scores.visitorteam_score === Number(filter.value.away)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match.scores.localteam_score >= Number(filter.value.home) && match.scores.visitorteam_score >= Number(filter.value.away)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match.scores.localteam_score <= Number(filter.value.home) && match.scores.visitorteam_score <= Number(filter.value.away)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match.scores.localteam_score === Number(filter.value.home) && match.scores.visitorteam_score === Number(filter.value.away)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                         }
                                         break;
                                     case "local":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match.scores.localteam_score === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
         
                                                 if (match.scores.localteam_score <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match.scores.localteam_score >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match.scores.localteam_score === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                         }
                                         break;
                                     case "visitor":
                                         switch (filter.operator) {
                                             case "exact":
                                                 if (match.scores.visitorteam_score == Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "less":
                                                 if (match.scores.visitorteam_score <= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             case "more":
                                                 if (match.scores.visitorteam_score >= Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                                 break;
                                             default:
                                                 if (match.scores.localteam_score === Number(filter.value.singular)) {
                                                     matchMeetsCriteriaTruthThreshold++
                                                 }
                                         }
                                         break;
                                 }
                                 break;
                             case 'Time Is':
         
                                 switch (filter.operator) {
                                     case "exact":
                                         if (match.time.minute === Number(filter.value.singular)) {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                     case "less":
                                         if (match.time.minute <= Number(filter.value.singular)) {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                     case "more":
                                         // console.log("MINTE",match.time.minute >= Number(filter.value.singular))
                                         if (match.time.minute >= Number(filter.value.singular)) {
                                             matchMeetsCriteriaTruthThreshold++
                                         }
                                         break;
                                 }
         
         
                                 break;
                             case 'Possession Is':
                                 if (match.stats !== undefined) {
                                     if (match.stats.data !== undefined) {
                                         if (match.stats.data[0] != undefined) {
                                             if (match.stats.data[0].possessiontime != undefined) {
                                                 switch (filter.applyTo) {
         
                                                     case "match":
                                                         switch (filter.operator) {
                                                             case "exact":
                                                                 if (match.stats.data[0].possessiontime === Number(filter.value.home) && match.stats.data[1].possessiontime === Number(filter.value.away)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                             case "less":
                                                                 if (match.stats.data[0].possessiontime <= Number(filter.value.home) && match.stats.data[1].possessiontime <= Number(filter.value.away)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                             case "more":
                                                                 if (match.stats.data[0].possessiontime >= Number(filter.value.home) && match.stats.data[1].possessiontime >= Number(filter.value.away)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                         }
                                                         break;
                                                     case "local":
                                                         switch (filter.operator) {
                                                             case "exact":
                                                                 if (match.stats.data[0].possessiontime === Number(filter.value.singular)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                             case "less":
                                                                 if (match.stats.data[0].possessiontime <= Number(filter.value.singular)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                             case "more":
                                                                 if (match.stats.data[0].possessiontime >= Number(filter.value.singular)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                         }
                                                         break;
                                                     case "visitor":
                                                         switch (filter.operator) {
                                                             case "exact":
                                                                 if (match.stats.data[1].possessiontime === Number(filter.value.singular)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                             case "less":
                                                                 if (match.stats.data[1].possessiontime <= Number(filter.value.singular)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                             case "more":
                                                                 if (match.stats.data[1].possessiontime >= Number(filter.value.singular)) {
                                                                     matchMeetsCriteriaTruthThreshold++
                                                                 }
                                                                 break;
                                                         }
                                                         break;
                                                 }
                                             }
                                         }
                                     }
                                 }
         
                                 break;
                             case 'Supremacy Is':
                                 if (match.stats !== undefined) {
                                     if (match.stats.data !== undefined) {
                                         if (match.stats.data[0] != undefined) {
                                             switch (filter.applyTo) {
                                                 case "match":
                                                     switch (filter.operator) {
                                                         case "exact":
         
                                                             if (match.supremacy.localTeam === Number(filter.value.home) && match.supremacy.localTeam === Number(filter.value.away)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.supremacy.localTeam <= Number(filter.value.home) && match.supremacy.localTeam <= Number(filter.value.away)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.supremacy.localTeam >= Number(filter.value.home) && match.supremacy.localTeam >= Number(filter.value.away)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "local":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.supremacy.localTeam === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.supremacy.localTeam <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.supremacy.localTeam >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "visitor":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.supremacy.visitorTeam === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.supremacy.visitorTeam <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.supremacy.visitorTeam >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                             }
                                         }
                                     }
                                 }
                                 break;
                             case 'Corners Are':
                                 if (match.stats !== undefined) {
                                     if (match.stats.data !== undefined) {
                                         if (match.stats.data[0] != undefined) {
         
                                             switch (filter.applyTo) {
                                                 case "Match":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[0].corners === Number(filter.value.singular) || match.stats.data[1].corners === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[0].corners <= Number(filter.value.singular) || match.stats.data[1].corners <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[0].corners >= Number(filter.value.singular) || match.stats.data[1].corners >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "local":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[0].corners === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[0].corners <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[0].corners >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "visitor":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[1].corners === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[1].corners <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[1].corners >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                             }
                                         }
                                     }
                                 }
                                 break;
                             case 'Yellow Cards Are':
                                 if (match.stats !== undefined) {
                                     if (match.stats.data !== undefined) {
                                         if (match.stats.data[0] != undefined) {
                                            //  console.log(filter, "Yellow Filter");
                                             switch (filter.applyTo) {
                                                 case "Match":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[0].yellowcards === Number(filter.value.singular) || match.stats.data[1].yellowcards === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[0].yellowcards <= Number(filter.value.singular) || match.stats.data[1].yellowcards <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[0].yellowcards >= Number(filter.value.singular) || match.stats.data[1].yellowcards >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "local":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[0].yellowcards === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[0].yellowcards <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[0].yellowcards >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "visitor":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[1].yellowcards === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[1].yellowcards <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[1].yellowcards >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                             }
                                         }
                                     }
                                 }
                                 break;
                             case 'Red Cards Are':
                                 if (match.stats !== undefined) {
                                     if (match.stats.data !== undefined) {
                                         if (match.stats.data[0] != undefined) {
                                            //  console.log(filter, "Red Filter");
                                             switch (filter.applyTo) {
                                                 case "Match":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[0].redcards === Number(filter.value.singular) || match.stats.data[1].redcards === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[0].redcards <= Number(filter.value.singular) || match.stats.data[1].redcards <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[0].redcards >= Number(filter.value.singular) || match.stats.data[1].redcards >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "local":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[0].redcards === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[0].redcards <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[0].redcards >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 case "visitor":
                                                     switch (filter.operator) {
                                                         case "exact":
                                                             if (match.stats.data[1].redcards === Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "less":
                                                             if (match.stats.data[1].redcards <= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                         case "more":
                                                             if (match.stats.data[1].redcards >= Number(filter.value.singular)) {
                                                                 matchMeetsCriteriaTruthThreshold++
                                                             }
                                                             break;
                                                     }
                                                     break;
                                                 default:
         
                                                     break;
                                             }
                                         }
                                     }
                                 }
                                 break;
                         }
                     });
                     if (matchMeetsCriteriaTruthThreshold == this.$store.getters.returnFilter[ii].filters[i].length  ) {
                        // console.log("EXISTING IN FILTER",match.id)
                        ExistsInFilter = true;
                      }else{
                        // console.log("NOT EXISTING",match.id)
                      }
                }

            }

            if(ExistsInFilter){
                // console.log("ExistsInFilter",match.id)
              }else{
                // console.log("EXISTING IN FILTERS ELSE",match.id,ExistsInFilter);
                // console.log("NOT EXISTS IN FILTER",match.id,this.$store.getters.returnUser.appData.favMatches);
                for(let i = 0 ; i < this.$store.getters.returnUser.appData.favMatches.length ; i++ ){
                  
                  if(this.$store.getters.returnUser.appData.favMatches[i] == match.id ){
                  // console.log("EXIT IN SHOTLIST",this.$store.state.$Api.notFitInShortList);
                    let notFitInShortList = false;
                    for(let ii  =0; ii < this.$store.state.$Api.notFitInShortList.length ; ii++ ){
                      if(this.$store.getters.returnUser.appData.notFitInShortList[ii] == match.id){
                        notFitInShortList = true;
                      }
                    }
                    // console.log("NOT FIT IN SHORT LIST",notFitInShortList);
                    
                  }
                }
              }


        })
    })
},
    onCloseMatchInfoModal() {
      this.$store.commit("updateMatchModalStatus", false);
      this.$modal.hide("Match_Info");
    },
    pollData() {
      let authToken = localStorage.getItem(constants.LOCALSTORAGE.AUTH_KEY);
        this.$store.dispatch("getFilters");
      if (authToken && authToken != "null" && authToken != "undefined") {
        this.$store.dispatch("getLiveMatches",{first:1});
        let count =0 ;
        this.polling = setInterval(() => {
          if(count < 8 ){
          this.$store.dispatch("getLiveMatches",{first:1});
          }else{
            this.$store.dispatch("getLiveMatches");
          }
          count ++;

          // this.checkingMatchExistsInFilter();
        }, Constants.POLLING.TIME.LIVEMATCH);
      }
    },
    pausePolling() {
      if (!this.$store.getters.returnLoggedInBoolean) {
        clearInterval(this.polling);
      }
    }
  },
  created() {
    this.pollData();
    // console.log(this.$store.getters.returnLoggedInBoolean);

    // this.returnLoggedInBoolean();
    this.$router.beforeResolve((to, from, next) => {
      // If this isn't an initial page load.
      this.$store.commit("resetSelectedMatchesState");
      this.isLoading = true;
      this.$Progress.start();

      next();
    });

    this.$router.afterEach((to, from) => {
      // Complete the animation of the route progress bar.
      this.isLoading = false;
      this.$Progress.finish();
    });
  },

  beforeDestroy() {
    clearInterval(this.polling);
  },
  mounted() {
    this.$Progress.finish();
    this.$io.on("notification",payload =>{
      receiveForegroundNotification(payload);
    })
    this.$io.on("alert", data => {
      switch (data.type) {
        case "error":
          this.$notify({
            title: "Error",
            text: data.text,
            type: "error",
            group: "Main"
          });
          break;
        case "success":
          this.$notify({
            title: "Success!",
            text: data.text,
            type: "success",
            group: "Main"
          });
          break;
      }
    });
    // this.$io.on("addedToShortlist", data => {
    //   console.log("NOTIFICATION ON",data);
    //   if (data.success) {
    //     console.log("NOTIFICATION OPEN ")
    //     this.$notify({
    //       title: "Success!",
    //       text: "Added to your shortlist!",
    //       type: "success",
    //       group: "Main"
    //     });
    //   }
    // });
    this.$io.on("signalAlert", () => {
      var sound = new Howl({
        src: ["/Audio/Signal-Sounds/Alert-1.mp3"]
      });
      sound.play();
      this.$notify({
        title: "Signal Alert!",
        text: "you have a signal!",
        type: "success",
        group: "Main"
      });
    });
    this.$io.on("updateUser", data => {
      // console.log(data,"UPDATE USER");
      this.$store.commit("updateUser", data);
    });
    this.$io.on("responseOfLiveMatches",data =>{
      console.log("RESPONSE OF LIVE MATCHES",data);
      this.$store.commit("updateLiveMatches", data.Live);
    });

    this.$io.on("removedToShortlist",data =>{
      this.$store.commit("pullMatachIdFavAndShortList",data.match);
    })
    this.$io.on("filterUser",data =>{
    // console.log("FILTERSSS");
    //  this.$store.dispatch("getFilters");
    });
    this.$io.on("removedShortlistItemSuccess", data => {
      if (data.success) {
        this.$notify({
          title: "Success!",
          text: "Removed from your shortlist!",
          type: "success",
          group: "Main"
        });
      }
    });
    this.$io.on("failedShortlistAdd", data => {
      // if (data.error) {
      //   this.$notify({
      //     title: "Error,",
      //     text: data.error,
      //     type: "error",
      //     group: "Main"
      //   });
      // }
    });
  }
};
window.addEventListener("load", function(event) {
  document.querySelector(".loader").style.display = "none";
});
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Droid+Sans);
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #23d364;
  border-color: #23d364 transparent #23d364 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
mark{
    background: orange;
    color: black;
}
// ::-moz-selection { /* Code for Firefox */
//   color: red;
//   background: yellow;
// }

// ::selection {
//   color: red;
//   background: yellow;
// }
#loader-inner-content {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  width: 20%;
  height: 20%;
}
.loader {
  background: #fff;
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: absolute;
}
.Match_Row.table-data.eng-body.stat-row-highlight {
  border-bottom: 5px solid #000000;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-auto-flow: column;
  //grid-template-columns: 3.8% 4.8% 6.8% 15.6% 10.6% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 5.6%;
  // grid-template-columns: 4.8% 4.8% 6.8% 15.6% 10.6% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 5.6%;
  grid-template-columns: 3.8% 4.8% 6.8% 17.6% 5% 5.8% 5.8% 5.8% 6.8% 5.8% 4.8% 6.8% 6.8% 6.8% 6.8%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  overflow: hidden;
}
.Scanner_Odds.table-each-item.live-odd-data-out {
    border-right: 1px solid #c5d5cb;
    border-left: 1px solid #c5d5cb;
    height: 100%;
}
.stat-row-highlight:hover {
  opacity: 0.9;
}
.stat-row-highlight {
  opacity: 1;
  transition: 0.3s;
}
h4.custBadge {
  font-size: 12px;

  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  width: 50%;
  border-radius: 4px;
  color: white;
  padding: 17px 15px !important;
  margin: 0 auto;
  display: grid;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
@import "./Assets/Scss/Fonts.scss";
@import "./Assets/Scss/App.scss";
svg.pointer.svg-inline--fa.fa-thumbtack.fa-w-12.fa-lg {
  float: right;
      margin-right: 15px;
    font-size: 16px;
}
thead#big_table_head {
  position: fixed;
  top: 55px;
  z-index: 999;
}
span#signalCountBubble {
  font-family: "proxima_nova_altbold";

  padding: 5px;
}
.vld-overlay.is-full-page {
  z-index: 999;
  // margin-left: 250px;
  /*MobileView */
  margin-left: 0px;
  position: fixed;
  background: #000000a1;
}
.auth-screen-loader {
  margin-left: 0px !important;
}
.tooltip {
  display: block !important;
  z-index: 10000;
  font-family: "proxima_nova_altbold";
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.Top-Menu {
  min-height: 36px;
  background-color: #676869;
  display: grid;
  grid-auto-rows: 30px;
  grid-template-columns: 1fr;
  z-index: 10000;
  cursor: pointer;

  overflow: auto;
}
.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.red {
  color: rgb(184, 3, 3) !important;
}
.yellow {
  color : #F89406 !important;
}
.blue{
    color : #2F96B4 !important;
}
.green2 {
   color: #488948 !important;
}
.Scanner_Scores {
     border-right: 1px solid black;
}
.modal_Close_White {
  color: white;
}

span.strong {
  font-weight: 900;
}
.Scanner_Supremacy {
      border: 1px solid #c5d5cb;
    border-bottom: 0px;
    border-top: 0px;
    font-weight: bold;
    height: 100%;
}
.Scanner_Supremacy table {
    height: 100%;
}
span.record-bell {
    padding: 2px;
    width: 35px;
    height: 35px;
    display: block;
}
span.record-bell img{
  max-width: 100%;
}
.Scanner_Match_Time {
  font-size: 26px;
    text-align: center;
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}
.Scanner_Match_Begin {
  font-size: 11px;
  text-align: center;
  font-family: "proxima_nova_altbold";
  color: #404040;
}
div#fullBlur > img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  max-width: 100vw;
  /* max-height: 100vh; */
}

.live-odd-data-out {
  width: 100%;
}

td.table-each-item.live-odd-data-out {
  display: grid !important;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "left right";
}

a,
button {
  border-radius: 0px !important;
}

* {
  outline: none !important;
}

.form-control {
  border-radius: 0px !important;
}

#lo1 {
  grid-area: left;
}

#lo2 {
  grid-area: right;
}

* {
  animation-duration: 300ms !important;
}

img#ProfileImage {
  max-width: 40px;
}

.addIcon:hover {
  color: #888;
}

.stat-table .selected-team {
  color: white;
  background-color: #6f6f6f;
}

.teamContainer {
  display: grid;

  grid-template-columns: 25px 1fr;
  text-align: left;
  grid-template-rows: 30px;
  grid-auto-flow: column;
  -ms-flex-line-pack: center;
  align-items: center;

  font-family: "proxima_nova_altbold";

  color: #404040;
  text-transform: uppercase;
  white-space: nowrap;
  margin-left: 10px;

  -ms-flex-pack: center;
}
@keyframes animationName {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-o-keyframes animationName {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-moz-keyframes animationName {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-webkit-keyframes animationName {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.fadeInAndOut {
  -webkit-animation: animationName 5s infinite;
  animation: animationName 1s infinite !important;
}

div#settings {
  justify-items: baseline;
  align-items: center;
}

.smallMenuLayout {
  grid-template-columns: 90px 1fr !important;
}

#bottomContainer {
  background: #cecece;
  font-family: "proxima_nova_altbold";
}

.dots {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    margin: 0px;
}

th {
  font-family: "proxima_nova_altbold";
  font-size: 12px;
  line-height: 15px;

  text-transform: uppercase;
}

.createModal {
  display: grid;
  grid-template-areas: "modal-header";
  align-items: center;
}

.modalHeader {
  grid-area: modal-header;
  text-align: center;
  color: white;
  font-family: "proxima_nova_altbold";
  font-size: 1.4em !important;
  text-transform: uppercase;
  margin: 0;
  background-color: #3a3a3a;
  min-width: 100%;
}

#closeModal {
  float: right;
  padding: 10px 10px;
  top: 0;
  right: 20px;
  position: absolute;
}

.stat-table > thead > tr > th > .text {
  text-align: left;
}

.header {
  font-family: "proxima_nova_altbold";
  font-size: 2em;
  text-transform: uppercase;

  padding: 5px;
  margin: 0;
}

.filter-form {
  font-size: 13px;
}

.invalid {
  border-color: red;
}

#filterNavNext {
  grid-area: next;
}

#filterNavBack {
  grid-area: back;
}

#filterAnd {
  grid-area: and;
}

.pointer {
  cursor: pointer;
}

.active-sidebar-nested {
  background-color: #cac9c9;
}

.catHeadGrid {
  display: grid;
  grid-template-columns: 4fr 25px 25px;
  grid-template-rows: 20px;

  align-items: center;
  margin: 15px;
}
.catHeadGrid3 {
  display: grid;
  grid-template-columns: 4fr 65px 25px 25px;
  grid-template-rows: 20px;

  align-items: center;
  margin: 15px;
}

.catHeadGrid2 {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  grid-template-rows: 20px;
  cursor: pointer;
  align-items: center;
  padding: 15px;
}

svg.team_logo.svg-inline--fa.fa-times-circle.fa-w-16 {
  align-content: center;
  margin: auto;
}

.addButton {
  background-color: transparent;
  border-radius: 2px;
  color: black;
  border: none;
  outline: none;
}

label#min_label {
  text-align: right;
}

.oddsInputWrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.oddsInputWrap > .form-control {
  width: 90%;
}

.addButton:hover {
  cursor: pointer;
}

.home_away_select {
  padding: 0px 0px !important;
}

.notifications.vue-notifyjs {
  z-index: 9999;
}

#Main_Layout {
  overflow: hidden;
  position: absolute;
  display: grid;
  grid-template-rows: 55px 1fr 1fr 1fr;
  grid-template-columns: 250px 1fr;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  grid-template-areas:
    "sidebar statTables"
    "sidebar statTables"
    "sidebar statTables";
}

.table-heading-images > div {
  position: sticky;
  top: 105px !important;
  border: none !important;
  background-color: #e5e5e5;
  border-bottom: 1px solid rgb(131, 131, 131) !important;
  opacity: 1 !important;
  padding-bottom: 20px;
  z-index: 1000 !important;
}

th#th3 {
  padding: 6px !important;
}

#table_wrap {
  grid-area: statTables;
  overflow: auto;
  position: sticky !important;

  min-height: 100vh;
  margin-top: 0px;
  box-sizing: border-box;
}

.stat-table {
  position: sticky;
  margin-top: 55px;
  // margin-top: 55px;
}

.sidebar-item-header-nested {
  color: #000;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  grid-area: item-header;
}

.sidebar-item-header {
  background-color: #ffd41e;
  color: #000;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  grid-area: item-header;
}

.sidebar-item-header:hover {
  color: black;
  cursor: pointer;
}

.my-leagues .heading {
  background-color: #23d364;
  color: white;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  width: 100%;
  float: left;
}
.Scanner_Supremacy.table-each-item{
      border-right: 1px solid #c5d5cb;
}
.Scanner_Supremacy.table-each-item table tr:first-child {
    background: none;
    border: none;
}
.Scanner_Teams {
    height: 100%;
}
.stat-table .table-each-item {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.table-each-item table {
    height: 100%;
    width: 101% !important;
}
.table-each-item table tr:first-child {
    // background: #dbdbdb;
    border-bottom: 1px solid #acbcb2;
}
.Scanner_Teams table {
    height: 100%;
}
.Scanner_Teams table tr:first-child {
    background: #dbdbdb;
    border-bottom: 1px solid #acbcb2;
    border-left: 1px solid #acbcb2;
}

.Scanner_Scores table tr:first-child{
    background: #dbdbdb;
        border-bottom: 1px solid #acbcb2;
    border-right: 1px solid #acbcb2;
}
td.table-each-item.mf-area {
  background-color: transparent;
}

svg.svg-inline--fa.fa-plus.fa-w-14 {
  cursor: pointer;
}

.heading-data.largest-box {
  color: #516a72;
}

.sidebar {
  background: #676869;
  box-shadow: 0px 0px 10px -4px rgb(75, 75, 75);
  width: 100px;
  overflow: scroll;
  grid-area: sidebar;
  position: fixed !important;
  top: 0px !important;
  margin-top: 55px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  height: 100vh;
  box-sizing: border-box;
  width: 250px;
  background: rgb(240,0,0);
  background: -moz-linear-gradient(top, rgba(240,0,0,1) 0%, rgba(102,2,2,1) 100%);
  background: -webkit-linear-gradient(top, rgba(240,0,0,1) 0%,rgba(102,2,2,1) 100%);
  background: linear-gradient(to bottom, rgba(240,0,0,1) 0%,rgba(102,2,2,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f00000', endColorstr='#660202',GradientType=0 );
  overflow: hidden;
  
}
.sidebar .sidebaroverlay{
  background-image: url(/img/sidebarlogo.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
    position: fixed;
    height: 100vh;
    width: 250px;
    z-index: -1;
}
#bottomContainer {
  background: #3a3a3a;
  -webkit-box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  z-index: 99999;
  color: white;
  display: grid;
  grid-template-areas:
    "profile"
    "settings";
  grid-template-rows: 140px 30px;
}

.profContainSmall {
  grid-template-columns: 1fr !important;
}

#profileContainer {
  display: grid;
  grid-template-columns: 1fr 2fr;
  -ms-flex-line-pack: center;
  /* align-content: center; */
  margin: 25px 25px;
  grid-area: profile;
  /* align-items: center; */
}

.settingsIcon {
  cursor: pointer;
}

.settingsIcon:hover {
  color: rgb(224, 224, 224);
}

.menuCaret {
  margin-left: auto;
  cursor: pointer;
}

.menuCaret:hover {
  color: rgb(216, 216, 216);
}

#settings {
  background-color: #333333;
  grid-area: settings;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-content: center;
  padding: 0px 15px;
}

.drop_shadow_right {
  overflow: scroll;
  padding-bottom: 57px;
}

nav {
  grid-area: navbar;
  box-sizing: border-box;
  z-index: 100;
  position: fixed !important;
  width: 100%;
}

.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)
  > .swal2-modal {
  margin: auto !important;
}

.fixed {
  position: fixed !important;
  top: 0px !important;
  box-sizing: border-box;
}

.footer {
  box-sizing: border-box;
  grid-area: footer;

  position: fixed !important;
  width: 100%;
}
.sererate-section > .text {
  color: white !important;
}
.heading-data {
  /*font-size: 11px;*/
  color: white;
  font-family: "proxima_nova_altbold";
  font-size: 12px;
  /*text-transform: uppercase;
   padding: 0px; */
  /* margin: 0px; */
  /* height: 10px; */
  text-align: center;
  color: #516a73;
}
.break {
  color: white;
  display: block;
  -webkit-transform: rotate(0deg) !important;
  transform: rotate(0deg) !important;
  text-align: center;
}
.swal2-styled.swal2-confirm {
  border: 0;
  border-radius: 0.25em;
  background: initial;
  background-color: #000000 !important;
  border: none !important;
  outline: none !important;
  color: #fff;
  font-size: 1.0625em;
}
.vs__dropdown-menu {
  display: block;
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  z-index: 1000;
  padding: 5px 0;
  margin: 0;
  width: 100%;
  max-height: 105px;
  min-width: 101px;
  overflow-y: auto;
  -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-top-style: none;
  border-radius: 0 0 4px 4px;
  text-align: left;
  list-style: none;
  background: #fff;
}

.p-form {
  margin-top: 20px;
}

button.p-form {
  width: auto;
  margin-left: auto;
  display: block;
  margin-right: auto;
}

.p-form label {
  display: block;
}

.val-form {
  padding-bottom: 20px;
}
.v--modal-overlay .v--modal-box {
  top: 72px !important;
  left: 450px !important; 
}
.modalHeader {
  padding: 19px !important;
}

.v--modal-overlay .v--modal-box {
  top: 72px !important;
  // width: 780px !important;
  width: 840px !important;
}
@media only screen and (max-width: 720px) {
  .v--modal-overlay .v--modal-box {
    width: 100% !important;
    left: 0px !important;
    top: 72px !important;
  }
}

.modalHeader {
  padding: 19px !important;
}

.inner-txt {
  padding: 100px 0;
  text-align: center;
}

div#moreInfoBox {
  height: 506px;
  overflow-y: scroll;
}
</style>
