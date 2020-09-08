<template>
<div>
  <div class="settings-body" style="padding: 10px;" v-responsive.lg.xl>
    <div id="col-1">
      <div class="alert-item timezone-item">
        <label for="timezone" class="control-label">Timezone</label>

        <select v-model="$store.state.$Auth.user.timezone"  @change="timezoneChange($store.state.$Auth.user.timezone)" class="form-control" id="timezone">
          <option v-for="timezone in timezones">{{timezone}}</option>
        </select>
      </div>
    </div>
    <div id="col-2">
      <div class="alert-item">
        <label for="goal-alert" class="control-label label2">Showing pops</label>
        <toggle-button :labels="true" v-model="$store.state.$Auth.user.popupShow" @change="toggleChanged($store.state.$Auth.user.popupShow)" />
      </div>
      <div class="alert-item">
        <label for="goal-alert" class="control-label label2">Notification Sound</label>
        <vue-slider v-model="$store.state.$Auth.user.volume"  :lazy="true"
  @change="sliderValueChange($store.state.$Auth.user.volume)"  />
      </div>
     
    </div>
    <!-- <div id="gSignIn" class="settings_submit_container"></div> -->
  </div>
  <div class="settings-body2" v-responsive.sm.xs>
    <div >
      <div class="alert-item timezone-item">
        <label for="timezone" class="control-label">Timezone</label>

        <select v-model="$store.state.$Auth.user.timezone" class="form-control" id="timezone">
          <option v-for="timezone in timezones">{{timezone}}</option>
        </select>
      </div>
       <div >
      <div class="alert-item grid-from-block">
        <label for="goal-alert" class="control-label label2">Showing pops</label>
        <toggle-button :labels="true" v-model="$store.state.$Auth.user.popupShow" @change="toggleChanged($store.state.$Auth.user.popupShow)" />
      </div>
      <div class="alert-item grid-from-block">
        <label for="goal-alert" class="control-label label2">Notification Sound</label>
        <vue-slider v-model="$store.state.$Auth.user.volume"  :lazy="true"
  @change="sliderValueChange($store.state.$Auth.user.volume)"  />
      </div>
    </div>
    </div>
    <!-- <div id="gSignIn" class="settings_submit_container"></div> -->
  </div>
