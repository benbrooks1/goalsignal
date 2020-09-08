<template>
  <!--  <nav class="navbar navbar-default">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="navbar-header">
                    <button
                    type="button"
                    class="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false"
                  >
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                    <a class="navbar-brand" href="/home">
                    <img src="./../../../Assets/Images/Logos/Soccer-Signals-Logo.png"/>
                  </a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="#">My Account</a>
                        </li>
                        <li>
                            <a href="#">Knowledge</a>
                        </li>
                        <li>
                            <a  >Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </nav>-->
  <div id="Navbar">
    <div id="Brand">
      <img src="./../../../Assets/Images/Logos/gosignalogo.png" />
    </div>
    <div id="Middle"></div>
    <div id="Menu">
      <div id="rightMenu">
        <div class="pointer menu-item-wrapper">
          <div class="fb-notification">
            <div
              id="notificationContainer"
              v-show="showNotifications"
              class="popup-box"
            >
              <div id="notificationTitle">
                Notifications
                <!-- <button
                  v-if="returnNotifications.length"
                  @click="onClickMarkAllAsRead()"
                >
                  Mark all as read
                </button>-->
              </div>
              <div id="notificationsBody">
                <div
                  v-for="notification in returnNotifications.slice(0, 4)"
                  v-bind:key="notification.id"
                  class="notify-body"
                  @click="onClickNotification(notification)"
                >
                  <div class="not-body-1 col-lg-2">
                    <img
                      src="./../../../Assets/Images/Logos/notification.png"
                    />
                  </div>
                  <div class="not-body-2 col-lg-10" v-bind:class="getClass(notification)">
                    <h5>{{ notification.title }}</h5>
                    <p>{{ removeHtmltags(notification.content) }}</p>
                    <small>{{ parseTime(notification.time) }}</small>
                    <small style="margin-left:10px;">{{
                      parseDate(notification.time)
                    }}</small>
                  </div>
                </div>
                <div v-if="returnNotifications.length <= 0" class="notify-body">
                  <div class="not-body-1 col-lg-12">
                    <h5>No New Notifications!</h5>
                    <img
                      src="./../../../Assets/Images/Logos/notification.png"
                    />
                  </div>
                </div>
              </div>
              <div id="notificationFooter">
                <button @click="onClickSeeMoreNotification()">See All</button>
              </div>
            </div>
          </div>
        </div>

        <div class="pointer menu-item-wrapper">
         
         <!-- <span v-if="returnRoute === '/scanner/all'" style="overflow: unset;">
            {{date}}  
          <v-date-picker
  v-model="date"
  :popover="{ placement: 'bottom', visibility: 'click' }">
  <span class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none">
      <font-awesome-icon
            
             size="2x"
            class="pointer"
            icon="calendar-alt"
            
          />
  </span>
