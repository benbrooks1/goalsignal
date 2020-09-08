import store from "./../Vuex/store";
import Vue from "vue";
import router from "./../Router/router";
import { Howl } from "howler";
import Constants from "../Constants/index";
import { findKey } from "lodash";
import GOALALERT from "../Assets/Audio/GOAL_ALERT.wav"
import AlertForNotInShortList from "../Assets/Audio/Sound_1_Goal_Scored_Sound_when_user_is_viewing_main_filter_list.wav";
import AlertFor1stHalf from "../Assets/Audio/Sound_2_New_Goal_Alert_for_1st_half_late_goals.wav";
import AlertFor2ndHalf from "../Assets/Audio/Sound_3_New_Goal_Alert_for_2nd_half_late_goals.wav";
let messaging;
let SoundId;
let SoundPlayBoolean =  true;
function initNotification() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.VUE_APP_FCM_API_KEY,
    authDomain: process.env.VUE_APP_FCM_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FCM_DB_URL,
    projectId: process.env.VUE_APP_FCM_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FCM_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FCM_APP_ID
  };
//   firebase.initializeApp(firebaseConfig);
  // store.commit("updateMatchModalStatus", true);
//   console.log("CRZY");
  let  counter = 1; 
//   setInterval(() => {
      
  
//     // console.log(store.getters.returnLiveMatchesInRawForm,"LIVES MATACH");
//     // console.log(store.getters.returnFilter,"RETURN FILTER");
//     console.log( " RETURN SELECTD FILTER")
//     counter ++ ;
//     generatingSoundAndNotification(counter);
//   },15000)
//   messaging = firebase.messaging();

//   handleTokenRefresh();
//   requestPermission((deviceToken)=>{
    // sendToken(deviceToken);
    // receiveForegroundNotification();
