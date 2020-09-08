<template>
  <div id="Auth_Form_Container">
    <div id="Auth_Form">
      <h1 class="authHead">Sign up</h1>
      <input
        placeholder="First Name"
        v-model="name"
        v-validate="'required'"
        class="form-control"
        type="text"
      />
      <input
        placeholder="Phone Number"
        v-model="telephone"
        v-validate="'required'"
        class="form-control"
        type="text"
      />
      <input
        placeholder="Email"
        v-model="email"
        v-validate="'required'"
        class="form-control"
        type="text"
      />
      <input
        placeholder="Password"
        v-model="password"
        v-validate="'required'"
        class="form-control"
        type="password"
      />
      <button class="auth_submit btn-default" @click="onClickSignup">Sign up</button>
      <p class="form-last-row">
        <a href="/login">Already have an account? Login here</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      telephone: ""
    };
  },
   mounted() {
      // console.log("WHAT");
      window.location = "https://soccersignals.pro/login/";
    },
  methods: {
    onClickSignup() {
      let payload = {
        email: this.email,
        password: this.password,
        name: this.name,
        telephone: this.telephone
      };
      this.sendSignupRequest(payload);
    },
    sendSignupRequest(payload) {
      this.$store.dispatch("signupAndLogin", payload);
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