</v-date-picker>
</span>-->
          <!--<div class="searchdiv">
            <input id="search" v-model="searchFeild" v-on:keyup="findFullSearch(searchFeild,true)" />
            <font-awesome-icon
           
             size="1x"
            class="pointer"
            icon="search"
          />
          </div>
          <button class="next-btn" @click="findselectSearch(searchFeild,true)"> Next </button>-->
          <!-- <span @click="refreshing()" class="new-icons"><img src="./../../../Assets/Images/Logos/refresh.png" />
          </span> -->
          <font-awesome-icon
            @click="refreshing()"
             size="2x"
            class="pointer"
            icon="sync-alt"
            v-bind:class="{ 'rotating': retrunLoadingState}"
          />
          <!-- <font-awesome-icon size="lg" class="pointer" icon="bell" /> -->

          <span @click="redirectToSupport()" class="new-icons"><img src="./../../../Assets/Images/Logos/question.png" /></span>
          <!--<span class="bell-icon" >
            <font-awesome-icon
            
              size="2x"
              class="pointer"
              icon="question-circle"
              @click="redirectToSupport()"
            />
          </span>-->

          <span class="bell-icon new-icons" @click="onToggleNotifications()"><img src="./../../../Assets/Images/Logos/bell.png" /><i v-if="returnUnreadNotificationCount > 0">{{ returnUnreadNotificationCount }}</i></span>
          <!--<span class="bell-icon" @click="onToggleNotifications()">
            <font-awesome-icon size="2x" class="pointer" icon="bell" />
           <i style="background: red;color: white;">{{ returnUnreadNotificationCount }}</i>
          </span>-->

          <!-- {{returnNotifications}} -->
          <!-- <div class="pointer menu-item-wrapper"> -->
          
          
          <!-- <p></p> -->
          <!-- </div> -->
          <div id="signalSelector-account">
            <div
              id="signalSelectorButton2"
              class="forfont-size: 10px;"
              style="height:20px"
              v-on:click="isAccount = !isAccount"
              >
              <span class="new-icons">
                <img src="./../../../Assets/Images/Logos/user.png" />
                <!--<font-awesome-icon
                    
                    style=" margin: auto;"
                    size="2x"
                    class="pointer"
                    icon="user"
                  />-->
                  </span>
              
            </div>
            <div v-if="isAccount" id="signalOptionsWrapper22">
              <span class="signalName">
                <div class="pointer menu-item-wrapper">
                  <font-awesome-icon
                    @click="redirectToProfile()"
                    style=" margin: auto;"
                    size="2x"
                    class="pointer"
                    icon="user"
                  />
                </div>
              </span>
             
              <span class="signalName">
                <div class="pointer menu-item-wrapper">
                  <font-awesome-icon style=" margin: auto;"
                    @click="$modal.show('Settings')"
                    size="2x"
                    class="pointer"
                    icon="cog"
                  />
                  <!-- <p>Settings</p> -->
                </div>
              </span>
               <span class="signalName">
                <font-awesome-icon
                style=" margin: auto;"
                  @click="onClickLogout()"
                  size="2x"
                  class="power-off"
                  icon="power-off"
                />
              </span>
              <!-- <span class="signalName">
                <span class="payment-text">
                  <a style="font-size:15px" @click="onClickPaymentUrl()">Billing</a>
                </span>
              </span> -->
            </div>
          </div>


          
          
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import * as mark from 'mark';
// import mark from 'mark';
// import mark as "Mark"
import router from "./../../../Router/router";
import Constants from "../../../Constants";
export default {
 
  data() {
    
    return {
      date: new Date(),
      magic_flag:true,
       searchFeild : "",
      isAccount:false,
      paymentUrl:
        Constants.SOCCER_SIGNAL_PRO.MAIN_URL +
        Constants.SOCCER_SIGNAL_PRO.PAYMENT_URL,
      showNotifications: false
    };
  },
  //  mounted() {
  //     let recaptchaScript = document.createElement('script')
  //     recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/mark.js/8.6.0/mark.min.js')
  //     document.head.appendChild(recaptchaScript)
  //   },
  watch: {
        date(val) {
          // console.log( moment(val).format('YYYY-MM-DD'),"Date");
          this.$store.dispatch("requestAllMatchesFromDate", {startDate:moment(val).format('YYYY-MM-DD'),endDate:moment(val).format('YYYY-MM-DD')})
        }
      },
  methods: {
    dateUpdated(value){
      // console.log("Date");
    },
    removeHtmltags(value){
      return value.replace(/<(.|\n)*?>/g, '');
    },
    getClass(notification){
      // console.log("NOTIFICATION ",notification);
          if(notification.type == 9 || notification.type == 10  ){
                return 'red' ;
          }else if (notification.type == 6){
            if(notification.title == "GOAL!"){
                return 'green2' ;
            }else{
                return 'yellow' ;
            }
          }else{
            return 'blue';
          }
    },
    redirectToSupport(){
      window.open("https://soccersignals.pro/goal-signals-support/");
    },
    redirectToProfile() {
      window.open(
        Constants.SOCCER_SIGNAL_PRO.MAIN_URL +
          Constants.SOCCER_SIGNAL_PRO.PROFILE_URL,
        "_blank"
      );
    },
     refreshing(){
      this.$store.commit("updateCricle", true);
      setTimeout(()=>{
        this.$store.commit("updateCricle", false);
      },500);
      return this.$store.dispatch('getLiveMatches') ;
    },
    closeDropDown(e) {
      if (!this.$el.contains(e.target)) {
        this.showNotifications = false;
      }
    },
    findselectSearch(searchFeild,dtype){
       window.find(searchFeild,false,true,true,false,true);
      const windowSelectionArea = window.getSelection();
      // console.log(this.$mark, " Parent ID ",windowSelectionArea.focusNode.parentNode.id.toString() === 'Table_Body');
      if(windowSelectionArea.focusNode && windowSelectionArea.focusNode.parentNode && windowSelectionArea.focusNode.parentNode.offsetParent && windowSelectionArea.focusNode.parentNode.id.toString() === 'rightMenu'){
        // windowSelectionArea.focusNode.parentNode.offsetParent.scrollIntoView({block:'center'});
        // windowSelectionArea.focusNode.parentNode.offsetParent.scrollIntoView({block:'center'});
        // window.getSelection();
        // window.getSelection();
        // window.find(searchFeild,false,true,true,false,true);
        // window.find(searchFeild,false,true,true,false,true);
        // console.log("THERE");
        if(dtype){
        this.findselectSearch(searchFeild,false);
        }else{
          window.getSelection().empty();
        }
        return;
      }
      if(windowSelectionArea.focusNode && windowSelectionArea.focusNode.parentNode && windowSelectionArea.focusNode.parentNode.offsetParent){
        windowSelectionArea.focusNode.parentNode.offsetParent.scrollIntoView({block:'center'});
      }
    },
    findFullSearch(searchFeild,dtype){
    
      let markInstance = new Mark(document.getElementById("Table_Body"));
      // console.log(markInstance,document.getElementById("Main_Layout"));
      // console.log(this.returnRoute);
       this.$store.commit("updateLiveMatchesOnSearch",searchFeild );





  // var keyword = ["match","m"];

  // Determine selected options
  var options = {separateWordSearch: true,
      diacritics: true,
      debug: false};
  // [].forEach.call(optionInputs, function(opt) {
    
  // });options[opt.value] = opt.checked;

  // Remove previous marked elements and mark
  // the new keyword inside the context
  

//  let abc = [];
    // markInstance.mark(keyword, options);
    

        markInstance.unmark({
    	done: ()=>{
        // console.log("THERERERE");
      markInstance.mark(searchFeild, 
      {separateWordSearch: true,
      diacritics: true,
      debug: false});
    }
  });
      // markInstance.mark("qa", 
      // {separateWordSearch: true,
      // diacritics: true,
      // debug: false});
    
      // // searchFeild = 'fa';
      // window.find(searchFeild,false,true,true,false,true);
      // const windowSelectionArea = window.getSelection();
      // console.log(this.$mark, " Parent ID ",windowSelectionArea.focusNode.parentNode.id.toString() === 'rightMenu');
      // if(windowSelectionArea.focusNode && windowSelectionArea.focusNode.parentNode && windowSelectionArea.focusNode.parentNode.offsetParent && windowSelectionArea.focusNode.parentNode.id.toString() === 'rightMenu'){
      //   // windowSelectionArea.focusNode.parentNode.offsetParent.scrollIntoView({block:'center'});
      //   // windowSelectionArea.focusNode.parentNode.offsetParent.scrollIntoView({block:'center'});
      //   // window.getSelection();
      //   // window.getSelection();
      //   // window.find(searchFeild,false,true,true,false,true);
      //   // window.find(searchFeild,false,true,true,false,true);
      //   if(dtype){
      //   this.findFullSearch(searchFeild,false);
      //   }else{
      //     //window.getSelection().empty();
      //   }
      //   return;
      // }
      // if(windowSelectionArea.focusNode && windowSelectionArea.focusNode.parentNode && windowSelectionArea.focusNode.parentNode.offsetParent){
      //   windowSelectionArea.focusNode.parentNode.offsetParent.scrollIntoView({block:'center'});
      // }
      // //  this.$refs.input.$refs.input.focus();
    },
    onClickPaymentUrl() {
      top.window.location.href =
        Constants.SOCCER_SIGNAL_PRO.MAIN_URL +
        Constants.SOCCER_SIGNAL_PRO.PAYMENT_URL;
    },
    onClickLogout() {
      this.$store.dispatch("doLogout").then(resp => {
        top.window.location.href =
          Constants.SOCCER_SIGNAL_PRO.MAIN_URL +
          Constants.SOCCER_SIGNAL_PRO.LOGOUT_URL;
      });
    },
    onClickSeeMoreNotification() {
      this.$router.push("/scanner/notification");
    },
    onToggleNotifications() {
  
      this.showNotifications = this.showNotifications ? false : true;
      if (this.showNotifications) {
        this.$store.commit("updateNotifications", { shouldClearData: true });
        this.$store.dispatch("markAllNotificationRead");
        this.$store.dispatch("getNotifications");
      }
    },
    onClickNotification(notification) {
      this.showNotifications = false;
      if (notification.status == Constants.NOTIFICATION.STATUS.UNREAD) {
        this.$io.emit("markNotificationAsRead", notification._id);
      }
      if (notification.filter_id) {
        this.$router.push("/scanner/live");
        this.$store.commit("updateSelectedFilter", notification.filter_id);
      } else if (notification.match_id) {
        this.$store.commit("updateSelectedMatch", notification.match_id);
      }
    },
    onClickMarkAllAsRead() {
      this.$store.dispatch("markAllNotificationAsRead");
    },
    parseDate(time) {
      return moment(time).format("DD MMMM YYYY");
    },
    parseTime(time) {
      return moment(time).format("hh:mm a");
    }
  },
  computed: {
   
    returnNotifications() {
      return this.$store.getters.returnNotifications;
    },
    returnRoute() {
      return this.$router.app._route.path;
    },
    returnUnreadNotificationCount() {
      // console.log("Length:" + this.$store.getters.returnNotifications.length);
      return this.$store.getters.returnNotifications.filter(
        notification =>
          notification.status == Constants.NOTIFICATION.STATUS.UNREAD
      ).length;
    },
    retrunLoadingState(){
      // console.log("Compute is working ",this.$store.getters.retrunUpdateIsCircleLoading);
     return this.$store.getters.retrunUpdateIsCircleLoading;
    },
   
  },
  mounted() {
    this.$store.commit("updateNotifications", { shouldClearData: true });
    this.$store.dispatch("getNotifications");
    // console.log("WWW123123WWWW", );
  },
  created() {
    window.addEventListener("click", this.closeDropDown);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.closeDropDown);
  }
};
</script>

