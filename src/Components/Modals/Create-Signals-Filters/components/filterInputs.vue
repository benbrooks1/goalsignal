<template>
  <div>
    
    <div v-if="propertyRequires.type === 'Slider'">
      
      <input
      v-if="selectedFilter  !== 'SCORE IS'"
        type="text"
        max="120"
        @keypress="isNumber($event)"
        id="filterVal"
        class
        :pattern="'\d{' +filterOptions[selectedFilter] ? filterOptions[selectedFilter].MAX_DIGITS: 5+ '}'"
        :maxlength="filterOptions[selectedFilter] ? filterOptions[selectedFilter].MAX_DIGITS: 5"
        v-model="filter.value.singular"
      />


     <div v-if="selectedFilter  === 'SCORE IS'" style="display: inline-block;"> 
      <div style="text-align: center;"> Home </div>
      <input
        v-if="selectedFilter  === 'SCORE IS'"
        type="text"
        max="120"
        @keypress="isNumber($event)"
        id="filterVal"
        class
        :pattern="'\d{' +filterOptions[selectedFilter] ? filterOptions[selectedFilter].MAX_DIGITS: 5+ '}'"
        :maxlength="filterOptions[selectedFilter] ? filterOptions[selectedFilter].MAX_DIGITS: 5"
        v-model="filter.value.home"
      />
      </div>
      <div v-if="selectedFilter  === 'SCORE IS'" style="display: inline-block;"> 
      <div  v-if="selectedFilter  === 'SCORE IS'" style="text-align: center;"> Away </div>
      <input
        v-if="selectedFilter  === 'SCORE IS'"
        type="text"
        max="120"
        @keypress="isNumber($event)"
        id="filterVal"
        class
        :pattern="'\d{' +filterOptions[selectedFilter] ? filterOptions[selectedFilter].MAX_DIGITS: 5+ '}'"
        :maxlength="filterOptions[selectedFilter] ? filterOptions[selectedFilter].MAX_DIGITS: 5"
        v-model="filter.value.away"
      />
      </div>
    

      <span
        class="filter-unit"
        :class="filter.currentlySelectedFilterValue.text && filterOptions[selectedFilter].UNIT == '%'?'percent':''"
      >{{filterOptions[selectedFilter]? filterOptions[selectedFilter].UNIT : ""}}</span>
    </div>

    <filter-input
      v-if="propertyRequires.type === 'Single Number'"
      type="Slider"
      :index="index"
      :filter="filter"
    />

    <div class="childGrid" v-if="propertyRequires.type === 'Double Number'" type="Double Number">
      <span id="sliderValue">
        <label class="own homeLabel">Home</label>
        <label class="own awayLabel">Away</label>
      </span>
      <filter-input
        v-if="propertyRequires.type === 'Double Number'"
        type="Double Number"
        :percentageOnTypes="['Possession Is','Supremacy Is']"
        :index="index"
        :filter="filter"
      />
    </div>

    <filter-input
      v-if="propertyRequires.type === 'Odds'"
      type="Odds"
      :index="index"
      :filter="filter"
    />
  </div>
</template>

