<template>
  <div class="filter">
    <div class="greenMark" style="text-align: center;" v-if="step == 3">
        <div> <img style="max-height: 200px;max-width: 200px;" src="./../../../Assets/Images/Logos/kissclipart-done-png-clipart-computer-icons-clip-art-6bac8731652937c5.png"/>  </div>
        <div v-if="this.editMode"> Filter is edited successfully  </div>
        <div v-else> Filter is created successfully  </div>
      </div>
    <form class="filter-form"  v-if="step != 3">
      <div class="showMeMatches" v-if="step == 1">Show me matches where</div>
      

      <div id="itemContainer" style="display: block!important" class>
        <!-- Edit Mode -->
        <template v-if="editMode !== false">
          <div v-if="step === 1" v-for="(elems, i) in $store.state.$Ui.filterInEdit.filters">
            <div style="position:relative;">
              <button
                class="delete-button"
                v-if="
                  filters.length +
                    $store.state.$Ui.filterInEdit.filters.length >
                    1
                "
                @click="removeForm(i)"
              >X</button>
              <div
                id="Logic_Input"
                v-if="step === 1"
                v-for="(filter, index) in elems"
                :key="index"
                :class="{
                  itemGrid_Time_Is:
                    filter.currentlySelectedFilterValue.text ==
                    'Match Status Is',
                  itemGrid: true
                }"
              >
                <span v-if="index > 0" class="delete">
                  <font-awesome-icon
                    size="lg"
                    @click="removeField(index,i)"
                    class="pointer"
                    icon="times"
                  />
                </span>

                <div class="Container">
                  <div id="signalSelector">
                    <div
                      id="signalSelectorButton"
                      class="btn forfont-size: 10px;mOption"
                      @click="toggleFilterOptions(filter)"
                    >
                      <span v-if="filter.currentlySelectedFilterValue.text">
                        {{
                        filter.currentlySelectedFilterValue.text
                        }}
                      </span>
                      <span v-else>Choose Filter</span>
                      <span>
                        <font-awesome-icon
                          size="lg"
                          v-if="!filter.showFilterOptions"
                          class="pointer"
                          icon="caret-down"
                        />
                        <font-awesome-icon size="lg" v-else class="pointer" icon="caret-up" />
                      </span>
                    </div>
                    <div
                      v-if="filter.showFilterOptions"
                      id="signalOptionsWrapper2"
                      :name="`filter-select`"
                    >
                      <span
                        :key="option.text"
                        class="signalName"
                        @click="customCommand(filter, option)"
                        v-for="option in options"
                      >{{ option.text }}</span>
                    </div>
                  </div>
                </div>

                <div
                  v-if="
                    filter.currentlySelectedFilterValue.text !==
                      'Match Status Is'
                  "
                  id="th"
                  class="Container"
                >
          
                  <filter-inputs
                    :filter="filter"
                    :selectedFilter="
                      filter.currentlySelectedFilterValue.text.toUpperCase()
                    "
                    :applyTo="filter.applyTo"
                    :index="index"
                  />
                  
                </div>
                  
                <div
                  v-if="
                    filter.currentlySelectedFilterValue.text &&
                      shouldShowValueCriteria(
                        filter.currentlySelectedFilterValue.text.toUpperCase()
                      )
                  "
                  class="Container"
                >
                  <div id="More-Less-Exactly">
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].VALUE_CRITERIA.OPTIONS.OR_MORE.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.operator === 'more' }"
                      @click="filter.operator = 'more'"
                      class="Or_More"
                    >Or More</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].VALUE_CRITERIA.OPTIONS.OR_LESS.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.operator === 'less' }"
                      @click="filter.operator = 'less'"
                      class="Or_Less"
                    >Or Less</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].VALUE_CRITERIA.OPTIONS.EXACTLY.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.operator === 'exact' }"
                      @click="filter.operator = 'exact'"
                      class="Exactly"
                    >Exactly</div>
                  </div>
                </div>

                <div
                  v-if="
                    filter.currentlySelectedFilterValue.text &&
                      shouldShowMatchStatus(
                        filter.currentlySelectedFilterValue.text.toUpperCase()
                      )
                  "
                  class="Container"
                >
                  <div id="More-Less-Exactly2">
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.FIRST_HALF.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'first-half'
                      }"
                      @click="filter.applyTo = 'first-half'"
                      class="first-half home"
                    >First Half</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.HALF_TIME.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'half-time'
                      }"
                      @click="filter.applyTo = 'half-time'"
                      class="half-time home"
                    >Half Time</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.SECOND_HALF.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'second-half'
                      }"
                      @click="filter.applyTo = 'second-half'"
                      class="second-half home"
                    >Second Half</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.EXTRA_TIME.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'extra-time'
                      }"
                      @click="filter.applyTo = 'extra-time'"
                      class="extra-time home"
                    >Extra Time</div>
                  </div>
                </div>
                <div class="Container">
                  <div
                    id="More-Less-Exactly2"
                    v-if="
                      filter.currentlySelectedFilterValue.text &&
                        shouldShowForCriteria(
                          filter.currentlySelectedFilterValue.text.toUpperCase()
                        )
                    "
                  >
                    <!-- <span class="forThe" v-if="
                      filter.currentlySelectedFilterValue.text &&
                        shouldShowForCriteria(
                          filter.currentlySelectedFilterValue.text.toUpperCase()
                        )
                    ">For The:</span> -->
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.HOME.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.applyTo === 'local' }"
                      @click="filter.applyTo = 'local'"
                      class="home"
                    >Home</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.AWAY.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.applyTo === 'visitor' }"
                      @click="filter.applyTo = 'visitor'"
                      class="away"
                    >Away</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.OVERALL.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.applyTo === 'Match' }"
                      @click="filter.applyTo = 'match'"
                      class="away"
                    >{{filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.OVERALL.TEXT}}</div>
                  </div>
                </div>
              </div>
            </div>
            <p
              v-if="
                
                  i <
                    $store.state.$Ui.filterInEdit.filters.length +
                      filters.length -
                      1
              "
              class="conditional-or-text"
            >_____________ OR _____________</p>
          </div>
        </template>
        <template>
          <div v-if="step === 1" v-for="(elems, i) in filters">
            <div style="position:relative;">
              <button
                class="delete-button"
                v-if="
                  (editMode == false && filters.length > 1) ||
                    (editMode != false &&
                      filters.length +
                        $store.state.$Ui.filterInEdit.filters.length >
                        1)
                "
                @click="removeForm(i)"
              >X</button>
              <div
                id="Logic_Input"
                v-for="(filter, index) in elems"
                :key="index"
                :class="{
                  itemGrid_Time_Is:
                    filter.currentlySelectedFilterValue.text ==
                    'Match Status Is',
                  itemGrid: true
                }"
                v-if="step === 1"
              >
                <span v-if="index > 0" class="delete">
                  <font-awesome-icon
                    size="lg"
                    @click="removeField(index, i)"
                    class="pointer"
                    icon="times"
                  />
                </span>

                <div class="Container">
                  <div id="signalSelector">
                    <div
                      id="signalSelectorButton"
                      class="btn forfont-size: 10px;mOption"
                      @click="toggleFilterOptions(filter)"
                    >
                      <span
                        v-if="filter.currentlySelectedFilterValue.text"
                      >{{ filter.currentlySelectedFilterValue.text }}</span>
                      <span v-else>Choose Filter</span>
                      <span>
                        <font-awesome-icon
                          size="lg"
                          v-if="!filter.showFilterOptions"
                          class="pointer"
                          icon="caret-down"
                        />
                        <font-awesome-icon size="lg" v-else class="pointer" icon="caret-up" />
                      </span>
                    </div>
                    <div
                      v-if="filter.showFilterOptions"
                      id="signalOptionsWrapper2"
                      :name="`filter-select`"
                    >
                      <span
                        :key="option.text"
                        class="signalName"
                        @click="customCommand(filter, option)"
                        v-for="option in options"
                      >{{ option.text }}</span>
                    </div>
                  </div>
                </div>

                <div
                  v-if="
                    filter.currentlySelectedFilterValue.text !==
                      'Match Status Is'
                  "
                  id="th"
                  class="Container"
                >
                  <span v-if="filter.currentlySelectedFilterValue.text">
                    <filter-inputs
                      :filter="filter"
                      :selectedFilter="
                        filter.currentlySelectedFilterValue.text.toUpperCase()
                      "
                      :applyTo="filter.applyTo"
                      :index="index"
                    />
                  </span>
                </div>
               
                <div
                  v-if="
                    filter.currentlySelectedFilterValue.text &&
                      shouldShowValueCriteria(
                        filter.currentlySelectedFilterValue.text.toUpperCase()
                      )
                  "
                  class="Container"
                >
                
                  <div id="More-Less-Exactly">
                    <div
                      :class="{ activeOperator: filter.operator === 'more' }"
                      @click="filter.operator = 'more'"
                      class="Or_More"
                    >Or More</div>
                    <div
                      :class="{ activeOperator: filter.operator === 'less' }"
                      @click="filter.operator = 'less'"
                      class="Or_Less"
                    >Or Less</div>
                    <div
                      :class="{ activeOperator: filter.operator === 'exact' }"
                      @click="filter.operator = 'exact'"
                      class="Exactly"
                    >Exactly</div>
                  </div>
                </div>
                <div
                  v-if="
                    filter.currentlySelectedFilterValue.text &&
                      shouldShowForCriteria(
                        filter.currentlySelectedFilterValue.text.toUpperCase()
                      )
                  "
                  class="Container"
                >
                  <div id="More-Less-Exactly2">
                    
                    <span v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.HOME.IS_ENABLED
                      " class="forThe">For The:</span>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.HOME.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.applyTo === 'local' }"
                      @click="filter.applyTo = 'local'"
                      class="home1"
                    >Home</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.AWAY.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.applyTo === 'visitor' }"
                      @click="filter.applyTo = 'visitor'"
                      class="home"
                    >Away</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.OVERALL.IS_ENABLED
                      "
                      :class="{ activeOperator: filter.applyTo === 'Match' }"
                      @click="filter.applyTo = 'Match'"
                      class="away"
                    >
                      <span>{{filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].FOR_CRITERIA.OPTIONS.OVERALL.TEXT}}</span>
                    </div>
                  </div>
                </div>
                <div class="Container">
                  <div
                    v-if="
                      filter.currentlySelectedFilterValue.text &&
                        shouldShowMatchStatus(
                          filter.currentlySelectedFilterValue.text.toUpperCase()
                        )
                    "
                    id="More-Less-Exactly2"
                  >
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.FIRST_HALF.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'first-half'
                      }"
                      @click="filter.applyTo = 'first-half'"
                      class="first-half home"
                    >First Half</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.HALF_TIME.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'half-time'
                      }"
                      @click="filter.applyTo = 'half-time'"
                      class="half-time home"
                    >Half Time</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.SECOND_HALF.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'second-half'
                      }"
                      @click="filter.applyTo = 'second-half'"
                      class="second-half home"
                    >Second Half</div>
                    <div
                      v-if="
                        filter.currentlySelectedFilterValue.text &&
                          filterOptions[
                            filter.currentlySelectedFilterValue.text.toUpperCase()
                          ].MATCH_STATUS.OPTIONS.EXTRA_TIME.IS_ENABLED
                      "
                      :class="{
                        activeOperator: filter.applyTo === 'extra-time'
                      }"
                      @click="filter.applyTo = 'extra-time'"
                      class="extra-time home"
                    >Extra Time</div>
                  </div>
                </div>
              </div>
            </div>
            <p
              v-if="i < filters.length - 1"
              class="conditional-or-text"
            >_____________ OR _____________</p>
          </div>
        </template>
        <button
          type="button"
          :disabled="filterRelationship != 0"
          v-if="step == 1"
          id="filterNavAnd"
          @click="addFilterForm(2)"
          class="btn butYellow"
        >
          <font-awesome-icon class="pointer" icon="plus" />And
        </button>
        <button
          type="button"
          :disabled="filterRelationship != 0"
          v-if="step == 1"
          id="filterNavOr"
          @click="addFilterForm(1)"
          class="btn butYellow"
        >
          <font-awesome-icon class="pointer" icon="plus" />OR
        </button>
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
            <label v-else id="signalNameLabel">Name this filter</label>
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
        id="filterClearForm"
        @click="resetState"
        class="btn btn-green btn-clear-form"
      >
        <font-awesome-icon class="pointer" icon="trash" />Clear
      </button>
      <button
        type="button"
        v-if="step !== 2"
        id="filterNavNext"
        @click="next"
        class="btn btn-green"
      >
        <span class="nav-text" v-if="mode !== 'filter'">Next</span>
        <span class="nav-text" v-if="mode == 'filter'">Save as</span>
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
import FilterConfig from "./../../../Constants/filter-config";
import filterInputs from "./../Create-Signals-Filters/components/filterInputs";
import Constants from "../../../Constants";
export default {
  props: {
    mode: String,
    editMode: Boolean
  },
  computed: {
    returnUser() {
      return this.$store.getters.returnUser;
      // console.log(this.$store.getters.returnUser);
    }
  },
  data() {
    return {
      filterOptions: FilterConfig.FILTER,
      filterRelationship: this.editMode
        ? this.$store.state.$Ui.filterInEdit.relationship
        : 0,
      showFilterOptions: false,
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
          value: "status-div",
          text: "Match Status Is"
        },
        {
          value: "total-div",
          text: "Total Goals Are"
        },
        {
          value: "live-div",
          text: "Live Odds Are"
        },
        {
          value: "sp-div",
          text: "SP Odds Are"
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
        [
          {
            applyTo: null,
            currentlySelectedFilterValue: {
              text: ""
            },
            watchOn: "",
            value: {
              home: null,
              away: null,
              singular: null
            },
            showFilterOptions: false,
            operator: "",
            oddSignalData: [
              {
                value: null
              },
              {
                value: null
              },
              {
                value: null
              }
            ]
          }
        ]
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
    shouldShowMatchStatus(filterName) {
      if (
        this.filterOptions[filterName] &&
        this.filterOptions[filterName]["MATCH_STATUS"]
      ) {
        return this.filterOptions[filterName]["MATCH_STATUS"]["IS_ENABLED"];
      }
      return false;
    },
    shouldShowForCriteria(filterName) {
      if (
        this.filterOptions[filterName] &&
        this.filterOptions[filterName]["FOR_CRITERIA"]
      ) {
        try {
          return this.filterOptions[filterName]["FOR_CRITERIA"]["IS_ENABLED"];
        } catch (err) {
          // console.log(err);
        }
      }
      return false;
    },
    shouldShowValueCriteria(filterName) {
      // console.log( this.filterOptions[filterName] &&
        // this.filterOptions[filterName]["VALUE_CRITERIA"]);
        // console.log(this.filterOptions[filterName],filterName,"FILTER NAME",this.filterOptions[filterName]["VALUE_CRITERIA"]);
      if (
        this.filterOptions[filterName] &&
        this.filterOptions[filterName]["VALUE_CRITERIA"]
      ) {
        // console.log(this.filterOptions[filterName]);
        // console.log(this.filterOptions[filterName]["VALUE_CRITERIA"]["IS_ENABLED"]);
        return this.filterOptions[filterName]["VALUE_CRITERIA"]["IS_ENABLED"];
      }
      return false;
    },
    customCommand(filter, option) {
      filter.currentlySelectedFilterValue.text = option.text;
      this.toggleFilterOptions(filter);
    },
    toggleFilterOptions(filter) {
     
      filter.value.singular = null;
      filter.showFilterOptions = !filter.showFilterOptions;
    },
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
      this.filterRelationship = 0;
      if (
        !this.editMode ||
        index >= this.$store.state.$Ui.filterInEdit.filters.length
      ) {
        this.filters.splice(index, 1);
        return false;
      } else {
        this.$store.state.$Ui.filterInEdit.filters.splice(index, 1);
        return false;
      }

      // this.$forceUpdate();
    },
    removeField(index, filter) {
      if (
        !this.editMode ||
        filter >= this.$store.state.$Ui.filterInEdit.filters.length
      ) {
        this.filters[filter].splice(index, 1);
      } else {
        this.$store.state.$Ui.filterInEdit.filters[filter].splice(index, 1);
      }
    },
    resetState() {
      ((this.$store.state.$Ui.filterInEdit = []),
      (this.filterRelationship = 0)),
        (this.saveText = "Next"),
        (this.andText = "And +"),
        (this.filters = [
          [
            {
              currentlySelectedFilterValue: {
                text: null
              },
              watchOn: "",
              value: {
                home: "",
                away: "",
                singular: ""
              },
              operator: "",
              showFilterOptions: false,
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
          ]
        ]);
      this.$forceUpdate();
    },
    addFilterForm(type) {
      // this.filterRelationship = type;
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
        let data = {
          applyTo: "",
          showFilterOptions: false,
          currentlySelectedFilterValue: {
            text: null
          },
          watchOn: "",
          value: {
            home: null,
            away: null,
            singular: null
          },
          operator: "",
          oddSignalData: [
            {
              value: null
            },
            {
              value: null
            },
            {
              value: null
            }
          ]
        };
        if (type == Constants.FILTER_RELATIONSHIP.OR) {
          this.filters.push([data]);
        } else if (type == Constants.FILTER_RELATIONSHIP.AND) {
          this.filters[this.filters.length - 1].push(data);
        }
        // this.filters.push({
        //   applyTo: "",
        //   showFilterOptions: false,
        //   currentlySelectedFilterValue: {
        //     text: null
        //   },
        //   watchOn: "",
        //   value: {
        //     home: null,
        //     away: null,
        //     singular: null
        //   },
        //   operator: "",
        //   oddSignalData: [
        //     {
        //       value: null
        //     },
        //     {
        //       value: null
        //     },
        //     {
        //       value: null
        //     }
        //   ]
        // });
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
              // let newFilters = this.$store.state.$Ui.filterInEdit.filters;
              let newFilters = this.editMode
                ? this.returnValidFilters(
                    this.$store.state.$Ui.filterInEdit.filters
                  )
                : [];
              newFilters.push(...this.returnValidFilters(this.filters));
              for(const newFilter of newFilters){
                for(const newFilterChild of newFilter){
                  if(newFilterChild.currentlySelectedFilterValue.text === "Score Is"){
                    newFilterChild.applyTo = 'match';
                  }
                }
              }
              //   // newFilters[0][0].applyTo = 'match';
              //   // newFilters[0][0].value.home = '0';
              //   // newFilters[0][0].value.away = '0';
              var payload = {
                filter: {
                  name: name,
                  relationship: this.filterRelationship,
                  filters: newFilters
                },
                _id: this.returnUser._id
              };
              // console.log("ADD FILTER",payload);
              
              this.$io.emit("addFilter", payload);
              if (this.editMode) {
                setTimeout(()=>{ this.$modal.hide("Edit_Filter"); },2000);
                // this.$modal.hide("Edit_Filter");
                this.step ++;
              } else {
                setTimeout(()=>{ this.$modal.hide("Create_Filter"); },2000);
                // 
                this.step ++;
              }

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
              this.$modal.hide("Create_Signal");
              this.resetState();
            }
          });
          break;
      }
      // this.$modal.hide("Create");
      // 
    },
    returnValidFilters(filters) {
      let output = [];
      if (filters) {
        filters.forEach(elems => {
          let result = elems.filter(
            data => data.currentlySelectedFilterValue.text
          );
          if (result.length) {
            output.push(result);
          }
        });
      }

      return output;
    }
  }
};
</script>

