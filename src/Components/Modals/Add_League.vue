<template>
  <div class="filter">
    <form class="filter-form">
      <div
        id="itemContainer"
        style="display: block!important"
        class="fs-select-out shadow clearfix fs-select-original"
      >
        <div
          id="Logic_Input"
          v-for="(filter, index) in filters"
          :key="index"
          class="itemGrid"
          v-if="step === 1"
        >
          <div class="Container">
            <v-select
              classes="pointer"
              label="text"
              placeholder="Apply To"
              v-validate="'required'"
              :reduce="item => item.value"
              v-model="filter.applyTo"
              :options="applyToOptions"
            />
          </div>

          <div class="Container">
            <v-select
              classes="pointer"
              label="text"
              placeholder="Filter"
              v-validate="'required'"
              name="filter.currentlySelectedFilterValue"
              v-model="filter.currentlySelectedFilterValue"
              :options="options"
            />
          </div>

          <div id="th" class="Container">
            <span v-if="filter.currentlySelectedFilterValue == ''" id="noDataSpan">Value</span>
            <filter-inputs :filter="filter" :applyTo="filter.applyTo" :index="index" />
          </div>

          <div class="Container">
            <v-select classes="pointer" label="text" placeholder="Operator"
            v-validate="'required'" :name="`filter-select-${index}`"
            v-model="filter.operator" :reduce="item => item.value"
            :options="[{text: "Or More", value:"more"},{text: "Or LEss",
            value:"less"}, {text: "Exactly", value:"exact"}]" />
          </div>
        </div>

        <div
          class="itemLayout"
          :class="{
            signalFinish: mode !== 'filter',
            signalFinish2: mode === 'filter'
          }"
          id="signalFinish"
          v-if="step === 2"
        >
          <div id="nameWrap">
            <label v-if="mode !== 'filter'" id="signalNameLabel">Signal Name</label>
            <label v-else id="signalNameLabel">Filter Name</label>
            <input
              id="signalName"
              v-model="name"
              type="text"
              v-validate="'required'"
              class="form-control"
              name="name"
            />
          </div>
          <div v-if="mode !== 'filter'" id="soundWrap">
            <label class="soundLabel">Sound:</label>
            <div class="home_away_select soundOption form-control">
              <div class="toggle">
                <input
                  type="radio"
                  :name="`home-away-1`"
                  :value="1"
                  v-validate="'required'"
                  v-model="sound"
                  id="sizeWeight"
                  checked="checked"
                />
                <label class="special" for="sizeWeight">1</label>
                <input
                  type="radio"
                  :name="`home-away-2`"
                  :value="2"
                  v-validate="'required'"
                  v-model="sound"
                  id="sizeDimensions"
                />
                <label class="special" for="sizeDimensions">2</label>

                <input
                  type="radio"
                  :name="`home-away-3`"
                  :value="3"
                  v-validate="'required'"
                  v-model="sound"
                  id="sizeMatch"
                />
                <label class="special" for="sizeMatch">3</label>

                <input
                  type="radio"
                  :name="`home-away-4`"
                  :value="4"
                  v-validate="'required'"
                  v-model="sound"
                  id="last"
                />
                <label class="special" for="last">4</label>
              </div>
            </div>
          </div>

          <div v-if="mode !== 'filter'" id="alertsSettings">
            <label>Notfication Settings:</label>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- </div> -->

      <button
        type="button"
        v-if="step !== 1"
        id="filterNavBack"
        @click="back"
        class="btn btn-green"
      >
        <font-awesome-icon class="pointer" icon="caret-left" />Back
      </button>
      <button
        type="button"
        v-if="step == 1"
        id="filterNavAnd"
        @click="addFilterForm"
        class="btn btn-green butYellow"
      >
        <font-awesome-icon class="pointer" icon="plus" />And
      </button>
      <button
        type="button"
        v-if="step !== 2"
        id="filterNavNext"
        @click="next"
        class="btn btn-green"
      >
        Next
        <font-awesome-icon class="pointer" icon="caret-right" />
      </button>
      <button
        type="button"
        v-if="step == 2"
        id="filterNavNext"
        @click="addFilter(name)"
        class="btn btn-green"
      >Create</button>
    </form>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { Howl, Howler } from "howler";