</div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
export default {
  components: {
    VueSlider
  },
  watch: {
    selectedTimezone: () => {
      this.$store.state.$Auth.user.timezone = this.selectedTimezone;
    }
  },
  data() {
    return {
      timezones: [
        "Europe/Andorra",
        "Asia/Dubai",
        "Asia/Kabul",
        "Europe/Tirane",
        "Asia/Yerevan",
        "Antarctica/Casey",
        "Antarctica/Davis",
        "Antarctica/DumontDUrville", // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
        "Antarctica/Mawson",
        "Antarctica/Palmer",
        "Antarctica/Rothera",
        "Antarctica/Syowa",
        "Antarctica/Troll",
        "Antarctica/Vostok",
        "America/Argentina/Buenos_Aires",
        "America/Argentina/Cordoba",
        "America/Argentina/Salta",
        "America/Argentina/Jujuy",
        "America/Argentina/Tucuman",
        "America/Argentina/Catamarca",
        "America/Argentina/La_Rioja",
        "America/Argentina/San_Juan",
        "America/Argentina/Mendoza",
        "America/Argentina/San_Luis",
        "America/Argentina/Rio_Gallegos",
        "America/Argentina/Ushuaia",
        "Pacific/Pago_Pago",
        "Europe/Vienna",
        "Australia/Lord_Howe",
        "Antarctica/Macquarie",
        "Australia/Hobart",
        "Australia/Currie",
        "Australia/Melbourne",
        "Australia/Sydney",
        "Australia/Broken_Hill",
        "Australia/Brisbane",
        "Australia/Lindeman",
        "Australia/Adelaide",
        "Australia/Darwin",
        "Australia/Perth",
        "Australia/Eucla",
        "Asia/Baku",
        "America/Barbados",
        "Asia/Dhaka",
        "Europe/Brussels",
        "Europe/Sofia",
        "Atlantic/Bermuda",
        "Asia/Brunei",
        "America/La_Paz",
        "America/Noronha",
        "America/Belem",
        "America/Fortaleza",
        "America/Recife",
        "America/Araguaina",
        "America/Maceio",
        "America/Bahia",
        "America/Sao_Paulo",
        "America/Campo_Grande",
        "America/Cuiaba",
        "America/Santarem",
        "America/Porto_Velho",
        "America/Boa_Vista",
        "America/Manaus",
        "America/Eirunepe",
        "America/Rio_Branco",
        "America/Nassau",
        "Asia/Thimphu",
        "Europe/Minsk",
        "America/Belize",
        "America/St_Johns",
        "America/Halifax",
        "America/Glace_Bay",
        "America/Moncton",
        "America/Goose_Bay",
        "America/Blanc-Sablon",
        "America/Toronto",
        "America/Nipigon",
        "America/Thunder_Bay",
        "America/Iqaluit",
        "America/Pangnirtung",
        "America/Atikokan",
        "America/Winnipeg",
        "America/Rainy_River",
        "America/Resolute",
        "America/Rankin_Inlet",
        "America/Regina",
        "America/Swift_Current",
        "America/Edmonton",
        "America/Cambridge_Bay",
        "America/Yellowknife",
        "America/Inuvik",
        "America/Creston",
        "America/Dawson_Creek",
        "America/Fort_Nelson",
        "America/Vancouver",
        "America/Whitehorse",
        "America/Dawson",
        "Indian/Cocos",
        "Europe/Zurich",
        "Africa/Abidjan",
        "Pacific/Rarotonga",
        "America/Santiago",
        "America/Punta_Arenas",
        "Pacific/Easter",
        "Asia/Shanghai",
        "Asia/Urumqi",
        "America/Bogota",
        "America/Costa_Rica",
        "America/Havana",
        "Atlantic/Cape_Verde",
        "America/Curacao",
        "Indian/Christmas",
        "Asia/Nicosia",
        "Asia/Famagusta",
        "Europe/Prague",
        "Europe/Berlin",
        "Europe/Copenhagen",
        "America/Santo_Domingo",
        "Africa/Algiers",
        "America/Guayaquil",
        "Pacific/Galapagos",
        "Europe/Tallinn",
        "Africa/Cairo",
        "Africa/El_Aaiun",
        "Europe/Madrid",
        "Africa/Ceuta",
        "Atlantic/Canary",
        "Europe/Helsinki",
        "Pacific/Fiji",
        "Atlantic/Stanley",
        "Pacific/Chuuk",
        "Pacific/Pohnpei",
        "Pacific/Kosrae",
        "Atlantic/Faroe",
        "Europe/Paris",
        "Europe/London",
        "Asia/Tbilisi",
        "America/Cayenne",
        "Africa/Accra",
        "Europe/Gibraltar",
        "America/Godthab",
        "America/Danmarkshavn",
        "America/Scoresbysund",
        "America/Thule",
        "Europe/Athens",
        "Atlantic/South_Georgia",
        "America/Guatemala",
        "Pacific/Guam",
        "Africa/Bissau",
        "America/Guyana",
        "Asia/Hong_Kong",
        "America/Tegucigalpa",
        "America/Port-au-Prince",
        "Europe/Budapest",
        "Asia/Jakarta",
        "Asia/Pontianak",
        "Asia/Makassar",
        "Asia/Jayapura",
        "Europe/Dublin",
        "Asia/Jerusalem",
        "Asia/Kolkata",
        "Indian/Chagos",
        "Asia/Baghdad",
        "Asia/Tehran",
        "Atlantic/Reykjavik",
        "Europe/Rome",
        "America/Jamaica",
        "Asia/Amman",
        "Asia/Tokyo",
        "Africa/Nairobi",
        "Asia/Bishkek",
        "Pacific/Tarawa",
        "Pacific/Enderbury",
        "Pacific/Kiritimati",
        "Asia/Pyongyang",
        "Asia/Seoul",
        "Asia/Almaty",
        "Asia/Qyzylorda",
        "Asia/Qostanay", // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
        "Asia/Aqtobe",
        "Asia/Aqtau",
        "Asia/Atyrau",
        "Asia/Oral",
        "Asia/Beirut",
        "Asia/Colombo",
        "Africa/Monrovia",
        "Europe/Vilnius",
        "Europe/Luxembourg",
        "Europe/Riga",
        "Africa/Tripoli",
        "Africa/Casablanca",
        "Europe/Monaco",
        "Europe/Chisinau",
        "Pacific/Majuro",
        "Pacific/Kwajalein",
        "Asia/Yangon",
        "Asia/Ulaanbaatar",
        "Asia/Hovd",
        "Asia/Choibalsan",
        "Asia/Macau",
        "America/Martinique",
        "Europe/Malta",
        "Indian/Mauritius",
        "Indian/Maldives",
        "America/Mexico_City",
        "America/Cancun",
        "America/Merida",
        "America/Monterrey",
        "America/Matamoros",
        "America/Mazatlan",
        "America/Chihuahua",
        "America/Ojinaga",
        "America/Hermosillo",
        "America/Tijuana",
        "America/Bahia_Banderas",
        "Asia/Kuala_Lumpur",
        "Asia/Kuching",
        "Africa/Maputo",
        "Africa/Windhoek",
        "Pacific/Noumea",
        "Pacific/Norfolk",
        "Africa/Lagos",
        "America/Managua",
        "Europe/Amsterdam",
        "Europe/Oslo",
        "Asia/Kathmandu",
        "Pacific/Nauru",
        "Pacific/Niue",
        "Pacific/Auckland",
        "Pacific/Chatham",
        "America/Panama",
        "America/Lima",
        "Pacific/Tahiti",
        "Pacific/Marquesas",
        "Pacific/Gambier",
        "Pacific/Port_Moresby",
        "Pacific/Bougainville",
        "Asia/Manila",
        "Asia/Karachi",
        "Europe/Warsaw",
        "America/Miquelon",
        "Pacific/Pitcairn",
        "America/Puerto_Rico",
        "Asia/Gaza",
        "Asia/Hebron",
        "Europe/Lisbon",
        "Atlantic/Madeira",
        "Atlantic/Azores",
        "Pacific/Palau",
        "America/Asuncion",
        "Asia/Qatar",
        "Indian/Reunion",
        "Europe/Bucharest",
        "Europe/Belgrade",
        "Europe/Kaliningrad",
        "Europe/Moscow",
        "Europe/Simferopol",
        "Europe/Kirov",
        "Europe/Astrakhan",
        "Europe/Volgograd",
        "Europe/Saratov",
        "Europe/Ulyanovsk",
        "Europe/Samara",
        "Asia/Yekaterinburg",
        "Asia/Omsk",
        "Asia/Novosibirsk",
        "Asia/Barnaul",
        "Asia/Tomsk",
        "Asia/Novokuznetsk",
        "Asia/Krasnoyarsk",
        "Asia/Irkutsk",
        "Asia/Chita",
        "Asia/Yakutsk",
        "Asia/Khandyga",
        "Asia/Vladivostok",
        "Asia/Ust-Nera",
        "Asia/Magadan",
        "Asia/Sakhalin",
        "Asia/Srednekolymsk",
        "Asia/Kamchatka",
        "Asia/Anadyr",
        "Asia/Riyadh",
        "Pacific/Guadalcanal",
        "Indian/Mahe",
        "Africa/Khartoum",
        "Europe/Stockholm",
        "Asia/Singapore",
        "America/Paramaribo",
        "Africa/Juba",
        "Africa/Sao_Tome",
        "America/El_Salvador",
        "Asia/Damascus",
        "America/Grand_Turk",
        "Africa/Ndjamena",
        "Indian/Kerguelen",
        "Asia/Bangkok",
        "Asia/Dushanbe",
        "Pacific/Fakaofo",
        "Asia/Dili",
        "Asia/Ashgabat",
        "Africa/Tunis",
        "Pacific/Tongatapu",
        "Europe/Istanbul",
        "America/Port_of_Spain",
        "Pacific/Funafuti",
        "Asia/Taipei",
        "Europe/Kiev",
        "Europe/Uzhgorod",
        "Europe/Zaporozhye",
        "Pacific/Wake",
        "America/New_York",
        "America/Detroit",
        "America/Kentucky/Louisville",
        "America/Kentucky/Monticello",
        "America/Indiana/Indianapolis",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Indiana/Marengo",
        "America/Indiana/Petersburg",
        "America/Indiana/Vevay",
        "America/Chicago",
        "America/Indiana/Tell_City",
        "America/Indiana/Knox",
        "America/Menominee",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/North_Dakota/Beulah",
        "America/Denver",
        "America/Boise",
        "America/Phoenix",
        "America/Los_Angeles",
        "America/Anchorage",
        "America/Juneau",
        "America/Sitka",
        "America/Metlakatla",
        "America/Yakutat",
        "America/Nome",
        "America/Adak",
        "Pacific/Honolulu",
        "America/Montevideo",
        "Asia/Samarkand",
        "Asia/Tashkent",
        "America/Caracas",
        "Asia/Ho_Chi_Minh",
        "Pacific/Efate",
        "Pacific/Wallis",
        "Pacific/Apia",
        "Africa/Johannesburg"
      ],
      selectedTimezone: null
    };
  },
  methods: {
    toggleChanged(value) {
      // console.log(value);
      this.$io.emit("updateSettings", {
        update:{popupShow:value},id : this.$store.state.$Auth.user._id
      });
    },
    sliderValueChange(value){
      // console.log(value)
      this.$io.emit("updateSettings", {
        update:{volume:value},id : this.$store.state.$Auth.user._id
      });
    },
    timezoneChange(value){
      // console.log(value,this.$store.state.$Auth.user._id);
      this.$io.emit("updateSettings", {
        update:{timezone:value},id : this.$store.state.$Auth.user._id
      });

    }

  }
};
</script>