<style>
.conditional-or-text {
  text-align: center;
}

div#More-Less-Exactly2 > div {
  background: white;
  height: 28px;
  display: grid;
  vertical-align: sub;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-top: 2px solid #555;
  border-bottom: 2px solid #555;
}

.Container {
  position: relative;
}

span#or {
  font-size: 9px;
  position: absolute;
  left: -24px;
  top: 8px;
}

.forThe {
  padding-left: 3px;
  padding-right: 3px;
  /* border-left: 2px solid black; */
  font-size: 8px;
  position: absolute;
  top: -10px;
}

.away {
  border-right: 2px solid black;
}

.home {
  border-right: 2px solid black;
}

.home1 {
  border-left: 2px solid black;
  border-right: 2px solid black;
}

span.delete {
  position: absolute;
  left: 2%;
}

.activeOperator {
  background: #ffd61f !important;
  color: black;
  /* height: 140%; */
}

.Or_More,
.Or_Less,
.Exactly {
  background: white;
}

.Or_More {
}

#signalSelectorButton {
  align-self: self-start;
  display: grid;
  align-content: center;
  align-items: center;
  background-color: #ffd51f;
  grid-auto-flow: column;
  grid-template-columns: 100%;
  border-radius: 0;
  font-size: 10px;
  height: 28px;
  vertical-align: super;
  border: 2px solid #555555;
}

