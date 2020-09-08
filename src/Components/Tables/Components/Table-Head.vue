<template>
  <div class="table_head mobileMatchFlow" id="big_table_head">
    <!-- <div v-if="tableMode !== 'upcomingMatches'">
      <h4 style="white-space: nowrap; '" class="text custBadge">
        <font-awesome-icon
          size="lg"
          v-if="returnRoute === '/scanner/live'"
          class="pointer addIcon"
          @click="showModal()"
          icon="plus"
        >
          <span class="notify-bubble">1</span>
        </font-awesome-icon>
        <font-awesome-icon
          size="lg"
          v-if="returnRoute === '/scanner/shortlist'"
          class="pointer addIcon"
          @click="removeFromShortlist()"
          icon="trash"
        >
          <span class="notify-bubble">1</span>
        </font-awesome-icon>
      </h4>
    </div> -->
    <div v-if="tableMode !== 'upcomingMatches'" id="signalIcon" class="signal-icon">
      <!-- <img src="./../../../Assets/Images/Icons/Signal-Icon.png">-->
      <h4 class="text">Alerts</h4>
    </div>
    <div
      id="Time"
      :class="{
        widthMax: tableMode == 'upcomingMatches',
        largest: tableMode == 'upcomingMatches'
      }"
    >
      <h4
        v-if="tableMode !== 'upcomingMatches'"
        :class="{
          'text-center': tableMode == 'upcomingMatches',
          noRotate: tableMode == 'upcomingMatches'
        }"
        class="text"
      >Time</h4>
      <span v-else>Starts At</span>
    </div>
    
    <div style id="SpOdds" class="heading-data">
      <span id="liveOddsSplit" v-if="tableMode !== 'upcomingMatches'">
        <span id="oddsTitle">ODDS</span>
        <span id="oddsLive">SP</span>
        <span id="oddsSp">LIVE</span>
      </span>
      <span v-else>SP Odds</span>
    </div>
    <div
      id="Match"
      :class="{ widthMax: tableMode == 'upcomingMatches' }"
      class="heading-data largest-box"
    >Match</div>

    <div>
      <h4 class="text" style="text-align:center">Score</h4>
    </div>

    <div>
      <h4 class="text">Prediction Strength</h4>
    </div>
    <div>
      <h4 class="text">Possession</h4>
    </div>
    <div>
      <h4 class="text">Goal Attempts</h4>
    </div>
    <div>
      <h4 class="text">Shots on Target</h4>
    </div>
    <div>
      <h4 class="text">Dangerous Attacks</h4>
    </div>
    <div>
      <h4 class="text">Corners</h4>
    </div>
    <!-- <div>
      <h4 class="text">Yellow Cards</h4>
    </div> -->
    <!-- <div id="th1" class="heading-data sererate-section">
      <h4 class="text">POSSESSION</h4>
    </div>
    <div id="th1" class="heading-data sererate-section">
      <h4 class="text">Supremacy</h4>
    </div>-->
    <div id="th2" class="th2 heading-data sererate-section">
      <h4 class="text">
        Dangerous
        <span class="break text">attacks</span>
      </h4>
    </div>
    <div id="th3" class="th3 heading-data sererate-section">
      <h4 class="text">Goal Attempts</h4>
    </div>
    <div id="th4" class="th4 heading-data sererate-section">
      <h4 class="text">Corners</h4>
    </div>
    <div id="th5" class="th5 heading-data sererate-section">
      <h4 class="text">Goal Scored</h4>
    </div>
    <!-- <div id="th5" class="press-gauge">
      <table style="border: none;!important" class="hidden-xs">
        <tr style="border: none;!important">
          <div style="border: none;!important" class="heading-data">
            PRESSURE
            <br />GAUGE
          </div>
        </tr>
      </table>

      <span class="visible-xs-block">PRESSURE GAUGE</span>
    </div>-->
  </div>
</template>

<script>
import addTo from "../../Modals/Add_To";
export default {
  props: ["indexList", "tableMode"],
  computed: {
    returnSelectedMatches() {
      return this.$store.getters.returnSelectedMatches;
    },
    returnRoute() {
      return this.$router.app._route.path;
    },
    returnLoggedInUser() {
      return this.$store.getters.returnUser;
    }
  },
  methods: {
    removeFromShortlist() {
      // console.log(this.returnLoggedInUser);
      if (this.returnSelectedMatches.length >= 1) {
        this.returnSelectedMatches.forEach(match => {
          var data = {
            user: this.returnLoggedInUser._id,
            idToBeRemoved: match
          };
          this.$io.emit("removeShortlistItem", data);
        });
        this.$store.commit("resetSelectedMatchesState");
      } else {
        this.$notify({
          title: "Error.",
          text: "You must select at least one game to remove!",
          type: "error",
          group: "Main"
        });
      }
    },
    showModal(data) {
      if (this.returnSelectedMatches.length <= 0) {
        this.$notify({
          title: "Error.",
          text: "You must select at least one game to add!",
          type: "error",
          group: "Main"
        });
      } else {
        this.$modal.show(
          addTo,
          {
            height: 150
          },
          {}
        );
      }
    }
  }
};
</script>

