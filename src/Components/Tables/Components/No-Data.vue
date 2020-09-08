<template>
  <div>
    <div v-if="!maxVh" :style="{height:`calc(100vh - 91px - ${height}px)`}" id="NoFilters">
      <h2 class></h2>
      <button
        @click="$modal.show(modalToShowOnCreateClick);"
        class="noDataButton"
        v-if="showCreateButton  && !showAddMatch"
      >
        <span v-if="!createButtonText">Create one</span>
        <span v-if="createButtonText">{{createButtonText}}</span>
      </button>
    </div>
    <div v-if="maxVh === true" :style="{height:`calc(100vh)`}" id="NoFilters">
      <div>
       <h2  v-if="type == true"><p> You Have No Goal Predictions Added To The Shortlist. </p> <p>To Add a Goal Alert Click The Bell Icon  <img src="./../../../Assets/Images/Logos/bell-3.png"/></p> 
      </h2>
         <span  v-else> 
            <div style="text-align:center"><img style="width: 80px;height: 80px;" src="./../../../Assets/Images/Logos/loadingif.svg"/></div>
            <h2 style="text-align:center" >{{heading}} <br/> {{subheading}}
       </h2>
</span>
     </div>
      
     
    </div>
  </div>
</template>
<script>
export default {
  props: {
    heading: String,
    showCreateButton: Boolean,
    createButtonText: String,
    showAddMatch: Boolean,
    modalToShowOnCreateClick: String,
    maxVh: Boolean,
    type: String,
    subheading:String,
  },
  data() {
    return {
      height: 0
    };
  },
  methods: {
    getRemainingHeightOfContainer() {
      if (document.getElementById("big_table_head")) {
        this.height = document.getElementById("big_table_head").clientHeight;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getRemainingHeightOfContainer);
      this.getRemainingHeightOfContainer();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getRemainingHeightOfContainer);
  }
};
</script>
<style>
.noDataButton {
  background-color: #ffd41e;
  padding: 10px;
  outline: none;
  border: none;
  cursor: pointer;
}
.noDataButton:hover {
  background-color: #dbb81a;
}
#NoFilters {
  display: grid;
  font-family: "proxima_nova_altbold";
  font-size: 15px;
  justify-content: center;
  align-content: center;
  overflow: hidden !important;
  min-width: calc(100vw - 250px);
  background-color: rgb(224, 224, 224);
}
</style>
