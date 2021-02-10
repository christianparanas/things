<template>
  <div class="main-container">
    <Nav :user="user" />
    <div v-if="haveNewPost" class="refreshNewPosts" @click="tapNew">
      <svg class="w-6 h-6" style="display: inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
      Tap to load updates!
    </div>
    <NuxtLink to="compose">
    <div class="createBtn shadow">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path></svg>
    </div>
    </NuxtLink>


    <div class="posts-wrapper">
      <div class="skel " v-for="skel in indexSkeleton" v-if="postsArr.length > 0 ? false: true">
        <div class="r animate-pulse"></div>
        <div class="c">
          <div class="ca animate-pulse"></div>
          <div class="cb">
            <div class="cba animate-pulse"></div>
            <div class="cbb animate-pulse"></div>
          </div>
        </div>
      </div>
      <Post :post="post" v-for="post in postsArr" :key="post.id" @fetchAllPosts="fetchAllPosts" />
      
    </div>
  </div>
</template>

<script>
export default {
    transition: 'home',
    data() {
      return {
        user: '',
        fireDB: this.$fireModule.firestore(),
        postsArr: [],
        userInput: '',
        postsNumberInFire: 0,
        showCompose: false,
        haveNewPost: false,
        postOp: false,
        indexSkeleton: [1, 2, 3, 4, 5],
      }
    },
    beforeDestroy() {
      this.offline(this.user.displayName)
    },
    updated() {
      this.updatesFire()
		},
    // fetch all data from users and call updates hint
    mounted() {
       this.checkIfUserAlreadyInUsers()
       this.forceOff()
       this.$store.commit('setId', {
        publicID: "null"
      })
    },
    created() {
      document.addEventListener('visibilitychange', this.browserInactive, false)
    },
    methods: {
      browserInactive(e) {
        if(document.hidden == true) {
          this.offline(this.user.displayName)
          console.log('offline')
        } else {
          this.online(this.user.displayName)
        }
      },
      offline(name) {
        this.fireDB.collection("users").doc(`${name}`).update({isOnline: false});
      },
      online(name) {
        this.fireDB.collection("users").doc(`${name}`).update({isOnline: true});
      },
      closeOpenSpecificOp(id) {
        return this[id] = true
      },
      closePostOp() {
        this.postOp = false
      },
      tapNew() {
        this.fetchAllPosts()
        this.haveNewPost = false
      },
      showComposeWindow() {
        this.showCompose = !this.showCompose
        // this.$refs.createPost.focus();
      },
      forceOff() {
        setTimeout(() => {
          this.offline(this.user.displayName)
        }, 30000)
      },

      // fetch all posts
      fetchAllPosts() {
        this.postsArr = []
        this.fireDB.collection("posts")
        .orderBy("postId", "desc")
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.postsArr.push(doc.data());
          });

          // replace content newline with a <br /> to render it a newline
          this.postsArr.forEach(obj =>  {
            obj.content = obj.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
          })
        });

        this.closePostOp()
      },
      // this will save the current user to the users collection, if they're not in collection yet
      saveUserInfo() {
        this.fireDB.collection("users").doc(this.user.displayName).set({
          uid: this.user.uid,
          userPic: this.user.photoURL,
          name: this.user.displayName,
          role: `${this.user.email === 'christiannparanas@gmail.com' ? 'admin': 'user'}`,
          isOnline: true,
          creationDate: this.user.metadata.creationTime
        })
      },
      // check if user is already in users collection, if not add them
      checkIfUserAlreadyInUsers() {
        this.fireDB.collection("users")
        .doc(`${this.user.displayName}`).get()
        .then(doc => {
          console.log(doc)
          if(!doc.exists) {
            this.saveUserInfo()
          }
        })
      },
      dynaImg(photo) {
        return photo
      },
      // call this function if there are new posts made by the other users
      updatesFire() {
        this.fireDB.collection("posts")
        .onSnapshot((doc) => {
          if(doc.size !== this.postsArr.length) {
            this.haveNewPost = true
          } else {
            this.haveNewPost = false
          }
          this.postsNumberInFire = doc.size
        });
      },
    },
    // before create check if user is authenticated
    beforeCreate() {
      this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = this.$fire.auth.currentUser
        window.onbeforeunload = (e) => {
          this.offline(this.user.displayName)
        }
        this.fetchAllPosts()
      } else {
        this.$router.push('/login')
      }
      })
    },
}
</script>

<style lang="scss" scoped>


  .home-enter-active, .home-leave-active { transition: opacity .3s; }
  .home-enter, .home-leave-active { opacity: 0; }

  .main-container {

    .createBtn {
      position: fixed;
      bottom: 40px;
      right: 20px;
      background-color: teal;
      padding: 20px;
      border-radius: 50%;

      svg {
        fill: #fff;
      }
    }

    .refreshNewPosts {
      position: fixed;
      z-index: 2;
      background-color: teal;
      left: 0;
      right: 0;
      top: 70px;
      margin-left: auto;
      margin-right: auto;
      width: fit-content;
      padding: 3px 10px;
      border-radius: 4px;
    }


    -webkit-tap-highlight-color: transparent;

    .createFireDB, .retrieveData {
      cursor: pointer;
    }

    .posts-wrapper {
      padding: 70px 0;

      .skel {
        padding: 10px 20px;
        background-color: #15202B;
        height: 148px;
        border-bottom: 1px solid #2d3748;

        display: flex;

        .r {
          background-color: #2d3748;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .c {


          .ca {
            margin-top: 10px;
            border-radius: 3px; 
            background-color: #2d3748;
            width: 150px;
            height: 12px;
          }

          .cb {
            margin-top: 30px;

            .cba {
              width: 200px;
              margin-bottom: 5px;
            }

            .cbb {
              width: 195px;
            }
          }

          .cb > div {
            border-radius: 3px; 
            background-color: #2d3748;
            height: 12px;
          }
        }
      }

      h1 {
        font-size: 20px;
        margin-bottom: 5px;
      }

      .postSkeleton {
        background-color: #2d3748;
      }

      .borderBottom {
        border-top: 1px solid #73838F;
      }
    }
  }

</style>
