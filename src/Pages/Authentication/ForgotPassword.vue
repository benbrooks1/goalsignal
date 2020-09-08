<template>
  <div id="Auth_Form_Container">
    <div id="Auth_Form">
      <h1 class="authHead">Forgot Password</h1>
      <input
        placeholder="email"
        v-model="email"
        v-validate="'required'"
        class="form-control"
        type="text"
      />
      <button class="auth_submit" @click="onForgotPassword">Submit</button>
      <p class="form-last-row">
        <a href="/login">Login</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: ""
    };
  },
   mounted() {
      // console.log("WHAT");
      window.location = "https://soccersignals.pro/login/";
    },
  methods: {
    onForgotPassword() {
      let payload = {
        email: this.email
      };
      this.$store.dispatch("forgotPassword", payload);
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
