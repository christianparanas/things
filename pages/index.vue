<template>
  <div class="main-container">
    <Nav :user="user" />

    <div class="create">
      <form action="" @submit.prevent="postNewBlog">
        <input type="text" v-model="userInput">
        <button name="submit">Post</button>
      </form>
    </div>

    <div class="blogs-wrapper">
      <div class="blog" v-for="(blog, index) in blogsArr" :key="blog.index">
        <div class="author">{{ blog.author }}</div>
        <div class="content">{{ blog.content }}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
    data() {
      return {
        user: '',
        fireDB: this.$fireModule.firestore(),
        blogsArr: [],
        userInput: ''
      }
    },
    async beforeMount() {
       this.retrieveData()
    },
    methods: {
      postNewBlog() {
        this.fireDB.collection("users").add({
            author: this.user.displayName,
            content: this.userInput,
        })

        this.retrieveData()
      },

      async retrieveData() {
        this.blogsArr = []
        await this.fireDB.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.blogsArr.push(doc.data());
          });
        });
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

    .createFireDB, .retrieveData {
      cursor: pointer;
    }

    .blogs-wrapper {
      padding: 20px;

      .blog {
        padding: 20px 10px;
      }
    }

    .create {
      padding: 20px;

      form {

        input {
          color: black;
        }
      }
    }
  }

</style>
