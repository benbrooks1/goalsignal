<template>
  <div v-if="returnNotifications.length > 0" class="notification-section">
    <h2
      style="color: white;
    top: 44px;
    position: relative;
    text-align: center;
    z-index: 9999;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 25px;"
    >Notifications</h2>

    <div id="infinite-list">
      <div v-for="notification in returnNotifications" v-bind:key="notification._id">
        <div class="not-text" @click="onClickNotification(notification)">
          <div class="not-text-1">
            <div class="img-box">
              <font-awesome-icon icon="bell" size="lg" class="pointer" />
            </div>
            <div class="box-text" v-bind:class="getClass(notification)" >
              <h4>{{ notification.title }}</h4>
              <p>{{ getFilterHtml(notification.content) }}</p>
            </div>
          </div>
          <div class="not-text-2">
            <font-awesome-icon size="sm" icon="clock" />
            {{ parseTime(notification.time) }}
            <div>{{ parseDate(notification.time) }}</div>
          </div>
        </div>
      </div>
      <div
        class="load-btn"
        @click="getNotifications()"
        v-if="page < $store.state.$Api.notificationTotalPages"
      >
        <a href="#">Load More</a>
      </div>
    </div>
  </div>
  <no-data
    :maxVh="true"
    type="noNotifications"
    heading="No Notifications"
    :showAddMatch="false"
    :showCreateButton="false"
    v-else
  ></no-data>
</template>

<script>
import Constants from "../../Constants";
const noData = () => import("./../../Components/Tables/Components/No-Data");
export default {
  data() {
    return {
      isLoading: false,
      page: 0
    };
  },
  components: {
    noData
  },
  created() {
    this.$store.commit("updateNotifications", { shouldClearData: true });
    this.getNotifications();
  },
  mounted() {
    // Detect when scrolled to bottom.
    const listElm = document.querySelector("#infinite-list");
    if (listElm) {
      listElm.addEventListener("scroll", e => {
        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
          this.getNotifications();
        }
      });
    }
    this.$store.commit("updateNotifications", { shouldClearData: true });
    this.getNotifications();
  },
  methods: {
    getFilterHtml(content){
      return content.replace(/<\/?[^>]+(>|$)/g, "");
    },
    getNotifications() {
      if (this.page < this.$store.state.$Api.notificationTotalPages) {
        this.page++;
        this.isLoading = true;
        this.$store.dispatch("getNotifications", this.page).then(resp => {
          this.isLoading = false;
        });
      }
    },
    getClass(notification){
      // console.log("NOTIFICATION ",notification);
          if( notification.type == 9 ||  notification.type == 10  ){
                return 'red' ;
          }else if (notification.type == 6){
            if(notification.title == "GOAL!"){
                return 'green2' ;
            }else{
                return 'yellow' ;
            }
          }else{
            return 'blue';
          }
    },
    parseDate(time) {
      return moment(time).format("DD MMMM YYYY");
    },
    parseTime(time) {
      return moment(time).format("hh:mm a");
    },
    onClickNotification(notification) {
      this.showNotifications = false;
      if (notification.status == Constants.NOTIFICATION.STATUS.UNREAD) {
        this.$io.emit("markNotificationAsRead", notification._id);
      }
      if (notification.filter_id) {
        this.$router.push("/scanner/live");
        this.$store.commit("updateSelectedFilter", notification.filter_id);
      } else if (notification.match_id) {
        this.$store.commit("updateSelectedMatch", notification.match_id);
      }
    }
  },
  computed: {
    returnNotifications() {
      return this.$store.getters.returnNotifications;
    }
  }
};
</script>

<style>


.not-text {
  /* background: #64D072;  */
  background: #cae0d1;
  border-left: 10px solid #64d072;
  width: 90%;
  min-height: 65px;
  padding: 7px 12px;
  position: relative;
  top: 80px;
  margin: auto;
  display: block;
  border-radius: 5px;
  margin-bottom: 15px;
}
.not-text.unread {
  background: #64d072;
}
.not-text.unread .img-box {
  background: #fff;
}
.not-text.unread .box-text h4 {
  color: #fff;
}
.not-text.unread .box-text p {
  color: #fff;
}
.not-text.unread .not-text-2 p {
  color: #fff;
}
.not-text-1 {
  width: 80%;
  float: left;
}

.box-text {
  padding-top: 5px;
}

.box-text h4 {
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0;
  margin-top: 0;
  font-family: "Poppins", sans-serif;
}

.box-text p {
  font-weight: 500;
  margin-bottom: 0;
  margin-top: 3px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}

.img-box {
  background: #64d072;
  width: 75px;
  min-height: 50px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
  float: left;
  margin-right: 12px;
  border-radius: 7px;
}

.img-box img {
  width: 32px;
}

.not-text-2 {
  width: 20%;
  float: left;
  text-align: right;
  padding-right: 15px;
}

.not-text-2 p {
  color: #233a59;
  font-weight: 500;
  margin-bottom: 0;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
}

.not-text-2 p svg {
  vertical-align: middle;
  margin-right: 8px;
}

.load-btn {
  display: block;
  margin: auto;
  width: 15%;
  position: relative;
  top: 80px;
  margin-bottom: 40px;
}

.load-btn a {
  background-color: #64d072;
  width: 100%;
  min-height: 46px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  -webkit-box-pack: center !important;
  -webkit-justify-content: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
  margin-top: 32px;
  letter-spacing: 1px;
}
</style>
