<template>

              <div id="add" class="but-add">
                <div class="home_away_select special form-control">
                  <div class="toggle">
                    <input
                      type="radio"
                       :name="`val-${index}`"
                      value="more"
                      v-model="filter.operator"
                      :id="`more-${index}`"
                      checked="checked"
                    >
                    <label :class="sendClass" :for="`more-${index}`">And More</label>
                    <input type="radio"          :name="`val-${index}`" value="less"                v-model="filter.operator"   :id="`less-${index}`">
                    <label :class="sendClass" :for="`less-${index}`">And Less</label>
                    <input type="radio"          :name="`val-${index}`" value="exact"                 v-model="filter.operator" :id="`exact-${index}`">
                    <label  :class="sendClass" :for="`exact-${index}`">Exactly</label>
                  </div>
                </div>
              </div>
            </div>

</template>
<script>
export default {
  props:{
    index: Number,
    filter: Object,
    sendClass: String

  }
}
</script>
<style>
label.mle {
    width: 100px!important;
}
</style>