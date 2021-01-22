<template>
    <div class="create">
    <div class="op">
      <NuxtLink to="/">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </NuxtLink>
      <button class="" @click="newPost">Post</button>
    </div>
    <div class="createInterface">
      <img v-cloak :src="dynaImg(user.photoURL)" alt="">
      <textarea ref="createPost" v-model="userInput" placeholder="What's in your mind?" name="" cols="100%" rows="5"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: [],
        userInput: "",
        fireDB: this.$fireModule.firestore(),
        postsNumberInFire: 0,
      }
    },
    updated() {
      this.updatesFire()
    },
    methods: {
      dynaImg(photo) {
        return photo
      },
      newPost() {
        if(this.userInput) {
          this.fireDB.collection("posts").doc(`${this.postsNumberInFire + 1}`).set({
            postId: this.postsNumberInFire + 1,
            uid: this.user.uid,
            userPic: this.user.photoURL,
            author: this.user.displayName,
            content: this.userInput,
            date: new Date().toLocaleString(),
            likes: 0,
            openCloseDelButton: false,
            openCloseOpIcon: false
          })

          this.userInput = ''
          this.$router.push('/')
        }
      },
      updatesFire() {
        this.fireDB.collection("posts")
        .onSnapshot((doc) => {
          this.postsNumberInFire = doc.size
        });
      },
    },
    beforeCreate() {
      this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = this.$fire.auth.currentUser
      } else {
        this.$router.push('/login')
      }
      })
    },
  }
</script>


<style lang="scss" scoped>
  .create {

      .op {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #2d3748;
        padding: 15px 20px;

        button {
          background-color: #7C3AED;
          padding: 2px 15px;
          border-radius: 5px;
          outline: none;
        }
      }

      .createInterface {
        padding: 20px 0px 10px 20px;
        display: grid;
        grid-template-columns: 55px 1fr;

        img {
          border-radius: 50%;
        }

        textarea {
          background-color: transparent;
          border-bottom: 1px solid #2d3748;
          margin: 15px 20px;
          outline: 0;
        }
      }

      .menuTrans-enter-active, .menuTrans-leave-active {
        transition: opacity .5s;
      }
  }
</style>