import filterInputs from "./Create-Signals-Filters/components/filterInputs";
export default {
  props: {
    mode: String
  },
  computed: {
    returnUser() {
      return this.$store.getters.returnUser;
      // console.log(this.$store.getters.returnUser);
    }
  },
  data() {
    return {
      value: 0,
      applyToOptions: [
        {
          value: "match",
          text: "Match"
        },
        {
          value: "local",
          text: "Home Team"
        },
        {
          value: "visitor",
          text: "Away Team"
        }
      ],
      options: [
        {
          value: "time-div",
          text: "Time Is",
          logicName: "Time Is"
        },
        // {
        //     value: 'lo-div',
        //     text: "Live Odds Are",
        // },
        {
          value: "score-div",
          text: "Score Is"
        },
        // {
        //     value: 'spo-div',
        //     text: "SP Odds Are",
        // },
        {
          value: "possession-div",
          text: "Possession Is"
        },
        {
          value: "supremacy-div",
          text: "Supremacy Is"
        },
        {
          value: "shots-div",
          text: "Goal Attempts Are"
        },
        {
          value: "sib-div",
          text: "Shots On Target Are"
        },
        {
          value: "corners-div",
          text: "Corners Are"
        },
        {
          value: "yellow-cards-div",
          text: "Yellow Cards Are"
        },
        {
          value: "red-cards-div",
          text: "Red Cards Are"
        }
      ],
      soundLink: "",
      sound: "",
      step: 1,
      create: true,
      saveText: "Next",
      andText: "And +",
      name: "",
      filters: [
        {
          applyTo: "",
          currentlySelectedFilterValue: "",
          watchOn: "",
          value: {
            home: "0",
            away: "0",
            singular: "0"
          },
          operator: "",
          oddSignalData: [
            {
              value: "0"
            },
            {
              value: "0"
            },
            {
              value: "0"
            }
          ]
        }
      ]
    };
  },
  components: {
    filterInputs,
    VueSlider
  },
  watch: {
    sound(val) {
      switch (val) {
        case 1:
          this.soundLink = "/Audio/Signal-Sounds/Alert-1.mp3";
          break;
        case 2:
          this.soundLink = "/Audio/Signal-Sounds/Alert-2.mp3";
          break;
        case 3:
          this.soundLink = "/Audio/Signal-Sounds/Alert-3.mp3";
          break;
        case 4:
          this.soundLink = "/Audio/Signal-Sounds/Alert-4.mp3";
          break;
        case 5:
          this.soundLink = "/Audio/Signal-Sounds/Alert-5.mp3";
          break;
      }
      var sound = new Howl({
        src: [this.soundLink]
      });

      sound.play();
    },
    create(val) {
      switch (val) {
        case true:
          this.andText = "And +";
          this.saveText = "Next";
          break;
        case false:
          this.andText = "Back";
          this.saveText = "Finish";
      }
    }
  },

  methods: {
    next() {
      this.$validator.validate().then(valid => {
        if (!valid) {
          this.$notify({
            title: "Error.",
            text: "Must fill out everything before continuing!",
            type: "error",
            timeout: 3000,
            group: "Main"
          });
        } else {
          this.step++;
        }
      });
    },
    back() {
      this.step = this.step - 1;
    },

    removeForm(index) {
      this.filters.splice(index, 1);
    },
    resetState() {
      (this.saveText = "Next"),
        (this.andText = "And +"),
        (this.filters = [
          {
            currentlySelectedFilterValue: "",
            watchOn: "",
            value: {
              home: "",
              away: "",
              singular: ""
            },
            operator: "",

            oddSignalData: [
              {
                value: ""
              },
              {
                value: ""
              },
              {
                value: ""
              }
            ]
          }
        ]);
    },
    addFilterForm(curr_index) {
      this.$validator.validate().then(valid => {
        if (!valid) {
          this.$notify({
            title: "Error.",
            text: "Must fill out everything before continuing!",
            type: "error",
            timeout: 3000,
            group: "Main"
          });
          return;
        }

        this.filters.push({
          applyTo: "",
          currentlySelectedFilterValue: "",
          watchOn: "",
          value: {
            home: "0",
            away: "0",
            singular: "0"
          },
          operator: "",
          oddSignalData: [
            {
              value: "0"
            },
            {
              value: "0"
            },
            {
              value: "0"
            }
          ]
        });
      });
    },
    addFilter(name) {
      switch (this.mode) {
        case "filter":
          this.$validator.validate().then(valid => {
            if (!valid) {
              this.$notify({
                title: "Error.",
                text: "Cant add filter unitl you fill out all fields!",
                type: "error",
                timeout: 3000,
                group: "Main"
              });
              return;
            } else {
              var payload = {
                filter: {
                  name: name,
                  filters: this.filters
                },
                _id: this.returnUser._id
              };
              this.$io.emit("addFilter", payload);
              this.$modal.hide("Create");
              this.resetState();
            }
          });
          break;
        case "signal":
          this.$validator.validate().then(valid => {
            if (!valid) {
              this.$notify({
                title: "Error.",
                text: "Cant add signal unitl you fill out all fields!",
                type: "error",
                timeout: 3000,
                group: "Main"
              });
              return;
            } else {
              var payload = {
                signal: {
                  name: name,
                  filters: this.filters,
                  matchesToWatch: [],
                  sound: this.sound
                },
                _id: this.returnUser._id
              };
              this.$io.emit("addSignal", payload);
              this.$store.commit(
                "updateSelectedSignal",
                this.$store.getters.returnUser.appData.signals[0]
              );
              this.$modal.hide("Create");
              this.resetState();
            }
          });
          break;
      }
    }
  }
};
</script>

