// import axios from "axios";
import axios from "../../Common/interceptor";
import router from "./../../Router/router";
import Constants from "../../Constants";
import { initNotification } from "../../Common/push-notifications";
const apiUrl = process.env.VUE_APP_APIURL;
export const authModule = {
  state: {
    user: {
      _id: String,
      contactInformation: {
        name: {
          first: String,
          middle: String,
          last: String
        },
        email: String,
        phoneNumber: String
      },
      timezone: null,
      filterGoalHalfMuteStatus:Boolean,
      filterGoalSecondMuteStatus:Boolean,
      appData: {
        filters: [],
        signals: [],
        shortList: [],
        signalAlerts: [],
        currentlyTrueSignals: []
      }
    },
    pollData: function() {},
    loggedIn: false
  },
  getters: {
    returnLoggedInBoolean(state) {
      return state.loggedIn;
    },
    returnUser(state) {
      return state.user;
    },
    returnSignalAlerts(state) {
      return state.user.appData.signalAlerts;
    },
    returnSignals(state) {
      return state.user.appData.signals;
    }
  },
  actions: {
    signupAndLogin({ commit, dispatch }, payload) {
      axios.post(apiUrl + "/api/accounts/signup", { payload }).then(resp => {
        if (resp.data.success === true) {
          onSuccessLogin(resp, commit, dispatch);
        }
      });
    },
    doLogin({ commit, dispatch }, payload) {
      return axios
        .post(apiUrl + "/api/accounts/login", { payload })
        .then(resp => {
          if (resp.data.success === true) {
            // this.$session.start();
            const date = new moment(new Date()).add(336, 'hours');
            // console.log(date,"DATE"); 
            // this.$session.set("expireDate",date);
            localStorage.setItem("date",date);
            onSuccessLogin(resp, commit, dispatch);
            return {
              success: true,
              message: "Successfully Logged In"
            };
          }
        })
        .catch(err => {
          return {
            success: false,
            message: err
          };
        });
    },

    doLogout({ commit }) {
      axios
        .post(apiUrl + "/api/accounts/logout")
        .then(() => {
          commit("updateLoggedInBoolean", false);
          localStorage.removeItem(Constants.LOCALSTORAGE.AUTH_KEY);
          commit("stopPolling");
          // router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    },
    forgotPassword(_, payload) {
      axios
        .post(apiUrl + "/api/accounts/forgot-password", { payload })
        .then(resp => {
          if (resp.data.success === true) {
            router.push("login");
          }
        });
    },
    resetPassword(_, payload) {
      axios
        .post(apiUrl + "/api/accounts/reset-password", { payload })
        .then(resp => {
          if (resp.data.success === true) {
            router.push("login");
          }
        });
    },
    requestUser({ commit }) {
      function getUserData() {
        axios.get(apiUrl + "/api/accounts/me").then(resp => {
          commit("updateUser", resp.data);
          commit("fetchMyLeagues", resp.data.appData.leagues, { root: true });
          // this.$store.state.$Api.myLeagues = resp.data.leagues;
        });
      }
      getUserData();
    },
    updateUserProfile({ commit }, payload) {
      function updateUserData() {
        axios
          .post(apiUrl + "/api/accounts/me", { payload })
          .then(resp => {
            commit("updateUser", resp.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
      updateUserData();
    },
    updateFCMDeviceRegistrationToken({ commit }, payload) {
      axios
        .post(apiUrl + "/api/accounts/fcm-token", { payload })
        .then(resp => {
          // console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mutations: {
    pushMatchIdFavAndShortList(state,data){
      // console.log("THERER",data);
      if(!state.user.appData.favMatches.includes(data._id)){

        state.user.appData.favMatches.push(data._id);
      }
      let notExist = true;
      for(let i = 0 ; i < state.user.appData.shortList.length ; i++ ){
        if(state.user.appData.shortList[i]._id  === data){
            notExist = false;
            break;  
        }
      }
      if(notExist){
        if(data.time > 45){
          state.user.appData.shortList.push({_id : data._id, status:'FH'}); 
        }else{
          state.user.appData.shortList.push({_id : data._id, status:'SH'});
        }
      }
      
      // this.$notify({
      //   title: "Success!",
      //   text: "Added to your shortlist!",
      //   type: "success",
      //   group: "Main"
      // });
    },
    pullMatachIdFavAndShortList(state,data){
      // console.log("THERER",data);
      if(state.user.appData.favMatches.indexOf(data)  > -1 ){

        state.user.appData.favMatches.splice(state.user.appData.favMatches.indexOf(data),1);
      }
      for(let i = 0 ; i < state.user.appData.shortList.length ; i++ ){
        if(state.user.appData.shortList[i]._id  === data){
          state.user.appData.shortList.splice(state.user.appData.shortList[i], 1);
        }
      }
      // if(state.user.appData.shortList.indexOf(data)  > -1 ){
      //   state.user.appData.shortList.splice(state.user.appData.shortList.indexOf(data),1);
      // }
    },
    updateUser(state, data) {
      state.user = data;
    },
    updateFilterCount(state, data) {
      let index = state.user.appData.filters.findIndex(item => {
        return item.id == data.filter_id;
      });
      if (index >= 0) {
        if (data.count !== 0) {
          state.user.appData.filters[index].new_matches_count = state.user
            .appData.filters[index].new_matches_count
            ? ++state.user.appData.filters[index].new_matches_count
            : 1;
        } else {
          state.user.appData.filters[index].new_matches_count = 0;
          this.dispatch("markAllNotificationAsRead", {
            filter_id: state.user.appData.filters[index].id
          });
        }
      }
    },
    updateUserAttribute(state, data) {
      state.user[data.attribute] = data.value;
    },
    updateLoggedInBoolean(state, data) {
      state.loggedIn = data;
    },
    startPolling(state) {
      // this.dispatch("getLiveMatches");
      // console.log("DISPTACH 219")
      this.dispatch("getLiveMatches",{first:1});
      let count  = 0;
      state.pollData = setInterval(() => {
        if(count < 8 ){
          // console.log("DISPTACH 223")
          this.dispatch("getLiveMatches",{first:1});
          }else{
            // console.log("DISPTACH 226")
            this.dispatch("getLiveMatches");
          }
          count ++;
        // this.dispatch("requestAllMatches");
      }, Constants.POLLING.TIME.LIVEMATCH);
    },
    stopPolling(state) {
      clearInterval(state.pollData);
    }
  }
};
function onSuccessLogin(resp, commit, dispatch) {
  commit("updateLoggedInBoolean", true);
  commit("updateUserAttribute", {
    attribute: "_id",
    value: resp.data.user._id
  });

  localStorage.setItem(Constants.LOCALSTORAGE.AUTH_KEY, resp.data.user.token);
  initNotification();
  commit("startPolling");
  dispatch("requestAllMatches", 1);
  dispatch("requestUser");
  router.push("/scanner/live");
  // window.location.reload();
}
