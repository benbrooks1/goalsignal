<template>
  <div id="Auth_Form_Container">
    <loading
      class="auth-screen-loader"
      :active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    ></loading>
    <div id="Auth_Form">
      <h1 class="authHead">Login</h1>
      <input
        placeholder="email"
        v-model="email"
        v-validate="'required'"
        class="form-control"
        type="text"
      />

      <input
        placeholder="password"
        v-model="password"
        v-validate="'required'"
        class="form-control"
        type="password"
      />
      <a href="/forgot-password">Forgot Password?</a>
      <button class="auth_submit" @click="onClickLogin">Login</button>
      <p class="form-last-row">
        <a href="/signup">Don't have an account? Signup</a>
      </p>
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      isLoading: false
    };
  },
  components: {
    Loading
  },
   mounted() {
      // console.log("WHAT");
      window.location = "https://soccersignals.pro/login/";
    },
  methods: {
    onClickLogin() {
      let payload = {
        email: this.email,
        password: this.password
      };
      this.sendLoginRequest(payload);
    },

    sendLoginRequest(payload) {
      this.isLoading = true;
      this.$store
        .dispatch("doLogin", payload)
        .then(resp => {
          if (resp.success) {
            this.isLoading = false;
            toastr.success(resp.message);
          } else {
            this.isLoading = false;
            toastr.error(
              resp.message.response
                ? resp.message.response.data.err.error
                : "Something went wrong"
            );
          }
        })
        .catch(err => {
          this.$toaster.error(err);
        });
    }
  }
};
</script>
<style>
.authHead {
  text-align: center;
}
div#Auth_Form {
  display: grid;
  background-color: #f3f3f3;
  grid-row-gap: 15px;
  padding: 20px;
  -webkit-box-shadow: 5px 10px #888888;
  border: 2px solid #afafaf;
  box-shadow: 5px 10px 10px #888888;
}
#Auth_Form > input {
  font-family: "proxima_nova_ltsemibold";
}
#Auth_Form_Container {
  display: grid;
  min-width: 100vw;
  min-height: 100vh;

  grid-template-columns: 400px;
  -ms-flex-line-pack: center;

  align-content: center;
  justify-content: center;
}
</style>
