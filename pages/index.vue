<template>
  <div class="main-container">
    <Nav :user="user" />

    <div class="create">
      <form action="" @submit.prevent="newPost">
        <input type="text" placeholder="Write something" v-model="userInput">
        <button name="submit">Post</button>
      </form>
    </div>

    <div class="posts-wrapper">
      <div class="title">Random Posts</div>
      <div class="post" v-for="post in postsArr" :key="post.postId">
        <div class="postDate">{{ post. date }}</div>
        <img :src="dynaImg(post.userPic)" alt="">
        <div class="author">{{ post.author }}</div>
        <div class="content">{{ post.content }}</div>
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
        postsArr: [],
        userInput: '',
        postsNumberInFire: 0
      }
    },
    // fetch all data from users and call updates hint
    beforeMount() {
       this.fetchAllPosts()
       this.updatesFire()
    },
    methods: {
      newPost() {
        if(this.userInput) {
          this.fireDB.collection("posts").add({
            postId: this.postsNumberInFire + 1,
            uid: this.user.uid,
            userPic: this.user.photoURL,
            author: this.user.displayName,
            content: this.userInput,
            date: new Date().toLocaleString()
          })

          this.userInput = ''
        }
      },
      // fetch all posts
      fetchAllPosts() {
        this.postsArr = []
        this.fireDB.collection("posts")
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.postsArr.push(doc.data());
          });
        });
      },

      dynaImg(photo) {
        return photo
      },
      // call this function if there are new posts made by the users
      updatesFire() {
        this.fireDB.collection("posts")
        .onSnapshot((doc) => {
          this.postsNumberInFire = doc.size
          this.fetchAllPosts()
        });
      },
    },
    // before create check if user authenticated
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

    .posts-wrapper {
      padding: 20px;

      .title {
        font-size: 20px;
      }

      .post {
        margin-top: 10px;
        padding: 10px 0;
        width: fit-content;
        display: grid;
        grid-template-columns: 50px 1fr;
        position: relative;
        z-index: -1;

        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        .postDate {
          position: absolute;
          font-size: 8px;
          top: 40px;
          left: 50px;
        }

        .author {
          padding-top: 10px;
        }

        .content {
          grid-column-start: 2;
          margin-top: 12px;
          padding: 5px 15px;
          width: fit-content;
          border-radius: 10px;
          font-size: 12px;
          border: 1px solid #2d3748;
        }
      }
    }

    .create {
      padding: 20px;

      form {
        margin-top: 100px;

        input {
          padding: 10px 15px;
          outline: none;
          border: 0;
          border-radius: 8px;
          background-color: #2d3748;
        }

        button {
          background-color: teal;
          padding: 10px 20px;
          border-radius: 8px;
        }
      }
    }
  }

</style>