<style>
.grid-from-block{
  width: 33%;
  float: left;
}
.settings-body2 {
  display: grid;
  margin: 10px 20px 20px 20px;
  grid-gap: 5rem;
}
.settings-body2 .alert-item {
  display: block;
  border-top: 1px solid #ccc;
  margin-top: 11px;
}
.settings-body2 .vue-js-switch .v-switch-label[data-v-25adc6c0] {
    top: 10px;
}
.settings-body2 .alert-item.timezone-item{
border-top: 0px;
    margin-top: 0px;
}

.alert-item {
  display: grid;
}
.sound-volume {
  outline: none !important;
  border: none !important;
}
#col-2 > .alert-item:nth-of-type(3),
.alert-item:nth-of-type(4),
.alert-item:nth-of-type(5),
.alert-item:nth-of-type(6) {
  margin-top: 10px;
}
#col-1 > .alert-item:nth-of-type(2) {
  margin-top: 30px;
}
.alert-item > label {
  font-size: 1.3rem;
}
.settings_submit_container {
  display: grid;
  grid-area: settings_submit;
  justify-content: center;
  justify-self: center;
}
#col-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-area: col-2;
}
#col-1 {
  grid-area: col-1;
}
.settings_submit {
  background-color: #ffd41e;
  border-radius: 0;
  font-weight: 700;
  padding-left: 20px;
  padding-right: 20px;
  outline: none !important;
}
.settings_submit:hover {
  background-color: #ffdc3d;
}
</style>
