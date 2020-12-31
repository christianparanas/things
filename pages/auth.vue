<template>
  <div class="container">
    <div @click="auth" class="login">Google Login</div>
  </div>
</template>

<script>
export default {
  methods: {
    auth() {
      var provider = new this.$fireModule.auth.GoogleAuthProvider();
      this.$fire.auth.signInWithPopup(provider).then((result) => {
        var credential = result.credential;

        var user = this.$fire.auth.currentUser;

        console.log(user.email)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;

    .login {
      border: 1px solid gray;
      padding: 5px 10px;
      cursor: pointer;

    }
  }

</style>
