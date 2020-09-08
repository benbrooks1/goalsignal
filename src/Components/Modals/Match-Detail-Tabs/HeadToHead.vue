<template>
  <div>
    <template v-if="returnMatchHead2Head">
      <!-- <ul> -->
      <div class="data-row" v-if="returnMatchHead2Head && returnMatchHead2Head.team1Result && returnMatchHead2Head.team1Result[0] && returnMatchHead2Head.team1Result[0].localTeam.data.name">
        <h4
          class="league-row"
        >Last Matches: {{returnMatchHead2Head.team1Result[0].localTeam.data.name}}</h4>
        <ul class="league-data">
          <li class="row-content" v-for="item in returnMatchHead2Head.team1Result" :key="item.id">
            <span class>{{item.time.starting_at.date}}</span>
            <span class>{{item.localTeam.data.name}}</span>
            <span class>{{item.visitorTeam.data.name}}</span>
            <span class="score-status">
              {{item.scores.localteam_score + ":" +item.scores.visitorteam_score}}
              <span
                :class="['tag',`tag-${getWinLostDraw(item).class}`]"
              >{{getWinLostDraw(item).status}}</span>
            </span>
          </li>
          <!-- <li class="row-content">
              <span class>11.0.6</span>
              <span class>Man City</span>
              <span class>Liverpool</span>
              <span class>
                8.0
                <span class="tag tag-lose">L</span>
              </span>
            </li>
            <li class="row-content">
              <span class>11.0.6</span>
              <span class>Man City</span>
              <span class>Liverpool</span>
              <span class>
                8.0
                <span class="tag tag-draw">D</span>
              </span>
          </li>-->
        </ul>
        <h4
          class="league-row"
        >Last Matches: {{returnMatchHead2Head.team2Result[0].localTeam.data.name}}</h4>
        <ul class="league-data">
          <li class="row-content" v-for="item in returnMatchHead2Head.team2Result" :key="item.id">
            <span class>{{item.time.starting_at.date}}</span>
            <span class>{{item.localTeam.data.name}}</span>
            <span class>{{item.visitorTeam.data.name}}</span>
            <span class="score-status">
              {{item.scores.localteam_score + ":" +item.scores.visitorteam_score}}
              <span
                :class="['tag',`tag-${getWinLostDraw(item).class}`]"
              >{{getWinLostDraw(item).status}}</span>
            </span>
          </li>
          <!-- <li class="row-content">
              <span class>11.0.6</span>
              <span class>Man City</span>
              <span class>Liverpool</span>
              <span class>
                8.0
                <span class="tag tag-lose">L</span>
              </span>
            </li>
            <li class="row-content">
              <span class>11.0.6</span>
              <span class>Man City</span>
              <span class>Liverpool</span>
              <span class>
                8.0
                <span class="tag tag-draw">D</span>
              </span>
          </li>-->
        </ul>
      </div>
      <!-- <li class="data-row">
          <h4 class="league-row">Last Matches: Man City</h4>
          <ul class="league-data">
            <li class="row-content">
              <span class>11.0.6</span>
              <span class>Man City</span>
              <span class>Liverpool</span>
              <span class>
                8.0
                <span class="tag tag-won">W</span>
              </span>
            </li>
            <li class="row-content">
              <span class>11.0.6</span>
              <span class>Man City</span>
              <span class>Liverpool</span>
              <span class>
                8.0
                <span class="tag tag-lose">L</span>
              </span>
            </li>
            <li class="row-content">
              <span class>11.0.6</span>
              <span class>Man City</span>
              <span class>Liverpool</span>
              <span class>
                8.0
                <span class="tag tag-draw">D</span>
              </span>
            </li>
          </ul>
      </li>-->
      <!-- </ul> -->
    </template>
    <template v-else>
      {{returnMatchHead2Head}}
      <no-data heading="No Head To Head"></no-data>
    </template>
  </div>
</template>
<script>
const noData = () => import("./../../Tables/Components/No-Data");
export default {
  data() {
    return {
      sections: []
    };
  },
  components: {
    noData
  },
  computed: {
    returnMatchHead2Head() {
      return this.$store.getters.returnMatchHead2Head;
    }
  },
  mounted() {
    this.$store.dispatch("getMatchHead2Head", {
      team1: this.$store.state.$Ui.ui.selectedMatch.localteam_id,
      team2: this.$store.state.$Ui.ui.selectedMatch.visitorteam_id
    });
    if (this.returnMatchHead2Head) {
      console.log(this.returnMatchHead2Head);
      const { localTeam, visitorTeam } = this.$store.state.$Ui.ui.selectedMatch;

      const RC = this.returnMatchHead2Head;
      if (
        typeof RC[localTeam.data.id] === "object" &&
        typeof RC[visitorTeam.data.id] === "object"
      ) {
        this.sections = [
          {
            key: "local-team",
            data: RC[localTeam.data.id],
            title: `Last Matches: ${matchDetail.localTeam.data.name}`
          },
          {
            key: "visitor-team",
            data: RC[visitorTeam.data.id],
            title: `Last Matches: ${matchDetail.visitorTeam.data.name}`
          }
        ];
        // console.log(this.sections);
      }
    }
  },
  methods: {
    getWinLostDraw(item) {
      let win = "W",
        lost = "L",
        draw = "D";
      let who = { status: "", color: "" };

      if (item.winner_team_id !== null) {
        if (item.scores.localteam_score === item.scores.visitorteam_score) {
          who.status = draw;
          who.class = "draw";
        } else {
          if (
            item.localteam_id === item.winner_team_id ||
            item.visitorteam_id === item.winner_team_id
          ) {
            who.status = win;
            who.class = "won";
          } else {
            who.status = lost;
            who.class = "lost";
          }
        }
      } else {
        who.status = draw;
        who.class = "draw";
      }

      return who;
    },
    groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
  }
};
</script>
<style>
ul {
  list-style: none;
}
ul.league-data {
  padding-left: 0px;
}
.league-row {
  text-align: center;
  background: #4a4a4a;
  color: #fff;
  margin-bottom: 0px;
  padding: 2px;
}
.tag {
  border-radius: 2px;
  color: #fff;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}
.tag-won {
  background: #1fd466;
}
.tag-lost {
  background: red;
}
.tag-draw {
  background: #ffd41e;
}
.league-data .row-content {
  display: grid;
  grid-template-columns: 15% 40% 30% 15%;
}
.league-data .score-status {
  display: grid;
  grid-template-columns: 30% 70%;
}
.league-data .row-content:nth-child(odd) {
  background: #ddf5e5;
}
.league-data .row-content:nth-child(even) {
  background: #cae1d1;
}
</style>