<style>
#big_table_head > div {
  /* min-height: 100%; */
  /* display: grid; */
  /* -webkit-box-align: center; */
  -ms-flex-align: center;
  align-items: left;
  /* text-align: left; */
  /* -webkit-box-pack: center; */
  -ms-flex-pack: center;
  /* justify-content: center; */
  padding-top: 30px;
  color: white;
  /* grid-template-rows: 100%; */
      position: relative;
    border-right: 2px solid #821e1e;
    margin: 5px 0px;
    font-family: 'Poppins', sans-serif;
}
#big_table_head > div:last-child{
  border-right: 0px;
}
td.table-each-item.mf-area {
  background-color: transparent;
  height: 100%;
}

div#big_table_head {
  display: grid;
  position: -webkit-sticky;
  position: sticky;
  /*grid-template-columns: 3.8% 4.8% 6.8% 15.6% 10.6% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 4.8% 5.6%;*/
  grid-template-columns: 3.8% 4.8% 6.8% 17.6% 5% 5.8% 5.8% 5.8% 6.8% 5.8% 4.8% 6.8% 6.8% 6.8% 6.8%;
  top: 70px;
  z-index: 9999;
  grid-auto-flow: column;
  width: 100%;
  background: #292929;
  border-bottom: 3px solid #6d6d6d;
  height: 85px;
  -webkit-box-shadow: 0px 0px 10px -4px #4b4b4b;
  box-shadow: 0px 0px 10px -4px #4b4b4b;
  -webkit-box-align: center;
  -ms-flex-align: center;
  /* align-content: center; */
  min-height: 100%;
  overflow: hidden;
  background: rgb(255,9,9);
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(255,9,9,1)),to(rgba(196,6,6,1)));
  background: linear-gradient(to bottom, rgba(255,9,9,1) 0%,rgba(196,6,6,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0909', endColorstr='#c40606',GradientType=0 );
  border-bottom: 0px;
}
#oddsTitle {
  grid-area: title;
  /*background: #6f6d6d;
   display: grid; */
  align-items: center;
      padding-top: 10px;
      font-family: 'Poppins', sans-serif;
}
#oddsSp {
  grid-area: sp;
  /* display: grid; */
  align-items: center;
  /*background: #4a4a4a;*/
  border-top: 2px solid #821e1e;
  border-right: none;
  padding-top: 10px;
  font-family: 'Poppins', sans-serif;
}
#oddsLive {
  /* display: grid; */
  align-items: center;
  border-left: none;
  border-right: 2px solid #821e1e;
  border-top: 2px solid #821e1e;
  /*background: #4a4a4a;*/
  grid-area: live;
  font-family: 'Poppins', sans-serif;
  
  padding-top: 10px;
}
table#lo2 > tr > td > .strong {
  font-weight: bold;
  text-decoration: none !important;
  font-style: normal;
}
table#lo1 > tr > td > .strong {
  font-weight: 100;
}
#liveOddsSplit {
  display: grid !important;
  color: #ffffff;

  grid-template-areas: "title title" "live sp";
  grid-template-columns: 50% 50%;
}
.notify-bubble {
  position: absolute !important;
  top: -8px !important;
  right: -7px !important;
  padding: 2px 5px 2px 6px !important;
  background-color: green !important;
  color: white !important;
  font-size: 0.65em !important;
  border-radius: 50% !important;
  box-shadow: 1px 1px 1px gray !important;
  display: none !important;
}
.custBadge {
  position: relative !important;
  display: grid !important;
  margin-top: 10px !important;
  align-content: center;
  /* padding: 30px!important; */
}

.text-center {
  text-align: center !important;
}

.noRotate {
  transform: rotate(0deg) !important;
}

tr.table-heading-images > th {
  border: none;
  vertical-align: baseline;
}

.bl-br {
  border-left: 2px solid gray !important;
}
.largest {
  width: 112px !important;
}
.widthMax {
  width: 100% !important;
}
</style>
