<template>
<div>
  <shortlistTableMobile  v-responsive.sm.xs 
    :tableData="returnShortlist"/>
  <shortlist-table v-responsive.lg.xl
    v-if="returnShortlist.length >= 1"
    :tableData="returnShortlist"
  ></shortlist-table>
  <no-data
  v-responsive.lg.xl
    :maxVh="true"
    heading="You Have No Goal Predictions Added To The Shortlist. To Add a Goal Alert Click The Bell Icon"
    :showAddMatch="true"
    :showCreateButton="false"
    :type="true"
    v-else
  ></no-data>
  </div>
</template>

<script>
const noData = () => import("./../../Components/Tables/Components/No-Data");
const shortlistTable = () =>
  import("./../../Components/Tables/Shortlist_Table");
  const shortlistTableMobile = () => import ("./../../Components/Tables/MobileView/ShorList_Table");
export default {
  components: {
    shortlistTable,
    shortlistTableMobile,
    noData
  },
  computed: {
    returnShortlist() {
      return this.$store.getters.returnShortlistData;
    }
  }
};
</script>