<style>
#filterNavAnd {
  grid-area: back;
}

#filterNavNext {
  grid-area: next;
}

#filterNavBack {
  grid-area: back;
}

.filter-form {
  font-family: "proxima_nova_altbold" !important;
  font-size: 13px !important;
  text-transform: uppercase;
  display: grid;
  grid-template-areas: "filter filter" "back next";
}
#itemContainer {
  grid-area: filter;
  margin-bottom: 30px;
}
.vs__actions {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 4px 6px 0 3px;
}
.itemGrid {
  display: grid;
  grid-template-rows: 1fr;
  position: relative;
  grid-auto-columns: 25%;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  -ms-flex-line-pack: center;
  align-content: center;
  /* -webkit-box-align: center; */
  -ms-flex-align: center;
  justify-content: center;
  align-items: center;
}
.vs__dropdown-toggle,
.vs__selected-options {
  display: -webkit-box !important;

  /* display: grid; */
}
.butYellow {
  font-size: 10px !important;
  padding: 0px !important;
  background-color: #ffd41e !important;
  color: black !important;
  width: 20%;
  /* height: 0%; */
  border-top: none !important;
}

.shadow {
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 5px 5px 9px #e6e6e6;
}

.vs__selected-options {
  flex-wrap: nowrap !important;
}

.hoverGrey:hover {
  color: grey;
}

#soundWrap {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "label options";
}

.soundIcons {
  grid-area: icons;
  justify-self: left;
  align-self: center;
}

.soundLabel {
  grid-area: label;
}

.home_away_select {
  grid-area: option;
}

#Name_Form > div > div > div:nth-child(2) > select {
  width: 30%;
  margin-right: 30px;
}

.fs-select-out {
  width: 100% !important;
}

#two {
  justify-self: center;
}

.home_away_select {
  width: 100% !important;
}

.fade1-enter-active,
.fade1-leave-active {
  transition: opacity 200ms !important;
}

.fade1-enter,
.fade1-leave-to

/* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0 !important;
}

.filter {
  margin: 30px;
}

label.special {
  width: 100% !important;
}

.home_away_select {
  width: 30px;
  display: flex;
}

.toggle input + label {
  width: 160px;
}

@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600");
/* VARS */
/* MIXINS */
/* STYLE THE HTML ELEMENTS (INCLUDES RESETS FOR THE DEFAULT FIELDSET AND LEGEND STYLES) */

