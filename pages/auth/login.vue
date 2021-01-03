<template>
  <div class="container">
    <div class="">
      <button @click="googleAuth" class="login">Google Login</button>
      <button @click="facebookAuth" class="login">Facebook Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // init the modules
      facebookProvider: new this.$fireModule.auth.FacebookAuthProvider(),
      googleProvider: new this.$fireModule.auth.GoogleAuthProvider()
    }
  },
  // before create check if auth is valid
  beforeCreate() {
      this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    // google auth config
    googleAuth() {
      this.$fire.auth.signInWithPopup(this.googleProvider).then((result) => {
        var credential = result.credential;

        var user = this.$fire.auth.currentUser;
        if(user) {
          this.$router.push('/')
        }
      }).catch((error) => {
        console.log('popup closed')
      })
    },
    // facebook auth config
    facebookAuth() {
      this.$fire.auth.signInWithPopup(this.facebookProvider).then((result) => {
        var credential = result.credential;

        console.log(result.user)

        var user = this.$fire.auth.currentUser;
        if(user) {
          this.$router.push('/')
        }
      }).catch((error) => {
        console.log(error.code)
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
