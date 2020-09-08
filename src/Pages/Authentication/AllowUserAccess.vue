<template></template>
<script>
export default {
  data() {
    return {
      payload: {
        user_id: this.$route.query.auth_id,
        email: this.$route.query.auth_email,
        thriveCart: true
      }
    };
  },
  mounted() {
    this.doLogin();
  },
  methods: {
    doLogin() {
      this.$store.dispatch("doLogin", this.payload);
    }
  }
};
</script>
<style></style>
