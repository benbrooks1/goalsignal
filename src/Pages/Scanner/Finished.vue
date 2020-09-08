<template>
  <ss-table
    tableMode="live"
    v-if="this.$store.getters.returnFinishedMatches.length >= 1"
    :tableData="this.$store.getters.returnFinishedMatches"
  />
  <no-data
    :maxVh="true"
    type="noLive"
    heading="No Finished Matches"
    :showAddMatch="false"
    :showCreateButton="false"
    v-else
  ></no-data>
</template>

<script>
const ssTable = () => import("./../../Components/Tables/Finished_Table");
const noData = () => import("./../../Components/Tables/Components/No-Data");
export default {
  components: {
    ssTable,
    noData
  }
};
</script>
