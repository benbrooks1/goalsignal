
<template>
  <ss-table v-if="returnSignalData.length >= 1" tableMode="live" :tableData="returnSignalData" />
  <no-data
    :maxVh="true"
    heading="No Matches In This Signal"
    :showAddMatch="true"
    :showCreateButton="false"
    v-else
  ></no-data>
</template>


<script>
const ssTable = () => import("./../../src/Components/Tables/Signal_Table");
const noData = () => import("./../Components/Tables/Components/No-Data");

export default {
  components: {
    ssTable,
    noData
  },
  computed: {
    returnSignalData() {
      return this.$store.getters.returnSignalData;
    },

    returnSelectedSignal() {
      return this.$store.getters.returnSelectedSignal;
    }
  }
};
</script>
