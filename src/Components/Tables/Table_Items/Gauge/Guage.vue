<template>
  <td
    class="pressure-g-outer"
    :class="pressureGauge>=70? 'text-green':''"
  >{{pressureGauge? pressureGauge: 0}}%</td>
</template>

<script>
const guage = () => import("./../../Components/Chart.js");
export default {
  components: {
    guage
  },
  props: ["child"],
  computed: {
    styles() {
      return {
        height: `60px`,
        width: "60px",
        position: "relative",
        display: "inline-grid"
      };
    }
  },
  data() {
    return {
      pressureGauge: 0
    };
  },
  computed: {
    whichHistory() {
      switch (this.$store.getters.returnActiveMatchFlow) {
        case 1:
          return "fiveMinutesPrior";
        case 2:
          return "tenMinutesPrior";
        case 3:
          return "fifteenMinutesPrior";
      }
    },
    totalMinutes(){
       switch (this.$store.getters.returnActiveMatchFlow) {
        case 1:
          return 5;
        case 2:
          return 10;
        case 3:
          return 15;
      }
    }
  },
  watch: {
    whichHistory: function(old, newVal) {
      this.pressureGauge = this.computeData(this.child);
    }
  },
  beforeMount() {
    this.pressureGauge = this.computeData(this.child);
  },

  methods: {
    computeData(baseObject) {
      if (
        baseObject &&
        baseObject.dataHistory &&
        baseObject.dataHistory[this.whichHistory]
      ) {
        // console.log(baseObject,"THERE IS ",this.totalMinutes);
        // baseObject = baseObject.dataHistory[this.whichHistory];
        let localTeamStats = baseObject.stats ? baseObject.stats.data[0] : {};
        let visitorTeamStats = baseObject.stats ? baseObject.stats.data[1] : {};
        if(  localTeamStats === undefined || visitorTeamStats === undefined){
          return 0;
        }
        let attacks =
          (  localTeamStats.attacks ? localTeamStats.attacks.attacks : 0) +
          (visitorTeamStats.attacks ? visitorTeamStats.attacks.attacks : 0);
        let dangerous_attacks =
         ((localTeamStats.attacks
            ? localTeamStats.attacks.dangerous_attacks
            : 0) +
          (visitorTeamStats.attacks
            ? visitorTeamStats.attacks.dangerous_attacks
            : 0)) * 2;
        let shots =
         ( (localTeamStats.shots ? localTeamStats.shots.total : 0) +
          (visitorTeamStats.shots ? visitorTeamStats.shots.total : 0)) *5;
        let goalAttempts =
         ( (localTeamStats.shots ? localTeamStats.shots.ongoal : 0) +
          (visitorTeamStats.shots ? visitorTeamStats.shots.ongoal : 0)) * 10;
          // console.log(attacks,dangerous_attacks,shots,goalAttempts, "GAME STATS");
        let allStats =
          (attacks ? attacks * 1 : 0) +
          (dangerous_attacks ? dangerous_attacks * 2 : 0) +
          (shots ? shots * 5 : 0) +
          (goalAttempts ? goalAttempts * 10 : 0);
        
        // Step 2 
        // allStats = allStats * 2 ;
        // Step 3 
        // allStats  = this.totalMinutes / allStats;
        // Step 4 
        let pressureGauge = allStats
          ? Math.floor(
              ((this.$store.getters.returnActiveMatchFlow * 5) /
                (allStats * 2)) *
                100
            )
          : 0;
        pressureGauge =
          pressureGauge <= 100 ? 100 - pressureGauge : pressureGauge;
        // let pressureGauge  = allStats -1 ;

        return isNaN(pressureGauge) || pressureGauge >= 100 ? 0 : pressureGauge;
        //
      }
      return 0;
    }
  }
};
</script>