<script>
const VueSlider = () => import("vue-slider-component");
const filterInput = () => import("./inputs/filterInput");
const operatorSelect = () => import("./../../more_less_exact");
import FilterConfig from "./../../../../Constants/filter-config";
import "vue-slider-component/theme/default.css";
export default {
  components: {
    operatorSelect,
    filterInput,
    VueSlider
  },

  props: ["filter", "index", "applyTo", "selectedFilter"],
  data() {
    return {
      filterOptions: FilterConfig.FILTER,
      value: "",
      title: ""
    };
  },
  mounted() {
    
    this.checkType(this.filter.currentlySelectedFilterValue.value);
  },
  watch: {
    "filter.currentlySelectedFilterValue.value": function(val) {
      // console.log(val);
      this.checkType(val);
    }
  },

  methods: {
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    checkType(value) {
     
      switch (value) {
        case "time-div":
          this.title = "Time Is";
          break;
        case "score-div":
          this.title = "Score Is";
          break;
        case "lo-div":
          this.title = "Live Odds Are";
          break;
        case "spo-div":
          this.title = "SP Odds Are";
          break;
        case "possession-div":
          this.title = "Possession Is";
          break;
        case "supremacy-div":
          this.title = "Supremacy Is";
          break;
        case "shots-div":
          this.title = "Goal Attempts Are";
          break;
        case "sot-div":
          this.title = "Shots On Target Are";
          break;
        case "corners-div":
          this.title = "Corners Are";
          break;
        case "yellow-cards-div":
          this.title = "Yellow Cards Are";
          break;
        case "red-cards-div":
          this.title = "Red Cards Are";
          break;
      }
    }
  },
  computed: {
    propertyRequires() {
      // console.log(this.applyTo,"FACEBOOK");
      switch (this.title) {
        case "Score Is":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "Points",
                maxSliderValue: 50
              };
          }
          break;
        // ------------------
        case "Possession Is":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "%",
                maxSliderValue: 100
              };
          }
        case "Supremacy Is":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "%",
                maxSliderValue: 100
              };
          }
        case "Goal Attempts Are":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "Shots",
                maxSliderValue: 50
              };
          }
        case "Shots On Target Are":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "Shots",
                maxSliderValue: 50
              };
          }
        case "Corners Are":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "Corners",
                maxSliderValue: 50
              };
          }
        case "Red Cards Are":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "Cards",
                maxSliderValue: 25
              };
          }
        case "Yellow Cards Are":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Double Number"
              };
              break;
            default:
              return {
                type: "Slider",
                text: "Cards",
                maxSliderValue: 25
              };
          }
          break;
        // ------------------
        case "Live Odds Are":
        case "SP Odds Are":
          switch (this.applyTo) {
            case "match":
              return {
                type: "Odds"
              };
              break;
            default:
              return {
                type: "Slider",
                text: null,
                maxSliderValue: 20
              };
          }
          break;
        // ------------------
        case "Time Is":
          return {
            type: "Slider",
            text: "Minutes",
            maxSliderValue: 120
          };
          break;
        // ------------------
        default:
          return {
            type: "Slider",
            text: "Minutes",
            maxSliderValue: 120
          };
      }
    }
  }
};
</script>

<style>
.filter-unit {
  position: relative;
  /* top: 14px; */
  font-weight: bold;
  font-size: 10px;
  /* display: block; */
  /* text-align: center; */
  vertical-align: middle;
  left: 0px;
  display:inline-block;
}
.filter-unit.percent {
  font-size: 16px;
  top: 0px;
}
div#th {
  border-radius: 4px;
  display: grid;
  min-height: 100%;
}

.homeLabel {
  padding: 5px 0px !important;
}

.awayLabel {
  padding: 5px 0px !important;
}

.vue-slider {
  display: grid !important;
}

.childGrid {
  display: grid;

  grid-template-rows: 25% 25%;
  color: black;
  word-break: break-word;
  white-space: nowrap;
}

.vs__selected {
  white-space: nowrap !important;
}

.fs-select-out {
  border-top: 4px solid #3a3a3a !important;
}

.vue-slider-process {
  background-color: #2ad466 !important;
}

.vue-slider-dot-handle {
  background-color: #148c40 !important;
  border: 2px solid #24d364 !important;
}

span#sliderValue {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

span#sliderValue {
  display: grid;

  grid-template-rows: 1fr;
  /* justify-self: center; */
  text-align: center;
  justify-content: center;
  grid-column-gap: 30px;
}

.own {
  width: 100% !important;
  float: unset !important;
}
input#filterVal {
  border: 2px solid #555555;
  font-size: 10px;
  width: 35px;
  height: 32px;
  background: #fdfdfd;
  margin: 5px;
  text-align: center;
  display: inline-block;
}
</style>