.itemGrid:nth-child(even) {
  border-top: 1px solid #585858;
  border-bottom: 1px solid #585858;
}

.itemGrid:last-of-type {
  border-bottom: 1px solid #585858;
}

#itemContainer {
  grid-area: filter;
  border: 2px solid;

  margin-bottom: 30px;
  overflow: auto;
}
#itemContainer .delete-button {
  border-radius: 50% !important;
  background: grey;
  color: white;
  font-weight: bold;
  border: 2px solid;
  float: right;
  position: absolute;
  /* right: 35px; */
  z-index: 2;
  margin-top: 4px;
  margin-right: 4px;
  right:0px;
}
.Or_Less {
  border-left: 2px solid #555555;
  border-right: 2px solid #555555;
}

.exactly {
}

div#More-Less-Exactly > div {
  height: 28px;
  padding: 0px 1px;
  width: auto;
  display: grid;
  align-items: center;
}

div#More-Less-Exactly {
  width: auto;
  display: grid;
  grid-auto-flow: column;

  text-align: center;
  border: 2px solid #555555;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  /* justify-self: center; */
  /* grid-column-gap: 1px; */
  cursor: pointer;
  grid-template-rows: 28px;
  font-size: 10px;
  /* justify-items: center; */
  justify-self: baseline;
}