<style>
div#signalSelector-account{
  position: relative;
      width: 26px;
    height: 26px;
}

div#signalOptionsWrapper22 {
    cursor: pointer;
    overflow: auto;
    width: -webkit-fill-available;
    font-size: 11px;
    background: whitesmoke;
    font-family: "proxima_nova_altbold";
    cursor: pointer;
    max-height: 230px;
    border: 2px solid;
    border-top: none;
    z-index: 99999;
    position: absolute;
    font-size: 11px;
    background: #000;
    /* font-family: "proxima_nova_altbold"; */
    /* text-transform: uppercase; */
    width: auto;
    left: -14px;
    top: 30px;
}

div#signalOptionsWrapper22 span.signalName {
    display: grid;
    width: 100%;
    padding: 10px;
    padding-left: 10px;
}
div#signalOptionsWrapper22 span.signalName p {
    margin: 0px;
}
div#signalOptionsWrapper22 span.signalName .payment-text a {
    text-decoration: none;
    color: #fff;
    font-size: 7px;
}

.payment-text {
  min-width: 150px;
}
.loading-Cricle{
transform: skewY(50deg) !important;
}
.payment-text a {
  text-decoration: none;
  color: #fff;
}
.payment-text a:hover {
  color: #1fd466 !important;
}
.pointer {
  cursor: pointer;
}
div#Brand {
    background: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 8px;
}
.menu-item-wrapper {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
}
span.new-icons {
    width: 25px;
    height: 25px;
    overflow: hidden;
}
span.new-icons img {
    max-width: 100%;
}
#Menu {
  display: grid;
  /* justify-content: right; */
  /* justify-items: right; */
  justify-self: right;
  padding-right: 30px;
}
#rightMenu {
  display: grid;
  grid-auto-flow: column;
  color: white;
  grid-column-gap: 25px;
  width: 250px;
  justify-content: right;

  font-size: 12px;
  text-transform: uppercase;
  font-family: "proxima_nova_altbold";
}

