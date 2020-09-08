<template>
  <div>
    <template v-if="matchStats">
      <ul id="stats">
        <li v-for="item in matchStats" :key="item.id">
          <span
            class="percentage-left"
            :class="item.score1 >= item.score2 ? 'text-green' : ''"
          >{{ item.score1 }}</span>
          <span
            class="percentage-right"
            :class="item.score2 >= item.score1 ? 'text-green' : ''"
          >{{ item.score2 }}</span>
          <span class="stats-name">{{ item.label }}</span>
        </li>
      </ul>
    </template>
    <template v-else>
      <no-data heading="No Stats" />
    </template>
  </div>
</template>
<script>
const noData = () => import("./../../Tables/Components/No-Data");
export default {
  data() {
    return {
      matchStats: []
    };
  },
  props: ["matchDetails"],
  components: {
    noData
  },

  mounted() {
    let data = [];
    let obj = this.matchDetails.stats.data[0]; // use to get keys because both array have same properties
    const team1 = this.matchDetails.stats.data[0];
    const team2 = this.matchDetails.stats.data[1];
    const { attacks, shots, passes, ...restOfElements } = obj;

    data.push(this.prepareStatsData(attacks, team1, team2, "attacks"));
    data.push(this.prepareStatsData(restOfElements, team1, team2));
    data.push(this.prepareStatsData(shots, team1, team2, "shots"));

    if (passes !== undefined) {
      data.push(this.prepareStatsData(passes, team1, team2, "passes"));
    }

    data = []
      .concat(data[0])
      .concat(data[1])
      .concat(data[2])
      .concat(data[3] !== undefined ? data[3] : []);
    this.matchStats = data;
  },
  methods: {
    getStatsLabels(item) {
      let statsLabel = {};
      let label = "";
      statsLabel["attacks"] = "Attacks";
      statsLabel["dangerous_attacks"] = "Dangerous Attacks";

      statsLabel["ball_safe"] = "Ball Safe";
      statsLabel["corners"] = "Corners";
      statsLabel["fouls"] = "Fouls";
      statsLabel["free_kick"] = "Free Kick";
      statsLabel["goal_attempts"] = "Goal Attempts";
      statsLabel["goal_kick"] = "Goal kick";
      statsLabel["goals"] = "Goals";
      statsLabel["injuries"] = "Injuries";
      statsLabel["offsides"] = "Offsides";
      statsLabel["passes"] = "Passes";
      statsLabel["penalties"] = "Penalties";
      statsLabel["possessiontime"] = "Possession Time";
      statsLabel["redcards"] = "Red Cards";
      statsLabel["saves"] = "Ball Saves";
      statsLabel["substitutions"] = "Substitutions";
      statsLabel["yellowcards"] = "Yellow Cards";
      statsLabel["yellowredcards"] = "Yellow Red Cards";

      statsLabel["shots"] = "Shots";
      statsLabel["blocked"] = "Shots Blocked";
      statsLabel["insidebox"] = "Shots Inside Box";
      statsLabel["offgoal"] = "Shots Off Goal";
      statsLabel["ongoal"] = "Shots On Goal";
      statsLabel["outsidebox"] = "Shots Outside Box";
      statsLabel["total"] = "Shots Total";
      statsLabel["accurate"] = "Accurate";
      statsLabel["percentage"] = "Percentage";

      label = statsLabel[item];

      return label;
    },

    prepareStatsData(obj, team1, team2, type = null) {
      let data = [];
      if (typeof obj === "object") {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            let value = obj[key];
            if (
              key === "team_id" ||
              key === "fixture_id" ||
              typeof value === "object"
            )
              continue;

            let item = {
              key: key,
              label: this.getStatsLabels(key),
              score1: type === null ? team1[key] : team1[type][key],
              score2: type === null ? team2[key] : team2[type][key],
              unit: "%"
            };
            data.push(item);
          }
        }
      }
      return data;
    }
  }
};
</script>
<style>
#stats {
  list-style: none;
  text-align: center;
  padding: 0px !important;
}
#stats li {
  border-bottom: 1px solid lightgrey;
  line-height: 2em;
}
#stats li:nth-child(even) {
  background: #ddf5e5;
}
#stats li:nth-child(odd) {
  background: #cae1d1;
}
.percentage-left {
  float: left;
  margin-left: 20px;
}
.percentage-right {
  float: right;
  margin-right: 20px;
}
</style>