div#More-Less-Exactly2 {
  display: grid;
  grid-template-rows: 28px;
  grid-auto-flow: column;
  text-align: center;

  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* justify-self: center; */

  /* grid-column-gap: 10px; */
  cursor: pointer;
  font-size: 10px;
  /* justify-items: center; */
  justify-self: baseline;
}

#filterNavAnd {
  grid-area: back;
}
#filterNavOr {
  margin-left: 10px;
}

#filterNavNext {
  grid-area: next;
  margin-left: 180px;
}
#filterNavNext .nav-text {
  margin-right: 5px;
}

#filterNavBack {
  grid-area: back;
}

.filter-form {
  font-family: "proxima_nova_altbold" !important;
  font-size: 13px !important;
  max-height: 400px;
  text-transform: uppercase;
  display: grid;
  grid-template-rows: 1fr 15fr 1fr;
  grid-template-areas: "showMe showme " "filter filter" "back next";
}

#itemContainer {
  grid-area: filter;
  margin-bottom: 30px;
}

.showMeMatches {
  grid-area: showMe;
}

.itemGrid {
  display: grid;
  grid-template-rows: 1fr;
  padding: 10px 50px;
  position: relative;
  /* grid-template-columns: 150px 90px 0.6fr 0.8fr; */
  /* grid-template-columns: 150px 120px 1fr 1fr; */
  grid-auto-columns: 150px 120px 150px 180px;
  grid-auto-flow: column;
  background: gainsboro;
  /* grid-column-gap: 4px; */
  -ms-flex-line-pack: center;
  align-content: center;
  font-size: 8px;
  /* -webkit-box-align: center; */
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  /* justify-items: center; */
  grid-column-gap: 30px;
  -webkit-box-align: center;
  align-items: center;
}

