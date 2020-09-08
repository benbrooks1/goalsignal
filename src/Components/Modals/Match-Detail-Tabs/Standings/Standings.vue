<template>
  <div>
    <template v-if="returnMatchStandings && returnMatchStandings.length">
      <!-- <tabs id="tabing">
        <tab name="All">
          <standings-table :standings="returnMatchStandings"
        /></tab>
        <tab name="Home"
          ><standings-table :standings="returnMatchStandings"
        /></tab>
        <tab name="Away"><no-data heading="No Data"/></tab>
      </tabs>-->
      <standings-table :standings="returnMatchStandings" />
    </template>
    <template v-else>
      <div style="display:none">{{ returnMatchStandings }}</div>
      <no-data heading="No Standings"></no-data>
    </template>
  </div>
</template>
<script>
const standingsTable = () => import("./Standings-Table");
const noData = () => import("./../../../Tables/Components/No-Data");
export default {
  computed: {
    returnMatchStandings() {
      return this.$store.getters.returnMatchStandings;
    }
  },
  components: {
    standingsTable,
    noData
  },
  mounted() {
    this.$store.dispatch("getMatchStandings", {
      season_id: this.$store.state.$Ui.ui.selectedMatch.season_id
    });
  }
};
</script>
<style>
.team-standings-row .row-content,
#team-standings-header {
  display: grid;
  grid-template-columns: 7% 51% 7% 7% 7% 7% 7% 7%;
}
.team-standings-row .row-content span {
  padding: 5px 0px;
}

#team-standings-header {
  background: #4a4a4a;
  color: #fff;
}
.team-standings-row {
  padding: 0px 0px;
}
.team-standings-row li {
  border-bottom: 1px solid lightgray;
}
.team-standings-row span:first-child,
#team-standings-header span:first-child {
  margin-left: 5px;
}
.team-standings-row li:nth-child(odd) {
  background: #ddf5e5;
}
.team-standings-row li:nth-child(4) {
  border-bottom: 3px solid #1fd466;
}
.team-standings-row li:nth-child(even) {
  background: #cae1d1;
}
.team-rank {
  text-align: center;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  padding: 0px !important;
  top: 50%;
  position: relative;
  transform: translate(0, -50%);

  margin: 0px;
}
.team-rank.top-team {
  background: #1fd466;
  color: #fff;
}
.team-standings-row .group-header {
  color: #fff;
  text-align: center;
  padding: 5px;
}
</style>
