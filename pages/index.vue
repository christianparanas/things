<template>
  <div class="main-container">
    <Nav :user="user" />
    
    <button @click="signOut" class="logout">Logout</button>
  </div>
</template>

<script>
export default {
    data() {
      return {
        user: ''
      }
    },
    async beforeCreate() {
      await this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = this.$fire.auth.currentUser
        console.log(this.$fire.auth.currentUser)
      } else {
        this.$router.push('/auth/login')
      }
    })
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut().then(() => {
        console.log('sign out success!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {


    .login {
      padding: 5px 10px;
      cursor: pointer;
      webkit-tap-highlight-color: transparent;

    }

    .logout {
      padding: 5px 10px;
      cursor: pointer;
      border: 1px solid pink;
      webkit-tap-highlight-color: transparent;
    }
  }

</style>