.itemGrid_Time_Is {
  grid-template-columns: 150px 1fr !important;
}
div#More-Less-Exactly2 > div:first-of-type {
  border-left: 2px solid #555;
}
.vs__dropdown-toggle,
.vs__selected-options {
  display: -webkit-box !important;

  /* display: grid; */
}
#filterClearForm {
  grid-area: back;
}

.butYellow {
  font-size: 10px !important;
  padding: 0px !important;
  background-color: #ffd41e !important;
  color: black !important;
  border-top: none !important;
  width: 15%;
  position: relative;
  left: 10px;
  top: 10px;
  float: left;
  height: 8%;
}
.btn-clear-form {
  width: 40%;
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

div#signalOptionsWrapper2 {
  cursor: pointer;
  overflow: auto;
  width: -webkit-fill-available;
  font-size: 11px;
  background: whitesmoke;
  font-family: "proxima_nova_altbold";
  cursor: pointer;
  max-height: 150px;
  border: 2px solid;
  border-top: none;
  z-index: 99999;
  position: absolute;
  font-size: 11px;
  background: whitesmoke;
  /* font-family: "proxima_nova_altbold"; */
  /* text-transform: uppercase; */
}

div#th {
  border-radius: 4px;
  display: grid;
  min-height: 100%;
  align-items: center;
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

  margin: 0 10px;
  padding: 10px;
  display: grid;
  align-self: center;
  border-radius: 0px;
}
</style>