#Navbar {
  display: grid;
  height: 55px;
  grid-template-columns: 250px 1fr 450px;
  z-index: 9999;
  background-color: #252525;
  -ms-flex-line-pack: center;
  align-items: center;
  min-width: 100vw;
  justify-items: center;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ff0909+0,c40606+100 */
  background: rgb(255,9,9); /* Old browsers */
  background: -moz-linear-gradient(top,  rgba(255,9,9,1) 0%, rgba(196,6,6,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(255,9,9,1) 0%,rgba(196,6,6,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(255,9,9,1) 0%,rgba(196,6,6,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0909', endColorstr='#c40606',GradientType=0 ); /* IE6-9 */

}

div#Brand > img {
  width: 190px;
}

/* Facebook Notification */

.fb-notification {
  position: relative;
}

#notificationContainer {
  background-color: #fff;
  border: 1px solid rgba(100, 100, 100, 0.4);
  -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  overflow: visible;
  position: absolute;
  top: 30px;
  margin-left: 0px;
  width: 400px;
  z-index: -1;
  left: -235px;
}

/* #notificationContainer:before {
			content: '';
			display: block;
			position: absolute;
			width: 0;
			height: 0;
			color: transparent;
			border: 10px solid black;
			border-color: transparent transparent white;
			margin-top: -20px;
			margin-left: 188px;
			} */

#notificationTitle {
  font-weight: bold;
  padding: 8px;
  font-size: 13px;
  background-color: #000;
  /* position: fixed; */
  z-index: 1000;
  /* width: 74px; */
  border-bottom: 1px solid #dddddd;
}

