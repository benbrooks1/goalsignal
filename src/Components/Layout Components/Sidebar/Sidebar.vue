<template>
  <div class="sidebar">
    <div class="sidebaroverlay"></div>
    <!--<profile-container/>-->
    <div class="sidebar-item-go">
      <ul>
        <!-- unnecessary <li :class="{
            activeli: returnRoute === '/scanner/live' && !returnSelectedFilter
          }"
          v-if="filter.id !== '986a7f74604ea7fcca620cd30ff3aa77'"
          @click="goLive()"> Live  </li> -->
          <span v-for="(filter, index) in returnFilter" :key="filter.name" >
        <li   class="noselect" v-if="filter.id !== '986a7f74604ea7fcca620cd30ff3aa77'"  @click="updateSelectedFilter(index)"
          :key="filter.name" :class="{
            activeItem2:
              returnFilter[index].name ===
                returnSelectedFilter.name &&
              $router.app._route.path == '/scanner/live'
          }" >{{mainHeading(filter.name)}} <span>{{subHeading(filter.name)}}  <span style="display: inline-flex;" v-if ="index == 0"> 
              <span style="font-size: 10px;margin-left: 9px;" v-if="!returnUser.filterGoalHalfMuteStatus" @click="changeMuteStatus($event,index)"> <font-awesome-icon
             size="2x"
            class="pointer"
            icon="volume-up"
          /> </span>
              <span style="font-size: 10px;margin-left: 9px;" v-else @click="changeMuteStatus($event,index)"><font-awesome-icon
             size="2x"
            class="pointer"
            icon="volume-mute"
          /> </span>
          </span>
          <span v-else style="display: inline-flex;">
              <span style="font-size: 10px;margin-left: 9px;" v-if="!returnUser.filterGoalSecondMuteStatus" @click="changeMuteStatus($event,index)">  <font-awesome-icon
             size="2x"
            class="pointer"
            icon="volume-up"
          /> </span>
              <span v-else style="font-size: 10px;margin-left: 9px;" @click="changeMuteStatus($event,index)"><font-awesome-icon
             size="2x"
            class="pointer"
            icon="volume-mute"
          /></span>
          </span> </span>
         

          </li>
          </span>
          <li class="noselect" :class="{
            activeItem2: returnRoute === '/scanner/shortlist'
          }"
          @click="$router.push('/scanner/shortlist')"> ShortList <span>({{ returnShortlistCount }})</span>  </li>
          <!-- <button
          :class="{ activeItem: returnRoute === '/scanner/shortlist' }"
          @click="$router.push('/scanner/shortlist')"
        >
          Shortlist
          
        </button> -->
        <!-- <li>Late Goal Alerts <span>(1st Half)</span></li> -->
      </ul>
    </div>
    <!-- unnecessary <div class="sidebar-item" style="display:none;">
      <div class="sidebar-item-header">
        <div class="catHeadGrid">
          <h4 class="sidebar-item-heading">Scanner</h4>
        </div>
      </div>
      <div class="Top-Menu">
        <button
          :class="{ activeItem: returnRoute === '/scanner/all' }"
          @click="$router.push('/scanner/all')"
        >All ({{ allMatchesCount }})</button>
        <button
          :class="{
            activeItem: returnRoute === '/scanner/live' && !returnSelectedFilter
          }"
          @click="goLive()"
        >
          Live
          <span>({{ liveMatchesCount }})</span>
        </button>
        
        <button
          :class="{ activeItem: returnRoute === '/scanner/upcoming' }"
          @click="$router.push('/scanner/upcoming')"
        >
          Upcoming
          <span>({{ returnUpcomingCount }})</span>
        </button>
        <button
          :class="{ activeItem: returnRoute === '/scanner/finished' }"
          @click="$router.push('/scanner/finished')"
        >Finished ({{ finishedMatchesCount }})</button>
      </div>
    </div> 
    <div class="sidebar-item filter-menu" >
      <div class="sidebar-item-header" v-if="addFilterAdmin">
        <div class="catHeadGrid">
          <h4 class="sidebar-item-heading">
            <font-awesome-icon class="pointer" icon="filter" />
            <span>My Filters</span>
          </h4>

          <button v-if="addFilterAdmin" @click.stop="$modal.show('Create_Filter')" class="addButton">
            <font-awesome-icon icon="plus" v-tooltip="'Create New Filter'" />
          </button>

          <div class="iconContainer">
            <font-awesome-icon
              @click="toggleShowFilters"
              v-if="!showFilters"
              style="color:black;"
              class="menuCaret"
              icon="caret-up"
            />
            <font-awesome-icon
              @click="toggleShowFilters"
              style="color:black;"
              v-if="showFilters"
              icon="caret-down"
              class="menuCaret"
            />
          </div>
        </div>
      </div>
      <div class="Top-Menu" v-if="addFilterAdmin">
        <button
          v-for="(filter, index) in returnFilter"
          class="sidebarButton"
          :class="{
            activeItem2:
              returnFilter[index].name ===
                returnSelectedFilter.name &&
              $router.app._route.path == '/scanner/live'
          }"
          @click="updateSelectedFilter(index)"
          :key="filter.name"
        >
          <div id="filterBox" class="buttonContent2">
            <span v-if="filter.new_matches_count" class="notification-count">
              {{
              filter.new_matches_count
              }}
            </span>
            <span v-else></span>
            <span>{{ filter.name }}</span>
            <span>
              <font-awesome-icon
                class="deleteSidebar"
                @click.stop="editFilter(filter)"
                icon="edit"
              />
            </span>
            <span>
              <font-awesome-icon
                class="deleteSidebar"
                @click.stop="duplicateFilter(filter)"
                icon="copy"
              />
            </span>
            <span>
              <font-awesome-icon
                class="deleteSidebar"
                @click.stop="deleteFilter(index)"
                icon="trash"
              />
            </span>
          </div>
        </button>
      </div>
    </div> -->
    <!-- <div class="sidebar-item">
      <div class="sidebar-item-header">
        <div class="catHeadGrid">
          <h4 class="sidebar-item-heading">
            <font-awesome-icon class="pointer" icon="flag-checkered" />
            <span>My Signals</span>
          </h4>
          <button @click.stop="$modal.show('Create_Signal')" class="addButton">
            <font-awesome-icon icon="plus" />
          </button>
          <div class="iconContainer">
            <font-awesome-icon
              @click="toggleShowSignals"
              v-if="!showSignals"
              style="color:black;"
              class="menuCaret"
              icon="caret-up"
            />
            <font-awesome-icon
              @click="toggleShowSignals"
              style="color:black;"
              v-if="showSignals"
              icon="caret-down"
              class="menuCaret"
            />
          </div>
        </div>
      </div>
      <div class="Top-Menu">
        <button
          v-for="(signal, index) in returnUser.appData.signals"
          class="sidebarButton"
          :class="{
            activeItem:
              returnUser.appData.signals[index].name ===
                returnSelectedSignal.name && returnRoute == '/signals'
          }"
          @click="updateSelectedSignal(index)"
          :key="signal.name"
        >
          <div class="buttonContent">
            <span>{{ signal.name }}</span>
            <span>
              <font-awesome-icon
                class="deleteSidebar"
                @click.stop="$modal.show('Edit_Signal')"
                icon="edit"
              />
            </span>
            <span>
              <font-awesome-icon
                class="deleteSidebar"
                @click.stop="deleteSignal(index)"
                icon="trash"
              />
            </span>
          </div>
        </button>
      </div>
    </div>-->

    <!-- <div class="sidebar-item">
      <div class="sidebar-item-header">
        <div class="catHeadGrid">
          <h4 class="sidebar-item-heading">My Leagues</h4>
          <button @click.stop="$modal.show('Add_League')" class="addButton">
            <font-awesome-icon icon="plus" />
          </button>
          <div class="iconContainer">
            <font-awesome-icon
              @click="toggleShowLeagues"
              v-if="!showLeagues"
              style="color:black;"
              class="menuCaret"
              icon="caret-up"
            />
            <font-awesome-icon
              @click="toggleShowLeagues"
              style="color:black;"
              v-if="showLeagues"
              icon="caret-down"
              class="menuCaret"
            />
          </div>
        </div>
      </div>
      <div class="Top-Menu" id="leaguesMenu">
        <template v-for="country in returnMyLeagues">
          <button class="sidebarButton" v-for="league in country.leagues" v-bind:key="league.id">
            <div class="buttonContent2">
              <span class="league-name">
                <img class="country-logo" :src="league.countryLogoPath" />
                {{ league.name }}
              </span>
         
              <span>
                <font-awesome-icon
                  class="pointer"
                  icon="thumbtack"
                  @click="removeMyLeague(league)"
                />
              </span>
            </div>
          </button>
        </template>
      </div>
    </div> -->

    <!-- <hr id="sidebarHr"> -->
    <!-- <router-link tag="div" to="/signals" class="sidebar-item">
            <div class="sidebar-item-header">
                <div class="catHeadGrid">
                    <h4 class="sidebar-item-heading">My Signals</h4>
                    <button @click.stop="$modal.show('Create_Signal')" class="addButton">
                        <font-awesome-icon icon="plus" />
                    </button>
                    <div class="iconContainer">
                        <font-awesome-icon @click="toggleShowSignals" v-if="!showSignals" style="color:black;" class="menuCaret" icon="caret-up" />
                        <font-awesome-icon @click="toggleShowSignals" style="color:black;" v-if="showSignals" icon="caret-down" class="menuCaret" />
                    </div>
                </div>
            </div>
            <slide-up-down :activeItem="showSignals" :duration="1000" class="subMenu">

                <div v-for="(signal, index) in returnUser.appData.signals" :class="{'activeItem-sidebar-nested':  returnUser.appData.signals[index].name === returnSelectedSignal.name}" @click="updateSelectedSignal(index)" class="sidebar-item-header-nested">
                    <div class="catHeadGrid2">
                        <h4 class="sidebar-item-heading">{{signal.name}}</h4>
                        <div class="iconContainer">

                            <font-awesome-icon class="deleteSidebar" icon="edit" />
                        </div>

                        <div class="iconContainer">

                            <font-awesome-icon class="deleteSidebar" @click="deleteSignal(index)" icon="trash" />
                        </div>

                    </div>
                </div>
            </slide-up-down>

    </router-link>-->
    <!-- <div class="sidebar-item ">
            <div class="sidebar-item-header green">
                <div class="catHeadGrid filterHeading">
                    <h4 class="sidebar-item-heading white">My Filters</h4>
                    <font-awesome-icon class="pointer resetFilters" @click="clearFilter" :class="{'red': this.returnSelectedFilter}" icon="times" />
                    <button @click="$modal.show('Create_Filter')" class="addButton">
                        <font-awesome-icon icon="plus" />
                    </button>

                    <div class="iconContainer">

                        <font-awesome-icon @click="toggleShowFilters" v-if="!showFilters" style="color:black;" class="menuCaret" icon="caret-up" />
                        <font-awesome-icon @click="toggleShowFilters" style="color:black;" v-if="showFilters" icon="caret-down" class="menuCaret" />

                    </div>

                </div>
            </div>
            <slide-up-down :activeItem="showFilters" :duration="1000" class="subMenu">

                <div v-for="(filter, index) in returnUser.appData.filters" :class="{'activeItem-sidebar-nested':returnUser.appData.filters[index].name === returnSelectedFilter.name}" @click="updateSelectedFilter(index)" class="sidebar-item-header-nested">
                    <div class="catHeadGrid2">
                        <h4 class="sidebar-item-heading">{{filter.name}}</h4>
                        <div class="iconContainer">

                            <font-awesome-icon class="deleteSidebar" icon="edit" />
                        </div>

                        <div class="iconContainer">

                            <font-awesome-icon class="deleteSidebar" @click="deleteFilter(index)" icon="trash" />
                        </div>
                    </div>
                </div>

            </slide-up-down>
    </div>-->
    <!-- <router-link tag="div" to="/tables/leaguelist" class="sidebar-item">
        <div class="sidebar-item-header">
          <div class="catHeadGrid">
            <h4 class="sidebar-item-heading">My Leagues</h4>
            <button @click="$modal.show('Create_Signal')" class="addButton">
              <font-awesome-icon icon="plus"/>
            </button>
          </div>
        </div>
      </router-link>
    -->
  </div>
