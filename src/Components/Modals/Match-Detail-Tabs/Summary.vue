<template>
  <div>
    <template v-if="matchEvents.length">
      <div class="card" v-for="event in matchEvents" v-bind:key="event.id">
        <div class="card1">
          <div
            v-if="
              event.team_id ==
                $store.state.$Ui.ui.selectedMatch.events.data[0].team_id
            "
          >
            <img
              v-if="event.type == 'penalty' || event.type == 'redcard'"
              src="./../../../Assets/Images/Logos/red-card.png"
            />
            <img
              v-if="event.type == 'yellowcard'"
              src="./../../../Assets/Images/Logos/Yellow-Card.png"
            />
            <img
              v-if="event.type == 'goal'"
              src="./../../../Assets/Images/Logos/football.png"
            />
            <img
              v-if="event.type == 'substitution'"
              src="./../../../Assets/Images/Logos/replace.png"
            />
            {{ event.player_name ? event.player_name : "--" }}
            <span v-if="event.type == 'substitution'">
              <span class="replacement-text">on for</span>
              {{ event.related_player_name ? event.related_player_name : "--" }}
            </span>
          </div>
        </div>
        <div class="circle-no">{{ event.minute }}</div>
        <div class="card2">
          <div
            v-if="
              event.team_id !=
                $store.state.$Ui.ui.selectedMatch.events.data[0].team_id
            "
          >
            {{ event.player_name ? event.player_name : "--" }}
            <span v-if="event.type == 'substitution'">
              <span class="replacement-text">on for</span>
              {{ event.related_player_name ? event.related_player_name : "--" }}
            </span>
            <img
              v-if="event.type == 'penalty' || event.type == 'redcard'"
              src="./../../../Assets/Images/Logos/red-card.png"
            />
            <img
              v-if="event.type == 'yellowcard'"
              src="./../../../Assets/Images/Logos/Yellow-Card.png"
            />
            <img
              v-if="event.type == 'goal'"
              src="./../../../Assets/Images/Logos/football.png"
            />
            <img
              v-if="event.type == 'substitution'"
              src="./../../../Assets/Images/Logos/replace.png"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <no-data heading="No Events" />
      <!-- <div class="no-data-placeholder">
        <h2 class="no-live-text">No Events</h2>
      </div> -->
    </template>
  </div>
</template>
<script>
const noData = () => import("./../../Tables/Components/No-Data");
export default {
  data() {
    return {};
  },
   created() {
    
    // console.log('propertyComputed will update, as this.property is now reactive.')
  },
  props: ["matchEvents"],
  components: {
    noData
  }
};
</script>
<style scoped>
.card {
  min-height: 50px;
  width: 100%;
  min-height: 46px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #445e4a;
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
}
.card1 {
  width: 45%;
  float: left;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #223a58;
  margin-right: 10px;
  margin-left: 12px;
}

.replacement-text {
  font-family: "Poppins", sans-serif;
  color: #a9b8bd;
  font-size: 13px;
  font-weight: 400;
}

.col-card-2 {
  width: 20%;
}

div#moreInfoBox {
  height: 500px;
  overflow-y: hidden;
}

.card2 {
  width: 47%;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #223a58;
  text-align: right;
}

.col-card .card:nth-child(odd) {
  background: #ddf5e5;
}

.col-card .card:nth-child(even) {
  background: #cae1d1;
}

.col-card .card:last-child .circle-no::after {
  background: none;
  display: none;
}

.circle-no {
  font-family: "Poppins", sans-serif;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #73dc99;
  background: #ddf5e5;
  font-size: 14px;
  color: #5c728b;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
  position: relative;
}

.card .circle-no::after {
  content: "";
  background: #909d96;
  width: 1px;
  height: 18px;
  position: absolute;
  bottom: -19px;
  text-align: center;
  right: 0;
  left: 0;
  margin: auto;
}

.card img {
  padding: 0 10px;
  width: 40px;
  max-width: 100%;
  height: auto;
}
</style>
