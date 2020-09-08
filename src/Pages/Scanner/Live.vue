<template>
<div>
  <ss-table-mobile-view
    tableMode="live"
    v-responsive.sm.xs
    
    :tableData="this.$store.getters.returnLiveMatches"
    
  />
    <!-- <no-data-mobile   :maxVh="true"
    v-responsive.lg.xl
    type="noLive"
     v-responsive.sm.xs
    heading="No Matches Currently Fit This Criteria"
    :showAddMatch="false"
    :showCreateButton="false"
    v-else>

  </no-data-mobile> -->
  <ss-table
    tableMode="live"
    v-responsive.lg.xl
    v-if="this.$store.getters.returnLiveMatches.length >= 1"
    :tableData="this.$store.getters.returnLiveMatches"
  />
  <no-data
    :maxVh="true"
    v-responsive.lg.xl
    type="noLive"
    heading="There Are No Goal Predictions At This Time"
    subheading="Searching Live Matches… "
    :showAddMatch="false"
    :showCreateButton="false"
    v-else
  ></no-data>

  </div>
</template>

<script>
const ssTable = () => import("./../../Components/Tables/Live_Table");
const ssTableMobileView = () => import("./../../Components/Tables/MobileView/Live_Table");
const noData = () => import("./../../Components/Tables/Components/No-Data");
const noDataMobile = () => import("./../../Components/Tables/MobileView/NO_Data");
export default {
  components: {
    ssTableMobileView,
    ssTable,
    noData,
    noDataMobile
  }
};
</script>
