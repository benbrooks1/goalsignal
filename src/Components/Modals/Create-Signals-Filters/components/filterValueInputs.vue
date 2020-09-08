<template>
  <div>
    <div v-if="filter.currentlySelectedFilterValue === 'time-div'" class="filter-item time-div">
      <label for>Time Is</label>
      <input v-model="filter.filterLogicValue" type="range" class="time-range" name="time[]" />
      <operator-select :index="index" :filters="filter"></operator-select>
    </div>
    <div v-if="filter.currentlySelectedFilterValue === 'score-div'" class="filter-item score-div">
      <label>Score Is:</label>
      <input
        v-model="filter.filterLogicValue"
        type="number"
        v-validate="'required|integer'"
        class="form-control"
        :name="`score-${index}`"
      />
      <div class="but-add">
        <div class="home_away_select special form-control">
          <div class="toggle">
            <input
              type="radio"
              name="val"
              value="more"
              v-model="filter.value"
              id="more"
              checked="checked"
            />
            <label for="more">And More</label>
            <input type="radio" name="val" value="less" v-model="filter.value" id="less" />
            <label for="less">And Less</label>
            <input type="radio" name="val" value="exact" v-model="filter.value" id="exact" />
            <label for="exact">Exactly</label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filter.currentlySelectedFilterValue === 'lo-div'" class="filter-item lo-div">
      <label for>Live Odds Are</label>
      <input v-model="filter.filterLogicValue" type="text" class="form-control" name="live-odds[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div v-if="filter.currentlySelectedFilterValue === 'spo-div'" class="filter-item spo-div">
      <label for>SP Odds Are</label>
      <input v-model="filter.filterLogicValue" type="text" class="form-control" name="sp-odds[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div v-if="filter.currentlySelectedFilterValue === 'dpi-div'" class="filter-item dpi-div">
      <label for>Draw Price Is</label>
      <input v-model="filter.filterLogicValue" type="text" class="form-control" name="draw-price[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div
      v-if="filter.currentlySelectedFilterValue === 'possession-div'"
      class="filter-item possession-div"
    >
      <label for>Possession Is</label>
      <input v-model="filter.filterLogicValue" type="text" class="poss-range" name="possession[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div
      v-if="filter.currentlySelectedFilterValue === 'supermacy-div'"
      class="filter-item supermacy-div"
    >
      <label for>Supremacy Is</label>
      <input v-model="filter.filterLogicValue" type="text" class="super-range" name="supremacy[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div v-if="filter.currentlySelectedFilterValue === 'shots-div'" class="filter-item shots-div">
      <label for>Goal Attempts Are</label>
      <input v-model="filter.filterLogicValue" type="text" class="form-control" name="shots[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div v-if="filter.currentlySelectedFilterValue === 'sot-div'" class="filter-item sot-div">
      <label for>Shots On Target Are</label>
      <input
        v-model="filter.filterLogicValue"
        type="text"
        class="form-control"
        name="shots-on-target[]"
      />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div v-if="filter.currentlySelectedFilterValue === 'sib-div'" class="filter-item sib-div">
      <label for>Shots On Target Are</label>
      <input
        v-model="filter.filterLogicValue"
        type="text"
        class="form-control"
        name="shots-in-box[]"
      />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div
      v-if="filter.currentlySelectedFilterValue === 'corners-div'"
      lass="filter-item corners-div"
    >
      <label for>Corners Are</label>
      <input v-model="filter.filterLogicValue" type="text" class="form-control" name="corners[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div
      v-if="filter.currentlySelectedFilterValue === 'yellow-cards-div'"
      class="filter-item yellow-cards-div"
    >
      <label for>Yellow Cards Are</label>
      <input
        v-model="filter.filterLogicValue"
        type="text"
        class="form-control"
        name="yellow-cards[]"
      />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
    <div
      v-if="filter.currentlySelectedFilterValue === 'red-cards-div'"
      class="filter-item red-cards-div"
    >
      <label for>Red Cards Are</label>
      <input v-model="filter.filterLogicValue" type="text" class="form-control" name="red-cards[]" />
      <div class="but-add">
        <span class="add-more">And More</span>
        <span class="add-less">And Less</span>
        <span class="exactly">Exactly</span>
      </div>
    </div>
  </div>
</template>

<script>
import operatorSelect from "./../../more_less_exact";
export default {
  components: {
    operatorSelect
  },

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