#notificationTitle a {
  float: right;
  color: #fff;
}
#notificationTitle button {
  float: right;
  color: #fff;
  background: transparent;
  border: none;
}

#notificationsBody {
  padding: 0px 0px 0px 0px !important;
  min-height: 300px;
}

#notificationFooter {
  background-color: #e9eaed;
  text-align: center;
  font-weight: bold;
  padding: 8px;
  font-size: 12px;
  border-top: 1px solid #dddddd;
}
#notificationFooter button {
  background-color: transparent;
  text-transform: uppercase;
  border: none;
  color: #337ab7;
}

#notification_count {
  padding: 3px 7px 3px 7px;
  background: #cc0000;
  color: #ffffff;
  font-weight: bold;
  margin-left: 77px;
  border-radius: 9px;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  position: absolute;
  margin-top: -11px;
  font-size: 11px;
}
.searchdiv {
    position: relative;
}
.searchdiv svg {
    position: absolute;
    right: 5px;
    top: 5px;
}
button.next-btn {
    background: #4A4A4A;
    font-weight: 400;
    border: 1px solid #6F6F6F;
    color: #fff;
    text-transform: uppercase;
}
input#search {
    padding: 3px 10px;
    background: #4A4A4A;
    font-weight: 400;
    border: 1px solid #6F6F6F;
    color: #fff;
}
span.bell-icon {
  position: relative;
  padding: 0px 0px;
  text-overflow: unset;
    overflow: visible;
}
.notify-body.unread {
  background: #eef1fa;
}

span.bell-icon i {
  position: absolute;
  font-size: 8px;
  font-weight: 100;
  font-style: normal;
  top: 0px;
  right: 0px;
  background: #ffd41e;
  color: #000;
  border-radius: 100%;
  padding: 2px;
  width: 15px;
  height: 15px;
  text-align: center;
}
.not-body-2 .green2{
  color: #488948 !important;
}
.not-body-2 .red{
  color : #F89406 !important;
}
.not-body-2 .yellow{
  color : #F89406 !important;
}
.not-body-2 h5 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  margin: 0;
}

.not-body-2 p {
  font-weight: 400;
  margin-bottom: 0;
  font-size: 13px;
  text-transform: capitalize;
  font-family: "Poppins", sans-serif;
  white-space: pre-line;
}

.not-body-2 small {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

.notify-body {
  border-bottom: 1px solid #ddd;
  /* position: relative; */
  /* border-top: 1px solid #ddd; */
  padding-bottom: 15px;
  display: flex;
  padding-top: 15px;
}

.not-body-1 {
  text-align: center;
}
.not-body-1 h5 {
  font-family: "Poppins", sans-serif;
  color: #17a2b8;
  font-weight: bold;
  margin: 0;
}

.not-body-1 img {
  width: 30px;
  margin-top: 10px;
}

.fb-notification .fa-bell {
  margin-left: 14px;
}
span.bell-icon {
  position: relative;
}
.notify-body.unread {
  background: #eef1fa;
}

span.bell-icon i {
  position: absolute;
  font-size: 8px;
  font-weight: 100;
  font-style: normal;
  top: 0px;
  right: 0px;
  background: #ffd41e;
  color: #000;
  border-radius: 100%;
  padding: 2px;
  width: 15px;
  height: 15px;
  text-align: center;
}


.notification-bell{
      position: absolute;
    top: -2px;
    color: red;
    right: 0px;
}
.Bell-badge-position{
  color: red;
    position: absolute;
    top: -3px;
    right: 15px;
}
</style>
