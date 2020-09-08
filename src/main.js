import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import  mark from 'mark';
import {
  faBell,
  faVolumeMute,
  faVolumeUp,
  faSearch,
  faSyncAlt,
  faPhone,
  faUser,
  faCaretDown,
  faCopy,
  faThumbtack,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faCheck,
  faCog,
  faColumns,
  faEdit,
  faFilter,
  faFlagCheckered,
  // faPen,
  // faPenSquare,
  // faPlay,
  faQuestionCircle,
  faPlus,
  faClock,
  faTimes,
  faTimesCircle,
  faTrash,
  faTrashAlt,
  faWindowMaximize,
  faPowerOff,
  faEnvelope,
  faSpinner,
  faCalendarAlt,
  faCheckCircle

} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VTooltip from "v-tooltip";
// import VeeValidate from "vee-validate";
import {
  Validator,
  install as VeeValidate
} from "vee-validate/dist/vee-validate.minimal.esm.js";
import { required, min, max } from "vee-validate/dist/rules.esm.js";
import veeEn from "vee-validate/dist/locale/en";
import VModal from "vue-js-modal";
import ToggleButton from "vue-js-toggle-button";
import Notifications from "vue-notification";
import "vue-notifyjs/themes/default.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import SlideUpDown from "vue-slide-up-down";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "vue2-animate/dist/vue2-animate.min.css";
import App from "./App.vue";
import router from "./Router/router";
import store from "./Vuex/store";
import socketIOClient from "socket.io-client";
import PrettyCheckbox from "pretty-checkbox-vue";
import "vue-material-design-icons/styles.css";
Vue.use(PrettyCheckbox);
import VueProgressBar from "vue-progressbar";
// import VueSession from 'vue-session'
import { Tabs, Tab } from "vue-tabs-component";
import constants from "./Constants/index";
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import responsive from 'vue-responsive';
import { initNotification } from "./Common/push-notifications";
// Add the rules you need.
Validator.extend("required", required);
Validator.extend("min", min);
Validator.extend("max", max);

// Merge the messages.
Validator.localize("en", veeEn);
Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  failedColor: "red",
  height: "2px"
});
library.add(
  faVolumeUp,
  faVolumeMute,
  faTimesCircle,
  faSyncAlt,
  faClock,
  faTimes,
  faUser,
  faCheckCircle,
  faPhone,
  faCopy,
  faThumbtack,
  faFilter,
  faFlagCheckered,
  faPowerOff,
  faCheck,
  faCaretDown,
  faCaretUp,
  faEdit,
  faTrashAlt,
  faTrash,
  faPlus,
  faCog,
  faCaretLeft,
  faCaretRight,
  faColumns,
  faQuestionCircle,
  faWindowMaximize,
  faBell,
  faSearch,
  faEnvelope,
  faSpinner,
  faCalendarAlt
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);
Vue.component("slide-up-down", SlideUpDown);
Vue.component("tabs", Tabs);
Vue.component("tab", Tab);
Vue.component('v-date-picker', DatePicker)

// Vue.use(VueSession)
Vue.use(responsive)
Vue.use(VTooltip);
Vue.use(ToggleButton);
Vue.use(VeeValidate);
Vue.use(VModal, { dynamic: true });
Vue.use(VueSweetalert2);
Vue.use(Notifications);

// Vue.prototype.$Hereanyname = window;
Vue.prototype.$mark = new mark(document.getElementById("Main_Layout"));

const apiUrl = process.env.VUE_APP_APIURL;
// export var $io = socketIOClient('http://167.71.188.139:3200', { origins: '*:*' })
export var $io = socketIOClient(apiUrl, { origins: "*:*" });
Vue.prototype.$io = $io;

// if (window.self == window.top) {
//   window.location.href = "https://soccersignals.pro/";
// }
let a = window.location.href;
if(a.includes('auth_email')){
  // console.log("THERER");
  localStorage.clear();

}
if (!localStorage.getItem(constants.LOCALSTORAGE.AUTH_KEY)) {
  //do something
} else {
  initNotification();
  // store.dispatch("requestAllMatches", 1);
  // store.dispatch("requestUpcomingMatches");
  // store.dispatch("requestFinishedMatches");
  store.dispatch("requestUser");
  $io.emit("Login", store.getters.returnUser._id);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