</template>

<script>
const profileContainer = () => import("./Components/Profile_Container");
export default {
  data() {
    return {
      widthFix: false,
      showSignals: true,
      showFilters: true,
      showLeagues: true
    };
  },
  components: {
    profileContainer
  },
  watch: {},
  computed: {
     returnUser() {
      return this.$store.getters.returnUser;
    },
    addFilterAdmin(){
     const user = this.$store.getters.returnUser;
      // console.log("USER",user);
    //  let admin = false;
     if(user.contactInformation.email === "abc@gmail.com"){
       return true;

     }else{
      return false;
     }
    },
    returnUpcomingCount() {
      let count = 0;
      if (
        typeof this.$store.getters.returnUpcomingMatches != null ||
        undefined
      ) {
        this.$store.getters.returnUpcomingMatches.forEach(item => {
          count = count + item.matches.length;
        });
        return count;
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
    },
    returnRoute() {
      return this.$router.app._route.path;
    },
    returnScannerSelectedView() {
      return this.$store.getters.returnScannerSelectedView;
    },
    allMatchesCount() {
      return this.$store.getters.returnAllMatchesCount;
      // var totalMatches = 0;
      // this.$store.getters.returnAllMatches.forEach(match => {
      //   totalMatches = totalMatches + match.matches.length;
      // });
      // return totalMatches;
    },
    liveMatchesCount() {
      return this.$store.getters.returnLiveMatchesCount;
      // return this.$store.getters.returnLiveMatches.length;
      // return this.$store.state.$Api.beforeCount;
    },
    finishedMatchesCount() {
      return this.$store.getters.returnFinishedMatchesCount;
      // var totalMatches = 0;
      // this.$store.getters.returnFinishedMatches.forEach(match => {
      //   totalMatches = totalMatches + match.matches.length;
      // });
      // return totalMatches;
    },
    
    returnFilter() {
      // console.log("FILTER ARRAY", this.$store.getters.returnFilter)
      return this.$store.getters.returnFilter;
    },
    returnMyLeagues() {
      return this.$store.getters.returnMyLeagues;
    },
    returnSelectedSignal() {
      function isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) return false;
        }
        return true;
      }
      if (isEmpty(this.$store.getters.returnSelectedSignal)) {
        return false;
      } else {
        return this.$store.getters.returnSelectedSignal;
      }
      // return this.$store.getters.returnSelectedSignal;
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
  methods: {
    changeMuteStatus(e,index){
      e.stopPropagation();
      // console.log(index,this.returnUser);
      if(index == 1){
      this.$store.state.$Auth.user.filterGoalSecondMuteStatus = !this.$store.state.$Auth.user.filterGoalSecondMuteStatus;
      this.$io.emit("updateSettings", {
        update:{filterGoalSecondMuteStatus: this.$store.state.$Auth.user.filterGoalSecondMuteStatus},id : this.$store.state.$Auth.user._id
      });
      }else if (index == 0){
        this.$store.state.$Auth.user.filterGoalHalfMuteStatus = !this.$store.state.$Auth.user.filterGoalHalfMuteStatus;
        this.$io.emit("updateSettings", {
        update:{filterGoalHalfMuteStatus: this.$store.state.$Auth.user.filterGoalHalfMuteStatus},id : this.$store.state.$Auth.user._id
      });
      }

    },
    mainHeading(value){
      return value.split("(")[0];
    },
    subHeading(value){
      
      return `(${value.split("(")[1]}`;
    },
    removeMyLeague(league) {
      this.$store.commit("removeMyLeague", league);
      this.$io.emit(
        "removeMyLeague",
        league,
        this.$store.getters.returnUser._id
      );
    },
    editFilter(filter) {
      this.$store.state.$Ui.filterInEdit = filter;
      this.$modal.show("Edit_Filter");
    },
    duplicateFilter(filter) {
      let name = "";
      filter.name = filter.name + "_copy";
      var payload = {
        filter: filter,
        _id: this.returnUser._id
      };
      this.$io.emit("addFilter", payload);
    },
    goLive() {
      this.clearFilter();
      this.$router.push("/scanner/live");
    },
    newTab() {
      let routeData = this.$router.resolve({
        name: "fullscreenScanner"
      });
      window.open(routeData.href, "_blank");
    },
    hideMenu() {
      if (this.returnShortMenu) {
        this.$store.commit("updateShortMenu", false);
      } else if (this.returnShortMenu == false) {
        this.$store.commit("updateShortMenu", true);
      }
    },
    toggleShowSignals() {
      this.showSignals = !this.showSignals;
    },
    toggleShowLeagues() {
      this.showLeagues = !this.showLeagues;
    },
    toggleShowFilters() {
      this.showFilters = !this.showFilters;
    },
    updateSelectedSignal(index) {
      this.$router.push("/signals");
      switch (index) {
        case false:
          this.$store.commit("updateSelectedSignal", {});
          break;
        default:
          this.$store.commit(
            "updateSelectedSignal",
            this.returnUser.appData.signals[index]
          );
      }
      // this.$store.commit(
      //   "updateSelectedSignal",
      //   this.returnUser.appData.signals[index]
      // );
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
    deleteSignal(indexToDelete) {
      this.$swal({
        title: "Are you sure?",
        text: "You will not be able to recover this signal!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it"
      }).then(result => {
        if (result.value) {
          var payload = {
            _id: this.returnUser._id,
            toDelete: this.returnUser.appData.signals[indexToDelete].name
          };
          this.$io.emit("removeSignal", payload);
        } else if (result.dismiss) {
        }
      });
    },

    clearFilter() {
      this.$store.commit("updateSelectedFilter", {});
    },
    deleteFilter(indexToDelete) {
      // console.log(indexToDelete);
      this.$swal({
        title: "Are you sure?",
        text: "You will not be able to recover this filter!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it"
      }).then(result => {
        if (result.value) {
          var payload = {
            _id: this.returnUser._id,
            toDelete: this.returnUser.appData.filters[indexToDelete].name
          };
          this.$io.emit("removeFilter", payload);
        } else if (result.dismiss) {
        }
      });
    }
  }
};
</script>

<style>
.league-name {
  text-align: left;
  margin-bottom: 0;
  line-height: 12px;
  padding-top: 0px;
  width: 190px;
}
.country-logo {
  width: 20px;
  margin-right: 5px;
}
.clearButtonInactive {
  background: #d43c057a;
}

.clearButtonActive {
  background: #d43c05;
}

#clearButton {
  padding: 1px;
  margin: 1px;
  font-size: 1rem;
  width: 70%;
  color: white;
  text-transform: uppercase;
  font-family: "proxima_nova_altbold";
  /* font-family: fantasy; */
}

