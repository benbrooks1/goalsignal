<template>
  <div class="createModal">
    <p class="modalHeader header">Add To</p>
    <font-awesome-icon
      @click="$emit('close')"
      size="lg"
      class="pointer closeCon modal_Close_White"
      icon="times"
    />

    <div class="add-to-form">
      <div class="add-to-form-option">
        <div id="signalSelector">
          <div id="signalSelectorButton" class="btn formOption" @click="addToSignal()">
            Signal
            <span>
              <font-awesome-icon size="lg" class="pointer" icon="caret-down" />
            </span>
          </div>
          <div v-if="showSignalSelectMenu" id="signalOptionsWrapper" :name="`filter-select`">
            <span
              :key="signal.name"
              class="signalName"
              v-for="(signal, index) in returnUser.appData.signals"
              :value="index"
              @click="addToSignalMethod(index)"
            >{{signal.name}}</span>
          </div>
        </div>

        <button class="btn formOption" @click="addToShortlist()">Shortlist</button>
      </div>
      <div id="signalPicker"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},

  data() {
    return {
      selectedSignalIndex: 0,
      ui: {
        counts: {},
        display: {
          filterForm: false
        },
        displaySignalSelector: false
      },
      showSignalSelectMenu: false,
      toWhat: ""
    };
  },

  computed: {
    returnUser() {
      return this.$store.getters.returnUser;
      // console.log(this.$store.getters.returnUser);
    },

    returnSelectedMatches() {
      return this.$store.getters.returnSelectedMatches;
    }
  },
  props: {},
  methods: {
    addToX(id) {
      if (this.toWhat === "shortlist") {
        this.$io.emit("addToShortlist", {
          matches: this.returnSelectedMatches,
          _id: this.returnUser._id
        });
      } else if (this.toWhat === "signal") {
        var payload = {
          matches: this.returnSelectedMatches,
          signal: this.returnUser.appData.signals[this.selectedSignalIndex]
            .name,
          _id: this.returnUser._id
        };

        this.$io.emit("addMatch(s)ToSignal", payload);
      }
      this.$store.commit("resetSelectedMatchesState");
      this.$emit("close");
    },
    addToShortlist() {
      this.toWhat = "shortlist";
      this.addToX();
    },
    addToSignal() {
      this.showSignalSelectMenu = !this.showSignalSelectMenu;
    },
    addToSignalMethod(signalIndex) {
      this.toWhat = "signal";
      this.selectedSignalIndex = signalIndex;
      this.addToX();
    }
  }
};
</script>

<style>
div#signalOptionsWrapper {
  cursor: pointer;

  width: 150px;
  max-height: 150px;
  position: absolute;
  overflow: auto;

  font-size: 11px;
  background: whitesmoke;
  font-family: "proxima_nova_altbold";
  text-transform: uppercase;
}

#signalSelectorButton {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 80% 20%;
  border-radius: 0;
}
select:not([multiple]) {
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0.5em;
  padding-right: 1.5em;
}
span.signalName {
  display: grid;
  width: 100%;
  padding: 10px;
  padding-left: 10px;
}
.signalName:hover {
  background: #333;
  color: white;
}
.add-to-form {
  margin-top: 10px;
  margin: 40px;
}
.add-to-form-option {
  display: grid !important;
  grid-template-columns: 50% 50%;
  -ms-flex-pack: center;
  justify-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
}

.pretty {
  margin-right: 0 !important;
}
.pretty.p-icon .state .icon {
  height: 13px !important;
}
.notifications {
  display: block;
  position: fixed;
  z-index: 9999 !important;
  margin-top: 10px;
}
.filter {
  margin: 30px;
}

.home_away_select {
  width: 30px;
  display: flex;
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
.formOption {
  font-family: "proxima_nova_altbold";
  font-size: 13px;
  width: 150px;
  background: #ffd51f;
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

.toggle input + label:first-of-type {
  border-radius: 6px 0 0 6px;
  border-right: none;
}

.toggle input + label:last-of-type {
  border-radius: 0 6px 6px 0;
  border-left: none;
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
</style>
