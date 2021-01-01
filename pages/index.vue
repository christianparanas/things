<template>
  <div class="main-container">
    <Nav :user="user" />

    
  </div>
</template>

<script>
export default {
    data() {
      return {
        user: ''
      }
    },
     beforeCreate() {
      this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = this.$fire.auth.currentUser
        console.log(this.$fire.auth.currentUser)
      } else {
        this.$router.push('/auth/login')
      }
    })
  },
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
