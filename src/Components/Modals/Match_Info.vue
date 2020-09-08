<template>
  <!-- <no-data></no-data> -->

  <div class="div-parent">
    <div class="col-card">
      <template
        v-if="
          $store.state.$Ui.ui.selectedMatch.stats &&
            $store.state.$Ui.ui.selectedMatch.stats.data.length > 0
        "
      >
        <div id="matchLogos">
          <div class="team-logo-container">
            <img
              v-if="$store.state.$Ui.ui.selectedMatch.localTeam.data.logo_path"
              :src="$store.state.$Ui.ui.selectedMatch.localTeam.data.logo_path"
            />
            <img v-else src="./../../Assets/Images/Icons/Signal-Icon.png" />
            <p>{{$store.state.$Ui.ui.selectedMatch.localTeam.data.name}}</p>
          </div>
          <div class="team-parent">
            <div class="teamscored">
              <div class="team-score" style="padding: 2px;">{{$store.state.$Ui.ui.selectedMatch.scores.localteam_score}} </div>
              <div class="team-score" style="padding: 2px;"> - </div>
              <div class="team-score" style="padding: 2px;"> {{$store.state.$Ui.ui.selectedMatch.scores.visitorteam_score}}</div>
            </div>
            <div class="team-score" style="font-size: 25px;">{{$store.state.$Ui.ui.selectedMatch.time.minute}}<span class="fadeInAndOut">'</span></div>
          </div>
          <div class="team-logo-container">
            <img
              v-if="$store.state.$Ui.ui.selectedMatch.visitorTeam.data.logo_path"
              :src="$store.state.$Ui.ui.selectedMatch.visitorTeam.data.logo_path"
            />
            <img v-else src="./../../Assets/Images/Icons/Signal-Icon.png" />
            <p>{{$store.state.$Ui.ui.selectedMatch.visitorTeam.data.name}}</p>
          </div>
        </div>
        <tabs id="tabing" :options="{ useUrlFragment: false }">
          <tab name="Summary">
            <match-summary :matchEvents="matchEvents" />
          </tab>
          <tab name="Stats">
            <stats :matchDetails="$store.state.$Ui.ui.selectedMatch" />
          </tab>
          <tab name="H2H">
            <h2h />
          </tab>
          <tab name="Standings">
            <standings />
          </tab>
        </tabs>
      </template>
      <template v-else>
        <div class="no-data-placeholder">
          <h2 class="no-live-text">No Events</h2>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const matchSummary = () => import("./Match-Detail-Tabs/Summary");
const stats = () => import("./Match-Detail-Tabs/Stats");
const standings = () => import("./Match-Detail-Tabs/Standings/Standings");
const h2h = () => import("./Match-Detail-Tabs/HeadToHead");
export default {
  components: {
    matchSummary,
    stats,
    standings,
    h2h
  },
  methods:{
      // tabClicked (selectedTab,events) {
      //       console.log('Current tab re-clicked: q232q' + selectedTab, events);
      //       // console.log(JSON.stringify(selectedTab))
      //       // events.stopPropagation();
      //       // document.getElementById("moreInfoBox").scrollTo(0,0)
      //   },
      //   tabChanged (selectedTab) {
      //       console.log('Tab changed to:' + selectedTab.tab.name);
      //   },
       greet: function (event) {
      // `this` inside methods points to the Vue instance
      // alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      // event.stopPropagation()
      // document.getElementById("moreInfoBox").scrollTo(0,0)
      // document.getElementById("moreInfoBox").scrollTop =0;
      // console.log(event.stopPropagation())
      if (event) {
        // alert(event.target.tagName)
      }
    }
  },
  data() {
    return {
      matchEvents: []
    };
  },

  mounted() {
    this.matchEvents =
      this.$store.state.$Ui.ui.selectedMatch &&
      this.$store.state.$Ui.ui.selectedMatch.events
        ? this.$store.state.$Ui.ui.selectedMatch.events.data
        : [];
        // console.log(this.$store.state.$Ui.ui.selectedMatch,"SELECTED MATACH");
  }
};
</script>

<style>
.tabs-component {
  margin: 4em 0;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
  display: flex;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 4em 0;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 4em 2em;
  }
}

.top-bg h2 {
  margin: 0;
  text-transform: uppercase;
  color: #fff;
}

.no-live-text {
  display: inline-flex;
  align-items: center;
  -webkit-box-pack: center !important;
  -webkit-justify-content: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
  height: 506px;
  text-align: center;
  align-content: center;
  align-self: center;
  width: 100%;
  margin: 0;
}
#NoFilters {
  min-width: auto !important;
}
#matchLogos {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  text-align: center;
  width: 70%;
  margin: 10px auto;
}
.teamscored {
    display: -webkit-flex;
    -webkit-flex-direction: row-reverse;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.team-score {
  line-height: 2em;
  font-weight: bold;
  color: #23d364;
  font-size: 30px;
}
.team-logo-container img {
  max-width: 60px;
}
</style>
