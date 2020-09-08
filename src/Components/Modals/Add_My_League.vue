<template>
  <div class="body-modal" id="infinite-list">
    <!-- <loading :active="true" :can-cancel="true" :is-full-page="true"></loading> -->
    <h2 class="text-center">Countries</h2>
    <ul class="country-list" v-for="country in returnCountryLeagues" v-bind:key="country.id">
      <li class="c-list">
        <div class="country-content">
          <img class="country-logo" :src="country.image_path" />
          <span class="country-name" @click="toggle = toggle !== country.id ? country.id : null">
            {{
            country.name
            }}
          </span>
        </div>
        <ul class="inner-c-list" v-bind:class="{ 'is-open': toggle === country.id }">
          <li
            v-for="league in country.leagues.data"
            v-bind:key="league.id"
            @click="onToggleLeague(league, country.image_path)"
          >
            <button class="league-content">
              <img class="league-logo" :src="league.logo_path" />
              <span class="league-name">{{ league.name }}</span>
            </button>
            <i class="star-icon" :class="{ selected: league.is_my_league }"></i>
          </li>
        </ul>
      </li>
    </ul>
    <transition name="fade">
      <div class="loading" v-show="isLoading">
        <font-awesome-icon
          style="color:black"
          size="lg"
          class="pointer closeCon modal_Close_White"
          icon="spinner"
        />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
      isLoading: false,
      page: 0,
      images: []
    };
  },
  methods: {
    getCountries() {
      if (this.page < this.$store.state.$Api.countryTotalPages) {
        this.page++;
        this.isLoading = true;
        this.$store.dispatch("getCountryLeagues", this.page).then(resp => {
          this.isLoading = false;
        });
      }
    },

    onToggleLeague(league, logoPath) {
      if (!league.is_my_league) {
        league = Object.assign({}, league, {
          countryLogoPath: league.country.data.image_path
        });
        // league.countryLogoPath = logoPath;
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
    }
  },
  mounted() {
    // Detect when scrolled to bottom.
    const listElm = document.querySelector("#infinite-list");
    listElm.addEventListener("scroll", e => {
      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.getCountries();
      }
    });
    this.$store.commit("updateCountryLeagues", { shouldClearData: true });
    this.getCountries();
  },

  computed: {
    returnCountryLeagues() {
      return this.$store.getters.returnCountryLeagues;
    }
  }
};
</script>

<style>
.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: "black";
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}
.text-center {
  text-align: center;
}

.country-list {
  list-style-type: none;
  list-style: none;
  cursor: pointer;
  padding: 8px 0px;
  margin-bottom: 0;
  border-bottom: 1px solid #fff;
  background: url(./../../Assets/Images/Logos/dropdown-icon.jpg) no-repeat 97%
    7px;
  background-size: 26px;
  background-color: #19aa52;
}

.slideDown {
  visibility: visible !important;
}

.country-list ul {
  list-style-type: none;
  list-style: none;
  padding-left: 0;
  /* padding-top: 4px; */
  background: #51af76de;
  margin: 0 -27px;
  padding: 10px 0 5px;
  margin-bottom: -8px;
  margin-top: 6px;
  /* animation-name: slideDown;
	-webkit-animation-name: slideDown;	

	animation-duration: 1s;	
	-webkit-animation-duration: 1s;

	animation-timing-function: ease;	
	-webkit-animation-timing-function: ease; */
}

.country-list ul li {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #fff;
  /* font-weight: 400; */
  margin-bottom: 5px;
  padding: 0 21px 0 32px;

  /* background: url(./../../Assets/Images/Logos/bookmark-button.png) no-repeat 96%;
    background-size: 15px; */
}
.country-list li {
  /* display: flex;
  flex-direction: row; */
}
.country-list li .country-logo {
  min-width: 20px;
  width: 30px;
  height: 22px;
}
.country-list li .country-name {
  margin-left: 20px;
}
.star-icon {
  background: url(./../../Assets/Images/Logos/star-icon.png) no-repeat 96%;
  width: 15px;
  height: 15px;
  display: inline-block;
  float: right;
  margin-top: 5px;
}

.star-icon:hover,
.star-icon:active,
.star-icon:focus,
.star-icon.selected {
  background: url(./../../Assets/Images/Logos/star-icon-hover.png) no-repeat 96%;
}

.country-list ul li button {
  background: none;
  border: none;
}

.country-list li {
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  padding: 0 27px;
}
.country-list .country-content {
  display: flex;
  flex-direction: row;
}
.league-content {
  /* height: 40px; */
  display: flex;
  flex-direction: row;
}
.league-content .league-logo {
  width: 30px;
  height: 30px;
}
.league-content .league-name {
  margin-left: 20px;
  line-height: 2;
}

.body-modal {
  height: 480px;
  overflow-y: scroll;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.inner-c-list:not(.is-open) {
  display: none;
}

.country-list li span {
  display: block;
}
</style>