// })
}
function generatingSoundAndNotification(count){
    if(count % 2 === 1){
        toastr.options.positionClass = 'toast-bottom-right'
        // console.log("SOUND PLAYED1")
        let UserVolume = (store.getters.returnUser.volume)/100 || 0;
        let sound = new Howl({
            src: [
                AlertFor1stHalf
            ],
            volume: UserVolume,
          });
          sound.play();
    }else{
        toastr.options.positionClass = 'toast-bottom-right'
        // console.log("SOUND PLAYED1")
        let UserVolume = (store.getters.returnUser.volume)/100 || 0;
        let sound = new Howl({
            src: [
                AlertFor2ndHalf
            ],
            volume: UserVolume,
          });
          sound.play();
    }
}
async function requestPermission() {
//   let permission = await messaging.requestPermission();
//   messaging.requestPermission().then(function() {
    // navigator.serviceWorker
    //   .register("/firebase-messaging-sw.js")
    //   .then(registration => {
        // messaging.useServiceWorker(registration);
    //   });
//   });
  return permission;
}
function retrieveToken() {
  return new Promise((resolve, reject) => {
    // let storedFcmToken = localStorage.getItem(Constants.LOCALSTORAGE.FCM_TOKEN);
    // if (storedFcmToken) {
    //   resolve(storedFcmToken);
    // } else {
    //   messaging
    //     .getToken()
    //     .then(deviceToken => {
    //       localStorage.setItem(Constants.LOCALSTORAGE.FCM_TOKEN, deviceToken);
          resolve();
    //     })
    //     .catch(err => {
    //       reject(err);
    //     });
    // }
  });
}
function sendToken(deviceToken) {
  let payload = {
    token: deviceToken
  };
  store.dispatch("updateFCMDeviceRegistrationToken", payload);
}
function playNotificationSound(type,matchID) {
    // console.log("PLAYED","",index,UserVolume
    // ? Constants.AUDIO_BASE_URL + Constants.NOTIFICATION.TYPE.EVENT_GOAL_FOR_1nd_HALF_LATE_GOAL.SOUND
    // : Constants.AUDIO_BASE_URL + Constants.NOTIFICATION.DEFAULT_SOUND);
    // let sound = new Howl({
    //     src: [ 
    //       Alert
    //     ],
    //     volume: UserVolume,
    //   });
    //   sound.play();
  let index = findKey(Constants.NOTIFICATION.TYPE, function(o) {
    return o.VALUE == type;
  });
  let UserVolume = (store.getters.returnUser.volume)/100 || 0;
  
  if( Constants.NOTIFICATION.TYPE[index].VALUE === 6 ){
    // console.log(this.$store.liveMatches,"LIVE MATCHES");
    
    for (let ii = 0; ii < store.getters.returnFilter.length; ii++) {
      // console.log("KIYA SENCE HY BHEEE",store.getters.returnLiveMatchesInRawForm)
        store.getters.returnLiveMatchesInRawForm.forEach((league) => {
          // console.log("KIYA SENCE HY BHEEE")
          league.matches.forEach(match => {
            // console.log("ME YAHN HON",store.getters.returnFilter[ii]);
            for (let i = 0; i < store.getters.returnFilter[ii].filters.length; i++) {
              // state.beforeCount++
             let matchMeetsCriteriaTruthThreshold = 0
            //  console.log("FILTER LENGTH ",store.getters.returnFilter[ii].filters);
             store.getters.returnFilter[ii].filters[i].forEach((filter) => {
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
                                    //   console.log(filter, "Yellow Filter");
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
                                    //   console.log(filter, "Red Filter");
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
            //   console.log(i,"INDEX OF I FILTER",matchMeetsCriteriaTruthThreshold,store.getters.returnFilter[ii].filters[i],matchMeetsCriteriaTruthThreshold == store.getters.returnFilter[ii].filters[i].length,match.id === matchID);
              if (matchMeetsCriteriaTruthThreshold == store.getters.returnFilter[ii].filters[i].length && match.id === matchID ) {
                 if( i== 0){
                        console.log("SOUND PLAYED 789")
                  let sound = new Howl({
                    src: [
                        AlertFor1stHalf
                    ],
                    volume: UserVolume,
                    onend: () => {
                        SoundPlayBoolean = true;
                      },
                    onplay: () =>{
                        SoundPlayBoolean = false
                    } 
                  });
                  sound.on('play',() => {
                    // console.log("PLAY SOUND 857")
                });
                  if(SoundPlayBoolean){
                        // console.log("869")
                      sound.play();
                  }


                 }else{

                    // console.log("SOUND PLAYED 456")
                  let sound = new Howl({
                    src: [
                        AlertFor1stHalf
                    ],
                    volume: UserVolume,
                    onend: () => {
                        SoundPlayBoolean = true;
                      },
                    onplay: () =>{
                        SoundPlayBoolean = false
                    } 
                  });
                  sound.on('play',() => {
                    // console.log("PLAY SOUND 878")
                });
                  if(SoundPlayBoolean){
                    // console.log("881");
                    sound.play();
                }


                 }
                  break;
              }
          }
          });
        });
      
    }
  }else{
    //   console.log("SOUND PLAYED1")
  let sound = new Howl({
    src: [
      index
        ? Constants.AUDIO_BASE_URL + Constants.NOTIFICATION.TYPE[index].SOUND
        : Constants.AUDIO_BASE_URL + Constants.NOTIFICATION.DEFAULT_SOUND
    ],
    volume: UserVolume,
                    onend: () => {
                        // console.log("onEND");
                        SoundPlayBoolean = true;
                      },

                    onplay: () =>{
                        // console.log("onPlay");
                        SoundPlayBoolean = false
                    } 
  });
  sound.on('play',() => {
    // console.log("PLAY SOUND")
});
  if(SoundPlayBoolean){
    // console.log("PLAY ED SOUND 914");
    sound.play();
}
}
  
}
function findGoalFilterType(type,matchID) {
    let filterIndex = -1;
  let index = findKey(Constants.NOTIFICATION.TYPE, function(o) {
    return o.VALUE == type;
  });
  let UserVolume = (store.getters.returnUser.volume)/100 || 0;
  
  if( Constants.NOTIFICATION.TYPE[index].VALUE === 6 ){  
    for (let ii = 0; ii < store.getters.returnFilter.length; ii++) {
      store.getters.returnLiveMatchesInRawForm.forEach((league) => {
         league.matches.forEach(match => {
          for (let i = 0; i < store.getters.returnFilter[ii].filters.length; i++) {
            let matchMeetsCriteriaTruthThreshold = 0
                 store.getters.returnFilter[ii].filters[i].forEach((filter) => {
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
                                    //   console.log(filter, "Yellow Filter");
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
                                    //   console.log(filter, "Red Filter");
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
            //   console.log(ii,store.getters.returnFilter[ii].filters[i].length,matchMeetsCriteriaTruthThreshold);
              if (matchMeetsCriteriaTruthThreshold == store.getters.returnFilter[ii].filters[i].length && match.id === matchID ) {
                // console.log("HERE I AM ",ii)
                if(ii != 2){
                filterIndex = ii;
                }
                // return i;
              }
          }
          });
        });
      
    }
    // console.log("FOUND I",filterIndex);
    return filterIndex;
  }
  
}
function receiveForegroundNotification(payload) {

       

        let notificationIsAllow = true;
        let UserVolume = (store.getters.returnUser.volume)/100 || 0;
        //   console.log("RECEIVE FORE GROUND NOTFICATION ",payload)
        setTimeout(() => {
          let notification = JSON.parse(payload.data.content);
          let indexOfFilterGoalType = findGoalFilterType(notification.type,notification.match_id);
          console.log("NOTIFICATION DATA",payload, store.getters.returnUser);
         
            if(notification.user_id.toString() !== store.getters.returnUser._id.toString()){
               console.log("NOTIFICATOIN IS NOT RECIVED ", notification.user_id.toString(), store.getters.returnUser._id.toString() )
                return;

            }
          if(notification.notInShortlist){
            // console.log("Message received. WHEN MATCH IS NOT IN SHORTLIST", notification);
            
            // console.log(indexOfFilterGoalType);
            
            if(indexOfFilterGoalType == 0 && store.getters.returnUser.filterGoalHalfMuteStatus){
                notificationIsAllow = false
            }
            if(indexOfFilterGoalType == 1 && store.getters.returnUser.filterGoalSecondMuteStatus){
                notificationIsAllow = false
            }
            
            if(notificationIsAllow &&  indexOfFilterGoalType != -1){
                // console.log("SOUND PLAYED2")
                // playNotificationSound(notification.type,notification.match_id);
                let FilterIndex = findGoalFilterType(notification.type,notification.match_id);
                // console.log(FilterIndex,"FILTER INDEX");
                if(FilterIndex == 1){
                    let UserVolume = (store.getters.returnUser.volume)/100 || 0;
                    let sound = new Howl({
                    src: [
                        AlertFor2ndHalf
                        ],
                      volume: UserVolume,
                      onend: () => {
                        SoundPlayBoolean = true;
                      },
                    onplay: () =>{
                        SoundPlayBoolean = false
                    } 
                  });
                  sound.on('play',() => {
                    SoundPlayBoolean = false;
                    // console.log("PLAY SOUND 878")
                });
                sound.on('end', () =>{
                    SoundPlayBoolean = true;
                });
                  if(SoundPlayBoolean){
                    // console.log("881");
                    SoundPlayBoolean = false;
                    sound.play();
                }
                //  console.log("1661 soUNid",sound.playing(SoundId));
                }else{
                    let UserVolume = (store.getters.returnUser.volume)/100 || 0;
                    let sound = new Howl({
                    src: [
                        AlertFor1stHalf
                        ],
                      volume: UserVolume,
                      onend: () => {
                        SoundPlayBoolean = true;
                      },
                    onplay: () =>{
                        SoundPlayBoolean = false
                    } 
                  });
                  sound.on('play',() => {
                    SoundPlayBoolean = false;
                    // console.log("PLAY SOUND 878")
                });
                sound.on('end', () =>{
                    SoundPlayBoolean = true;
                });
                  if(SoundPlayBoolean){
                    // console.log("881");
                    SoundPlayBoolean = false;
                    sound.play();
                }  
                        //  console.log("1671 soUNid",sound.playing());
                }
            }
        }else{
            // console.log("Message received. WHEN MATCH IS SHORTLIST", notification);
            
             let UserVolume = (store.getters.returnUser.volume)/100 || 0;
             let Src = null;
             if(notification.type == 1){
                Src = Constants.NOTIFICATION.TYPE.MATCH_START.SOUND
             }else if (notification.type == 2){
                Src = Constants.NOTIFICATION.TYPE.MATCH_END.SOUND
             }else if (notification.type == 3){
                Src = Constants.NOTIFICATION.TYPE.MATCH_FILTER.SOUND
             }else if (notification.type == 4){
                Src = Constants.NOTIFICATION.TYPE.MATCH_EVENT.SOUND
             }else if (notification.type == 5 ){
                Src = Constants.NOTIFICATION.TYPE.FAV_FILTER
             }else if (notification.type == 6){
                Src = Constants.NOTIFICATION.TYPE.EVENT_GOAL.SOUND 
             }else if (notification.type == 7){
                Src = Constants.NOTIFICATION.TYPE.EVENT_HALFTIME.SOUND 
             }else if (notification.type == 8){
                Src = Constants.NOTIFICATION.TYPE.EVENT_PENALTY.SOUND 
             }else if (notification.type == 9){
                Src = Constants.NOTIFICATION.TYPE.EVENT_RED_CARD.SOUND 
             }else if (notification.type == 10){
                Src = Constants.NOTIFICATION.TYPE.EVENT_PENALTY_KICK.SOUND 
             }else if (notification.type == 11){
                Src = Constants.NOTIFICATION.TYPE.MATCH_HALF.SOUND 
             }
                console.log("NOTICIFIATION TYPE ", notification.type );
                if( notification.type === 6){
                    console.log("NOTICIFIATION TYPE " )
                    return;
                }
             let sound = new Howl({
                 src: [
                     Constants.AUDIO_BASE_URL + Src
                    ],
                    volume: UserVolume,
                    onend: () => {
                        SoundPlayBoolean = true;
                      },
                    onplay: () =>{
                        SoundPlayBoolean = false
                    } 
                  });
                  sound.on('play',() => {
                    // console.log("PLAY SOUND 878")
                    SoundPlayBoolean = false;
                });
                sound.on('end', () =>{
                    // console.log("END SOUND 878");
                    SoundPlayBoolean = true;

                })
                  if(SoundPlayBoolean ){
                    // console.log("881");
                    SoundPlayBoolean = false;
                    sound.play();
                }    
        }
          toastr.options.onclick = function() {
            if (notification.filter_id) {
              router.push("/scanner/live");
              store.commit("updateSelectedFilter", notification.filter_id);
              if (
                notification.type == Constants.NOTIFICATION.TYPE.FAV_FILTER.TYPE
              ) {
                store.commit("updateFilterCount", {
                  filter_id: notification.filter_id,
                  count: 0
                });
              }
            } else if (notification.match_id) {
              store.commit("updateSelectedMatch", notification.match_id);
            }
          };
          let showPOP = store.getters.returnUser.popupShow;
          
          if(indexOfFilterGoalType == -1){
            // console.log(indexOfFilterGoalType, " INDEX OF FILTER GOAL TYPE");
            notificationIsAllow  = false;
          }
          if(showPOP && (notificationIsAllow || !notification.notInShortlist) ){
          toastr.options.timeOut = 30000;
          toastr.options.closeButton =  true;

          toastr.options.positionClass = 'toast-bottom-right'
          if( notification.type == 9 ||  notification.type == 10  ){
            toastr.error(notification.content, notification.title);
          }else if (notification.type == 6){
            if(notification.notInShortlist){
                toastr.warning(notification.content, notification.title);
            }else{
                toastr.success(notification.content, notification.title);
            }
          }
          else{
            toastr.info(notification.content, notification.title);
          }
          if (notification.type == Constants.NOTIFICATION.TYPE.FAV_FILTER.VALUE) {
            store.commit("updateFilterCount", {
              filter_id: notification.filter_id
            });
          } else {
            store.commit("addNotification", notification);
          }
          }else if (!notificationIsAllow){
            Vue.prototype.$io.emit("updateNotificationStatus",{notification});
          }
        });







  
//   messaging.onMessage(payload => {
   
//   });
}

// function handleTokenRefresh() {
//   messaging.onTokenRefresh(function() {
//     localStorage.setItem(Constants.LOCALSTORAGE.FCM_TOKEN, "");
//     retrieveToken()
//       .then(deviceToken => {
//         sendToken(deviceToken);
//         receiveForegroundNotification();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
// }

export { initNotification,receiveForegroundNotification };
