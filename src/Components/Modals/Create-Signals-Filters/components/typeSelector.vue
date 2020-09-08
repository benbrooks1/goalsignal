<template>
  <div>
    <div class="home_away_select form-control">
      <div class="toggle">
        <input
          type="radio"
          :name="`home-away-${index}`"
          value="home"
          v-validate="'required'"
          v-model="filter.homeAway"
          id="sizeWeight"
          checked="checked"
        />
        <label for="sizeWeight">Home</label>
        <input
          type="radio"
          :name="`home-away-${index}`"
          value="away"
          v-validate="'required'"
          v-model="filter.homeAway"
          id="sizeDimensions"
        />
        <label for="sizeDimensions">Away</label>

        <input
          type="radio"
          :name="`home-away-${index}`"
          value="match"
          v-validate="'required'"
          v-model="filter.homeAway"
          id="sizeMatch"
        />
        <label for="sizeMatch">Match</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: Object,
    index: Number
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
