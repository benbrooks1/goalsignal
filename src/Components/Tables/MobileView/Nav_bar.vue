<template>
<div>
      <div class="navbar-top">
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
            <li  @click="redirectToProfile()">Profile</li>
            <li @click="$modal.show('Settings')">Setting</li>
            <!-- <li>Notification</li> -->
            <li @click="redirectToSupport()">Help</li>
            <li @click="onClickLogout()">Log out</li>
          </ul>
        </div>
        <ul class="goaltabs">
          <li :class="{
            active: returnRoute === '/scanner/shortlist'
          }"
          @click="$router.push('/scanner/shortlist')"> ShortList <span>({{ returnShortlistCount }})</span></li>
            <span v-for="(filter, index) in returnFilter"    @click="updateSelectedFilter(index)" >
            <li style="border-right: 1px solid #a4a4a4" v-if="filter.id !== '986a7f74604ea7fcca620cd30ff3aa77'"
          :key="filter.name" :class="{
            active:
              returnFilter[index].name ===
                returnSelectedFilter.name &&
              $router.app._route.path == '/scanner/live'
          }" >{{mainHeading(filter.name)}} <span>{{subHeading(filter.name)}}</span></li></span>
        </ul>
        </div>
</template>

<script>
import router from "./../../../Router/router";
import Constants from "../../../Constants";
export default {
    data() {
    return {
      selected: 1,
      showTopMenu:false,
      check: false,
      
    };
  },
    computed: {
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
    },
    returnShortlistCount() {
      var shortlistMatchCount = 0;
      this.$store.getters.returnShortlistData.forEach(league => {
        league.matches.forEach(match => {
          shortlistMatchCount++;
        });
      });
      return shortlistMatchCount;
    }
    },
     methods: {
         redirectToSupport(){
      window.location.href = "https://soccersignals.pro/support"
    },
    onToggleNotifications() {
      this.showNotifications = this.showNotifications ? false : true;
      if (this.showNotifications) {
        this.$store.commit("updateNotifications", { shouldClearData: true });
        this.$store.dispatch("getNotifications");
      }
    },
         refreshing(){
      this.$store.commit("updateCricle", true);
      setTimeout(()=>{
        this.$store.commit("updateCricle", false);
      },500);
      return this.$store.dispatch('getLiveMatches') ;
    },
    redirectToProfile() {
      window.open(
        Constants.SOCCER_SIGNAL_PRO.MAIN_URL +
          Constants.SOCCER_SIGNAL_PRO.PROFILE_URL,
        "_blank"
      );
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
    }
     }
}
</script>
<style >
.mobileviewmenu {
    width: 100%;
}
.navbar-top {
    display: grid;
    justify-items: center;
    grid-auto-flow: column;
    grid-template-columns: 15% 70% 15%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    padding: 15px 0px;
}
.navbar-top .refereshicon img {
    max-width: 70%;
}
.Mobileviewhamburgermenu {
    background: #980000;
    width: 60%;
    top: 64px;
    z-index: 2;
    right: 0px;
    background-image: url(/img/sidebarlogo.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
    position: fixed;
    height: 100vh;
}
.Mobileviewhamburgermenu ul {
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
        list-style: none;
}
.Mobileviewhamburgermenu ul li {
    color: #fff;
    padding: 20px 20px 0px 20px;
}
</style>