<template>
  <div id="team-standings">
    <div id="team-standings-header">
      <span>#</span>
      <span>Teams</span>
      <span>P</span>
      <span>W</span>
      <span>D</span>
      <span>L</span>
      <span>GD</span>
      <span>PTS</span>
    </div>

    <ul class="team-standings-row" v-for="record in records" :key="record.id">
      <!-- {{record.data}} -->

      <li v-for="(item, index) in record.data" :key="item.id">
        <div
          class="group-header"
          style="background:green"
          v-if="records.length > 1 && index == 0"
        >{{ item.group_name ? item.group_name : "Group" }}</div>
        <div class="row-content" v-if="item.overall">
          <span
            class="team-rank"
            :class="item.position <= 4 ? 'top-team' : ''"
          >{{ ("0" + item.position).slice(-2) }}</span>
          <span>
            <img src />
            {{ item.team_name }}
          </span>
          <span>{{ item.overall.games_played }}</span>
          <span>{{ item.overall.won }}</span>
          <span>{{ item.overall.draw }}</span>
          <span>{{ item.overall.lost }}</span>
          <span>{{ item.total.goal_difference }}</span>
          <span>{{ item.total.points }}</span>
        </div>
        <div class="row-content" v-else>
          <span
            class="team-rank"
            :class="item.position <= 4 ? 'top-team' : ''"
          >{{ ("0" + item.position).slice(-2) }}</span>
          <span>
            <img src />
            {{ item.team_name }}
          </span>
          <span>{{ item.played }}</span>
          <span>{{ item.wins }}</span>
          <span>{{ item.draws }}</span>
          <span>{{ item.lost }}</span>
          <span>{{ item.goal_diff }}</span>
          <span>{{ item.points }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      records: []
    };
  },
  props: ["standings"],
  mounted() {
    if (this.standings && this.standings.length > 0) {
      this.records = [];
      if (this.$store.state.$Ui.ui.selectedMatch.time.status === "LIVE") {
        let container = {};
        container.id = 0;
        container.name = "Regular Season";
        container.data = this.standings;
        this.records.push(container);
      } else {
        this.standings.forEach(item => {
          let container = {};
          container.id = item.id;
          container.league_id = item.league_id;
          container.name = item.name;
          container.resource = item.resource;
          container.round_id = item.round_id;
          container.round_name = item.round_name;
          container.season_id = item.season_id;
          container.stage_id = item.stage_id;
          container.stage_name = item.stage_name;
          container.data = item.standings.data;
          this.records.push(container);
        });
      }
    }
  }
};
</script>
<style>
#standings .tabs-component-tab {
  margin: 0px;
  border: 0px;
  border-radius: 0px;
  border-left: 1px solid grey;
  width: 60px;
}
#standings .tabs-component-tab-a {
  padding: 0.2em 1em;
}
.tabs-component-panels {
  border: 0px;
  box-shadow: none;
  padding: 1em 2em;
}
#standings .tabs-component {
  margin: 1em 0;
}
#standings .tabs-component-tab.is-active {
  transform: none;
}
#team-standings {
  padding: 0px;
}
</style>
