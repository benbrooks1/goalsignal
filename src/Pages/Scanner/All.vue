<template>
  <div>
    <all-table :tableData="returnAllMatches" />
    <!-- <no-data
      :maxVh="true"
      type="noAll"
      heading="No Matches"
      :showAddMatch="false"
      :showCreateButton="false"
      v-if="this.$store.getters.returnAllMatches.length <= 0"
    ></no-data> -->
  </div>
</template>

<script>
const allTable = () => import("./../../Components/Tables/All_Table");
const noData = () => import("./../../Components/Tables/Components/No-Data");
export default {
  components: {
    allTable,
    noData
  },
  computed: {
    returnAllMatches() {
      return this.$store.getters.returnAllMatches;
    },
    returnMyLeagues() {
      return this.$store.getters.returnMyLeagues;
    }
  }
};
</script>
