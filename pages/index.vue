<template>
  <div class="container">
    <div class="login">Home</div>
    <div class="user">{{ user }}</div>
    <div @click="signOut" class="logout">Logout</div>
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
        this.user = this.$fire.auth.currentUser.email
      } else {
        this.$router.push('/login')
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
  .container {
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;

    .login {
      padding: 5px 10px;
      cursor: pointer;

    }

    .logout {
      padding: 5px 10px;
      cursor: pointer;
      border: 1px solid pink;
    }
  }

</style>
