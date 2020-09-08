<template>

  <div class="league_row st-head"  data-body="eng-body">
    <!--<th
      colspan="4"
      style="text-align: left;border-left: none; border-right:none;"
      class="team-name"
    >-->
      <!-- <p-check
        @change="addAll(item)"
        :checked="checkMethod(item)"
        class="p-icon p-smooth league_checkbox"
        color="success"
      >
        <check-icon class="icon" slot="extra" />All
      </p-check>-->
<div class="Scanner_Match_Times">
 <!-- <font-awesome-icon
        size="lg"
        class="pointer floatLeft"
        icon="thumbtack"
        
        @click="onToggleLeague(item,'')"
      /> -->
      <!-- MobileView Spain Icon-->
      <img :src="imagepath(item)" style="width: 30px;
    height: 20px;"  />
</div>
    <div class="Scanner_Alert_Circle alert-circle-outer">
      <span class="country_name" v-if="item.country">({{item.country.data.name}}) </span>
      {{item.name}}
     </div>
     <div class="MobileView-Strenght" v-responsive.sm.xs>
       Prediction Strength
     </div>
    <!--</th>-->
  </div>
</template>

<script>
import checkIcon from "vue-material-design-icons/Check.vue";
export default {
  data() {
    return {
      colspan: 0,
      colspan2: 0
    };
  },
  components: {
    checkIcon
  },
  props: ["item", "tableMode", "mode"],
  computed: {
    returnSelectedMatches() {
      return this.$store.getters.returnSelectedMatches;
    },
    returnScannerSelectedView() {
      return;
      if (this.$store.getters.returnScannerSelectedView == "upcoming") {
        this.colspan = 4;
        return this.$store.getters.returnScannerSelectedView;
      } else {
        this.colspan = 6;
      }
    }
  },
  methods: {
    imagepath(image){
      // console.log(image.country.data.image_path);
      if(image && image.country.data && image.country.data.image_path){
        return image.country.data.image_path;
      }else{
        return require("./../../../Assets/Images/Logos/spain.png");
      }
    },
    onToggleLeague(league) {
      // console.log(league);
      if (!league.is_my_league) {
        league = Object.assign({}, league, {
          countryLogoPath: league.country.data.image_path
        });
        // league.countryLogoPath = league.country.data.image_path;
        this.$store.commit("addMyLeague", league);
        this.$io.emit(
          "addMyLeague",
          league,
          this.$store.getters.returnUser._id
        );
      } else {
        this.$store.commit("removeMyLeague", league);
        this.$io.emit(
          "removeMyLeague",
          league,
          this.$store.getters.returnUser._id
        );
      }
    },
    checkMethod(item) {
      let matchesCount = 0;
      let inSelectedCount = 0;

      item.matches.forEach(child => {
        matchesCount++;
        if (this.returnSelectedMatches.includes(child.id)) {
          inSelectedCount++;
        }
      });
      if (matchesCount === inSelectedCount) {
        return true;
      } else {
        return false;
      }
    },
    addAll(item) {
      // console.log(item);

      item.matches.forEach(child => {
        if (this.returnSelectedMatches.includes(child.id)) {
          this.$store.commit(
            "removeSelectedMatch",
            this.returnSelectedMatches.findIndex(x => child.id === x)
          );
        } else {
          this.$store.commit("pushSelectedMatch", child.id);
        }
      });
    },
    hideLeague(league) {
      if (this.$store.getters.returnHiddenLeagues.find(i => i === league)) {
        var remove = this.$store.getters.returnHiddenLeagues.findIndex(
          i => i === league
        );
        this.$store.commit("removeLeagueToHide", remove);
      } else {
        this.$store.commit("pushLeagueToHide", league);
      }
    }
  }
};
</script>

<style>
.floatLeft{
  float: left !important;
}
.league_row {
  background: #fff;
    padding-left: 5px;
    min-height: 20px;
    display: grid;
    -ms-flex-line-pack: left;
    align-content: left;
    justify-items: left;
    grid-auto-flow: column;
    grid-template-columns: 3.8% 96.2%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-shadow: 0px 1px 3px 0px #000;
    box-shadow: 0px 1px 3px 0px #000;
    z-index: 1;
    position: relative;
    color: #000;
}

.league_row .Scanner_Alert_Circle.alert-circle-outer {
    text-transform: uppercase;
    font-size: 12px;
    font-family: proxima_nova_altbold;
}
.league_row.my_league {
  background: #1fd466;
}

.league_checkbox {
  padding-right: 35px;
}

.country_name {
  padding-left: 20px;
}

.Scanner_Checkbox {
  padding-left: 4px;
}
</style>
