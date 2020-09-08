<template>
<div>
  <div id="Main_Layout_Mobile_View" v-responsive.sm.xs>
     <navbar-Mobile />
    <router-view />

  </div>

    <div id="Main_Layout" v-responsive.lg.xl>
    <navbar />
    <sidebar />
    <div ref="table_container" id="table_wrap">
      <top-table />
      <router-view />
    </div>
  </div>
</div>
</template>

<script>
const sidebar = () => import("../Components/Layout Components/Sidebar/Sidebar");
const navbar = () => import("./../Components/Layout Components/Navbar/Navbar");
const topTable = () => import("./../Components/Tables/Components/Top-Table");
const navbarMobile = () => import("./../Components/Tables/MobileView/Nav_bar")
export default {
  data() {
    return {
      hideLeagues: [],
      isLoading: false
    };
  },
  components: {
    navbar,
    sidebar,
    topTable,
    navbarMobile
  },
  computed: {
    returnLoggedInStatus() {
      return this.$store.getters.returnLoggedInStatus;
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    }
  },
  beforeMount() {},

  watch: {}
};
</script>

<style>
div#searchContainer {
  padding: 0 50px;
}
div#Top-Menu-2 {
  font-family: proxima_nova_altbold;
  font-size: 12px;
  line-height: 15px;
  position: -webkit-sticky;
  position: fixed;
  top: 55px;
  color: #fff;
  vertical-align: text-top;
  display: grid;
  -ms-flex-line-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-weight: 700;
  text-transform: uppercase;
  height: 25px;
  text-align: center;
  width: calc(100% - 250px);
  background-color: #3a3a3a;
  z-index: 9999;
  background: rgb(255,9,9);
  background: -moz-linear-gradient(top, rgba(255,9,9,1) 0%, rgba(196,6,6,1) 100%);
  background: -webkit-linear-gradient(top, rgba(255,9,9,1) 0%,rgba(196,6,6,1) 100%);
  background: linear-gradient(to bottom, rgba(255,9,9,1) 0%,rgba(196,6,6,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0909', endColorstr='#c40606',GradientType=0 );
}
.vld-overlay .vld-icon,
.vld-parent {
  position: relative;
  /* top: 40%;
    left: 12%; */
}

.proxima {
  font-family: "proxima_nova_altbold";
  font-size: 15px;
  line-height: 15px;
}

.table-data .largest-box-data img {
  width: 25px;
}

body
  > div
  > div.container-fluid
  > div
  > div
  > div
  > div
  > div
  > div.stats-data
  > div
  > table
  > tbody
  > tr
  > td
  > table
  > tr
  > td
  > svg {
  width: 25px;
  height: 25px;
  color: #aaadb2;
}
.text-red {
  color: red !important;
}
.text-green {
  color: #23d364 !important;
}

.live-odd-data,
.sp-odd-data {
  padding: 0px 0 3px 0px !important;
  font-weight: 700;
  white-space: inherit;
  flex-wrap: inherit;
  display: block;
}
.ht-score {
  position: absolute;
  left: 80px;
  width: 35px;
  font-size: 16px;
}

p#bkMkrName {
  text-decoration: underline;
  text-transform: capitalize;
  font-weight: 900;
  margin: 0;
}

/* .stat-table .selected-team > th {
  border: none;
} */
.check-box input[type="checkbox"]:not(old),
.check-box input[type="radio"]:not(old) {
  cursor: pointer;
}

/* Temp */
.table-heading-images th {
  text-align: center;
  border: 1px solid black;
  width: 34px;
  padding-bottom: 20px;

  border-color: #dce1e4;
  border-top-color: black !important;
  border-right-color: black !important;
  border-bottom-color: black !important;
  border-left-color: black !important;
}

tbody {
}

.stat-table {
  width: 100%;

  table-layout: fixed;
}

table.score-count {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
}

.bold-no {
  padding-left: 0px;
}

.timeOfMatch {
  text-align: center !important;
  padding-left: 0px !important;
}

body
  > div
  > div.container-fluid
  > div
  > div
  > div
  > div
  > div
  > div.stats-data
  > div
  > table
  > thead
  > tr
  > th:nth-child(17)
  > h4 {
  white-space: normal;
  text-align: left;
  padding: 0px;
  margin: 2px;
  padding-bottom: 0px !important;
}

tr.table-heading-images > th {
  border: none;
}

tr.table-heading-images {
  border-top-right-radius: 12px;
}
</style>
