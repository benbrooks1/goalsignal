<template>
  <td class="table-each-item">
    <table style="width:100%">
      <tr>
        <td
          v-if="child.stats.data[0] != null || undefined"
          class="multi-table-data"
        >
          <div class="cardWrap">
            <div class="cardItem">
              <span
                class="cardCount"
                v-if="child.stats.data[0].redcards != null || undefined"
                >{{ child.stats.data[0].redcards }}</span
              >
              <img
                src="./../../../../Assets/Images/Icons/Red-Card.png"
                alt
                style="width:10px;"
              />
            </div>
            <div class="cardItem">
              <span
                class="cardCount"
                v-if="child.stats.data[0].redcards != null || undefined"
                >{{ child.stats.data[0].yellowcards }}</span
              >
              <img
                src="./../../../../Assets/Images/Icons/Yellow-Card.png"
                alt
                style="width:10px;"
              />
            </div>
          </div>
        </td>
        <td v-else class="multi-table-data">
          <span>-</span>
        </td>
      </tr>
      <tr>
        <td v-if="child.stats.data[1] != null || undefined">
          <div class="cardWrap">
            <div class="cardItem">
              <img
                src="./../../../../Assets/Images/Icons/Red-Card.png"
                alt
                style="width:10px;"
              />
              <span
                class="cardCount"
                v-if="child.stats.data[1].redcards != null || undefined"
                >{{ child.stats.data[1].redcards }}</span
              >
            </div>
            <div class="cardItem">
              <img
                src="./../../../../Assets/Images/Icons/Yellow-Card.png"
                alt
                style="width:10px;"
              />
              <span
                class="cardCount"
                v-if="child.stats.data[1].redcards != null || undefined"
                >{{ child.stats.data[1].yellowcards }}</span
              >
            </div>
          </div>
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
<style>
.cardItem {
  display: grid;
  justify-content: center;
}
.cardWrap {
  display: grid;
  grid-auto-flow: column;
}
span.cardCount {
  font-weight: 900;
}
</style>