span {
  text-overflow: ellipsis;
  overflow: hidden;
      font-family: 'Poppins', sans-serif;
}
#filterBox {
  grid-template-columns: 0.14fr 1fr 0.2fr 0.2fr 0.2fr;
  /* grid-template-columns: 0.12fr 1fr 0.2fr 0.2fr; */
}
.buttonContent {
  display: grid;
  grid-template-columns: 1fr 0.2fr 0.2fr 0.2fr;
  grid-auto-flow: column;
}
.buttonContent2 .notification-count {
  background: red;
  border-radius: 50%;
  color: white;
  height: 20px;
  width: 20px;
}
#leaguesMenu .buttonContent2 {
  display: flex;
}
.buttonContent2 {
  /* display: flex; */
  display: grid;
  grid-template-columns: 1fr 0.2fr 0.2fr 0.2fr;
  grid-auto-flow: column;
}

.white {
  color: white;
}

.filterHeading {
  grid-template-columns: 4fr repeat(auto-fill, 25px) !important;
  align-items: center;
}

#sidebarHr {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 0;
  border-top: 1px solid #676869;
}

.fs-select-out label {
  font-family: "proxima_nova_altbold";
  font-size: 13px;
  text-transform: uppercase;

  text-align: center;
  /* float: left; */
  padding-top: 5px;
  margin: 0;
}

