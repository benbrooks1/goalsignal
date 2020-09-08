<template>
  <div>
    <div v-if="type == 'Slider'">
      <input v-model="filter.value.singular" type="range" class="time-range" name="time[]" />
    </div>
    <div v-if="type == 'Single Number'">
      <input
        v-model="filter.value.singular"
        type="number"
        v-validate="'required|integer'"
        :name="`score-${index}`"
      />
    </div>
    <div v-if="type == 'Double Number'">
      <div v-if="percentageOnTypes.includes(type)">
        <div class="percentInput">
          <input
            v-model="filter.value.home"
            type="number"
            v-validate="'required|integer'"
            class="form-control"
            :name="`score-${index}`"
          />
          <span>%</span>
        </div>
        <div class="percentInput">
          <input
            v-model="filter.value.away"
            type="number"
            v-validate="'required|integer'"
            class="form-control"
            :name="`score-${index}`"
          />
          <span>%</span>
        </div>
        <div class="percentInput">
          <input
            v-model="filter.value.match"
            type="number"
            v-validate="'required|integer'"
            class="form-control"
            :name="`score-${index}`"
          />
          <span>%</span>
        </div>
      </div>
      <div class="doubleNumberGrid" v-else>
        <input
          v-model="filter.value.home"
          type="number"
          v-validate="'required|integer'"
          :name="`score-${index}`"
        />
        <input
          v-model="filter.value.away"
          type="number"
          v-validate="'required|integer'"
          :name="`score-${index}`"
        />
        <input
          v-model="filter.value.match"
          type="number"
          v-validate="'required|integer'"
          :name="`score-${index}`"
        />
      </div>
    </div>
    <div v-if="type == 'Odds'">
      <input
        v-model="filter.filterLogicValue"
        type="number"
        v-validate="'required|integer'"
        class="form-control"
        :name="`score-${index}`"
      />
      <input
        v-model="filter.filterLogicValue"
        type="number"
        v-validate="'required|integer'"
        class="form-control"
        :name="`score-${index}`"
      />
      <input
        v-model="filter.filterLogicValue"
        type="number"
        v-validate="'required|integer'"
        class="form-control"
        :name="`score-${index}`"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    filter: Object,
    index: Number,
    type: String,
    percentageOnTypes: Array
  },
  data() {
    return {};
  }
};
</script>
<style>
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.doubleNumberGrid {
  display: grid;
  grid-template-columns: 60px 60px;
  justify-content: center;
  grid-column-gap: 30px;
}
.doubleNumberGrid > input {
  border: 2px solid #ffd51f;
  color: #292929;
  text-align: center;
  border-radius: 4px;
}
</style>
