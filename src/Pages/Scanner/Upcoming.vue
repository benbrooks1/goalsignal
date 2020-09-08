<template>
  <upcoming-table v-if="this.$store.getters.returnUpcomingMatches.length >= 1"
    :tableData="this.$store.getters.returnUpcomingMatches" />
</template>

<script>
const upcomingTable = () => import("./../../Components/Tables/Upcoming_Table");
export default {
  components: {
    upcomingTable
  },
  computed: {
    returnUpcoming() {
      return this.$store.getters.returnUpcomingMatches;
    }
  }
};
</script>
