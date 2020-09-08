<template>
 
    <div id="topMenuContainer">
      <div id="Top-Menu-2" :style="{'gridTemplateColumns': '1fr '}">
        <span v-if="returnRoute === '/scanner/all'">All Matches</span>
        <span v-if="returnRoute === '/scanner/live'">
          <span v-if="returnSelectedFilter" id="selectedFilterName">
            <span>{{returnSelectedFilter.name}}</span>
              
          </span>
        </span>
        <span v-if="returnRoute === '/scanner/upcoming'">Upcoming Matches</span>
        <span v-if="returnRoute === '/scanner/finished'">Finished Matches</span>
        <span v-if="returnRoute === '/signals'">Signals</span>
        <span v-if="returnRoute === '/scanner/shortlist'">Shortlist</span>
      </div>
      <div id="Top-Menu-3" class="top-bar-destop" v-if="this.render" :style="{width: windowWidth + 'px'}">
        <span>Match Flow (Last 10 Minutes) </span> 
      </div>
      <!-- <div>
        <span v-if="returnRoute === '/scanner/upcoming'">Upcoming Matches</span>
        <span v-if="returnRoute === '/scanner/finished'">Finished Matches</span>
        <span v-if="returnRoute === '/signals'">Signals</span>
        <span v-if="returnRoute === '/scanner/shortlist'">Shortlist</span>
      </div> -->
      
    </div>
 
</template>

<style>
span#selectedFilterName {
  color: #ffd51f;
}
.ui.search.dropdown > input.search {
  position: absolute;
  z-index: 4000;
}
.ui.selection.dropdown[data-v-3a0c7bea] {
  font-size: 12px;
}
.league_checkbox {
  padding-right: 35px;
  /* padding-left: 10px; */
  /* font-size: initial; */
  margin-left: 3px;
  border-right: 2px solid white;
}

div#SpOdds {
  /* min-width: 100%; */
  display: grid;
  grid-auto-columns: 1fr;
}
#big_table_head > div#SpOdds {
    grid-auto-columns: 1fr;
    padding-top: 0px;
}
div#Top-Menu-3 {
  height: 28px;
  position: fixed;
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  top: 52px;
  right: 0;
  border-top: 3px solid #686868;
  z-index: 99999;
  background: #2f2f2f;
  font-family: proxima_nova_altbold;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ff0909+0,000000+100 */
  background: rgb(255,9,9); /* Old browsers */
  background: -moz-linear-gradient(top,  rgba(255,9,9,1) 0%, rgba(0,0,0,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(255,9,9,1) 0%,rgba(0,0,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(255,9,9,1) 0%,rgba(0,0,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0909', endColorstr='#000000',GradientType=0 ); /* IE6-9 */

}
.closeCon {
  top: 4%;
  right: 7%;
  position: absolute;
}

.pb_Heading_Text {
  grid-area: heading;
  color: white;
  margin: 0 auto;
  margin-right: 0px;
  padding: 10px;
}

.activeItem {
  background-color: #1fd466 !important;
}
.activeItem2 {
  background-color: #d47b1f !important;
}
.Top-Menu {
  min-height: 36px;
  background-color: #676869;
  display: grid;
  grid-auto-rows: 30px;
  grid-template-columns: 1fr;

  z-index: 10000;

  cursor: pointer;
}

.Top-Menu > button {
  background-color: #4a4a4a;
  border: none;
  outline: none;
  font-family: "proxima_nova_altbold";
  font-size: 12px;
  color: white;
  text-transform: uppercase;
}

.table-heading-images th.press-gauge {
  width: 76px;
  background-color: #3a3a3a;
  color: white;
}

.heading-data {
  font-size: 11px;
  color: white;
}

#Top-Menu > button {
  background-color: #4a4a4a;
  border: none;
  outline: none;
  font-family: "proxima_nova_altbold";
  font-size: 12px;
  color: white;
  padding-left: 20px;

  border-left: 2px solid #949292;
  text-align: unset;
  text-transform: uppercase;
}

#th1 {
}

.sererate-section {
  background-color: #aaadb2 !important;
  z-index: 9999 !important;

  background-color: #4a4a4a !important;
  color: white !important;
  background: rgb(255,9,9);
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(255,9,9,1)),to(rgba(196,6,6,1)));
    background: linear-gradient(to bottom, rgba(255,9,9,1) 0%,rgba(196,6,6,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0909', endColorstr='#c40606',GradientType=0 );
}

th.heading-data.sererate-section > .text {
  color: white;
}

.match-flow {
  font-family: "proxima_nova_altbold";
  font-size: 12px !important;
  text-transform: uppercase;
  width: 30%;
  text-align: center;
  position: fixed;
  padding-top: 10px;
  padding-bottom: 10px;
  top: 55px !important;
  right: 0 !important;
}

#table_wrap {
  background: #242522;
  overflow-y: scroll;
}

