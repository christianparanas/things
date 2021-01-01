<template>
  <div class="container">
  <div class="">h</div>
    <button @click="auth" class="login">Google Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provider: new this.$fireModule.auth.GoogleAuthProvider()
    }
  },
  async beforeCreate() {
      await this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    async auth() {

      await this.$fire.auth.signInWithPopup(this.provider).then((result) => {
        var credential = result.credential;

        var user = this.$fire.auth.currentUser;
        if(user) {
          this.$router.push('/')
        }
      }).catch((error) => {
        console.log('popup closed')
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
