<template>
  <td class="table-each-item">
    <table style="width:100%">
      <tr>
        <td v-if="child.stats.data[0] != null||undefined" class="multi-table-data">
          <span
            v-if="child.stats.data[0].yellowcards != null||undefined"
          >{{child.stats.data[0].yellowcards}}</span>
          <span v-else>-</span>
        </td>
        <td v-else class="multi-table-data">
          <span>-</span>
        </td>
      </tr>
      <tr>
        <td v-if="child.stats.data[1] != null||undefined">
          <span
            v-if="child.stats.data[1].yellowcards != null||undefined"
          >{{child.stats.data[1].yellowcards}}</span>
          <span v-else>-</span>
        </td>
        <td v-else class>
          <span>-</span>
        </td>
      </tr>
    </table>
  </td>
</template>

<script>
export default {
  props: ["child"]
};
</script>