.stat-table .selected-team {
  color: white;
  background-color: #6f6f6f;
  min-height: 90px !important;
  height: 30px;
}

.float {
  float: right;
  margin-right: 20px;
}

.match-flow {
  font-family: "proxima_nova_altbold";
  font-size: 15px;
  text-transform: uppercase;
  width: 30%;
  text-align: center;
  position: fixed;
  padding-top: 10px;
  top: 55px !important;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slide2-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide2-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide2-enter-to,
.slide2-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide2-enter,
.slide2-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>

<script>
import { ModelSelect } from "vue-search-select";
export default {
  props: {
    signalMode: Boolean,
    signalHeader: String,
    mode: String
  },
  components: {
    ModelSelect
  },
  data() {
    return {
      render: true,
      options: [
        { value: "1", text: "aa" + " - " + "1" },
        { value: "2", text: "ab" + " - " + "2" },
        { value: "3", text: "bc" + " - " + "3" },
        { value: "4", text: "cd" + " - " + "4" },
        { value: "5", text: "de" + " - " + "5" }
      ],
      item: {
        value: "",
        text: ""
      },

      width: 0,
      height: 0,
      x: 0,
      y: 0,
      windowWidth: 0,
      windowWidthA: 0,
      windowWidthC: 0,
      activeMatchFlow: 1
    };
  },
  computed: {
    returnSelectedFilter() {
      function isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) return false;
        }
        return true;
      }
      if (isEmpty(this.$store.getters.returnSelectedFilter)) {
        return false;
      } else {
        return this.$store.getters.returnSelectedFilter;
      }
    },
    returnRoute() {
      return this.$router.app._route.path;
    },
    returnLoading() {
      return this.$store.state.$Ui.ui.isLoading;
    }
  },
  mounted() {
    setTimeout(()=>{})
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
    document.querySelector("body").addEventListener(
      "DOMNodeInserted",
      event => {
        if (event.target.id == "big_table_head") {
          this.getWindowWidth();
        }
      },
      false
    );
  },
  watch: {
    activeMatchFlow(val) {
      this.$store.commit("updateActiveMatchFlow", val);
    },
    returnRoute(val) {
      this.getWindowWidth();
    }
  },
  methods: {
    getWindowWidth() {
      if (this.mode == "upcoming") {
        if (
          document.getElementById("Time").clientWidth &&
          document.getElementById("SpOdds").clientWidth &&
          document.getElementById("Match").clientWidth
        ) {
          this.render = true;
          this.windowWidthC =
            document.getElementById("Time").clientWidth +
            document.getElementById("SpOdds").clientWidth +
            document.getElementById("Match").clientWidth;
        } else {
          this.render = false;
        }
      } else {
        if (
          (this.windowWidth =
            document.getElementsByClassName("th2")[1] &&
            document.getElementById("th5")) && (document.getElementsByClassName("mobileMatchFlow")[1])
        ) {
          this.windowWidth =
            document.getElementsByClassName("th2")[1].clientWidth +
            document.getElementsByClassName("th3")[1].clientWidth +
            document.getElementsByClassName("th4")[1].clientWidth +
            document.getElementsByClassName("th5")[1].clientWidth + 20;
           
          this.windowWidthA =
            document.getElementsByClassName("mobileMatchFlow")[1].clientWidth -
            this.windowWidth;
          this.render = true;
        } else {
          this.render = false;
        }
      }
    },
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  }
};
</script>