.green {
  background-color: rgb(41, 212, 102) !important;
  color: white;
}

.iconContainer {
  margin-left: auto;
}

.smallMenuImage {
  max-width: 65px;
}

.widthFix {
  width: 90px !important;
}

#notifyWrap {
  position: relative;

  cursor: pointer;
}

*.icon-blue {
  color: #0088cc;
}
span.filtered {
  background: #e09409;
  padding: 2px 6px;
  border-left: 3px solid #8e4801;
  position: absolute;
  /* margin-left: 10px; */
  right: 5%;
}
*.icon-grey {
  color: grey;
}

.num {
  background-color: red;
  border-radius: 10px;
  font-size: 0.7rem;
  padding: 2px 5px;
  text-align: center;

  position: absolute;
  top: 0;
}

.smallHead {
}

.pl {
  padding-left: 10px;
}
.sidebar-item-go ul {
    list-style: none;
    padding: 0px;

}
.sidebar-item-go ul li{
    color: #ffffff;
    border-bottom:1px solid #d60000;
    padding: 40px 30px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 38px;
}
.sidebar-item-go ul li span {
    display: block;
    text-align: right;
    font-size: 18px;
    font-weight: 400;
}
.sidebar-item-go ul li.activeli{
    background: rgb(238,6,6);
    background: -moz-linear-gradient(left, rgba(238,6,6,1) 0%, rgba(154,4,5,1) 100%);
    background: -webkit-linear-gradient(left, rgba(238,6,6,1) 0%,rgba(154,4,5,1) 100%);
    background: linear-gradient(to right, rgba(238,6,6,1) 0%,rgba(154,4,5,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ee0606', endColorstr='#9a0405',GradientType=1 );

      box-shadow: 2px 7px 4px 0px #d7090b;
}
.sidebar-item-go ul li:last-child{
  border-bottom:none;
  text-align: center;
  padding: 18px 8px;
}
.sidebar-item {
  min-height: 200px;
  display: grid;
  grid-template-areas: "item-header" "item-content";
  grid-template-rows: 48px 1fr;
}

.sidebar-item-header {
  background-color: #ffd41e;
  color: #000;

  grid-area: item-header;
}

.sidebar-item-header > h4 {
  padding-left: 10px;
}

.sidebar-item-heading {
  font-family: "proxima_nova_altbold";
  font-size: 15px;
}
.sidebar-item-heading span {
  margin-left: 5px;
}
.sidebar-item-heading svg {
  font-size: 12px;
}

.sidebar-item-content {
  grid-area: item-content;
  background: #e9e9e9;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: grid;
  grid-template-columns: 1fr;
}

.svg-inline--fa.fa-caret-down.fa-w-10 {
  margin-left: 5px;
}

.svg-inline--fa.fa-caret-up.fa-w-10 {
  margin-left: 5px;
}

.group-dropdown {
  cursor: pointer;
  border-bottom: 1px solid black;
  padding: 3px 10px;
  border-width: 200%;
  padding-bottom: 10px;
}

.group-content {
  padding: 10px 10px;

  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1rem;
}

.group-content:last-of-type {
}

.noBorder {
  border-bottom: none !important;
}

#group-item-seperate {
  border-top: 1px solid black !important;
  color: black;
  background-color: black;
  margin: 0px;
  margin-bottom: 10px;
  width: 10%;
  margin-left: 10px;
}

.content-value {
  margin-top: auto;
  margin-bottom: 5px;
}

svg.svg-inline--fa.fa-trash-alt.fa-w-14 {
  margin-right: 6px;
  color: rgb(170, 5, 5);
}

#dropdown-wrap > svg,
#dropdown-wrap > h4 {
  display: inline-block;
}

.sidebar-item.filter-menu {
  min-height: 465px;
}
/* .router-link-activeItem > .sidebar-item-header{
  background-color: #b9a02d!important;

} */
</style>