.home_away_select {
  margin: 0;

  box-sizing: border-box;
  box-shadow: none;
  border: none;
  background-color: transparent;
  height: 40px;
  min-width: 0;
}

.counter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: "proxima_nova_altbold";
  font-size: 13px;
  text-transform: uppercase;
  text-align: center;

  margin: 0;
}

.home_away_select:hover {
  cursor: pointer;
}

.home_away_select legend {
  padding: 0;
  width: 100%;
  float: left;
  display: table;
  font-size: 1.5rem;
  line-height: 140%;
  font-weight: 600;
  color: #333;
}

.home_away_select legend + * {
  clear: both;
}

.soundOption {
  grid-area: options;
}

button.audioPlay {
  display: grid;
  margin-top: 4px;
}

#signalNameLabel {
  text-align: center;
}

body:not(:-moz-handler-blocked) fieldset {
  display: table-cell;
}

/* TOGGLE STYLING */
.toggle {
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
}

.toggle input {
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
}

.toggle input + label {
  margin: 0;
  padding: 0.5rem 2rem;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  border: solid 1px #ddd;
  background-color: #fff;
  white-space: nowrap;
  font-size: 1rem;
  line-height: 140%;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  transition: border-color 0.15s ease-out, color 0.25s ease-out,
    background-color 0.15s ease-out, box-shadow 0.15s ease-out;
  /* ADD THESE PROPERTIES TO SWITCH FROM AUTO WIDTH TO FULL WIDTH */
  /*flex: 0 0 50%; display: flex; justify-content: center; align-items: center;*/
  /* ----- */
}

.toggle input + label:not(:first-child):not(:last-child) {
  border-right: none;
}

.toggle input + label:first-of-type {
  border-radius: 6px 0 0 6px;
  border-right: none;
}

.toggle input + label:last-of-type {
  border-radius: 0 6px 6px 0;
  border-left: solid 1px #ddd !important;
}

.toggle input:hover + label {
  cursor: pointer;
}

.toggle input:checked + label {
  background-color: #ffd41f;
  color: black;

  z-index: 1;
}

.toggle input:focus + label {
}

@media (max-width: 800px) {
  .toggle input + label {
    padding: 0.75rem 0.25rem;
    flex: 0 0 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

input#score-home {
  width: 22%;
  margin-right: 20px;
}

input#score-away {
  width: 22%;
}

#slideTime {
  border: 1px solid #c1c1c1a8;
  padding: 15px;
  border-radius: 4px;
}

.headerDivider {
  border-left: 1px solid #38546d;
  /* border-right: 1px solid #16222c; */
  height: 100%;
  position: relative;
  margin: 0 auto;
  /* right: 249px; */
  /* top: 10px; */
}

.headerDivider {
  border-left: 3px solid #3a3a3a;
  /* border-right: 1px solid #16222c; */
  height: 80%;
  position: relative;
  /* right: 249px; */
  /* top: 10px; */
}

.vue-slider {
  /* min-height: 24px; */
  padding: 10px 0px !important;
}

span#sliderValue {
  min-height: 28px;
}

#noDataSpan {
  color: white;
  text-align: center;
  align-self: end;
}

.valid {
  border: 2px solid #24d364 !important;
}

.invalid {
  border: 2px solid #d80000 !important;
}

#signalName {
  color: #292929;
  text-align: center;
  border-radius: 4px !important;
}

.filter-form2 {
  display: grid !important;

  grid-template-columns: 1fr;
}

.signalFinish2 {
  display: block;
}

.signalFinish {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "setting name" "sound name";
}

#nameWrap {
  grid-area: name;
  display: grid;
  justify-items: center;
}

#soundWrap {
  grid-area: sound;
}

#alertsSettings {
  grid-area: setting;
}

#nameWrap {
  grid-area: name;
  border-left: 3px solid black;
  margin: 0 10px;
  padding: 10px;
}
</style>
