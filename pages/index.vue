<template>
  <div class="main-container">
    <Nav :user="user" />
    <vue-particles class="particle" color="#dedede" :clickEffect="false"></vue-particles>

    <div class="create">
      <div class="createClick">
        <img v-cloak :src="dynaImg(user.photoURL)" alt="">
        <div @click="showComposeWindow" class="openCreate">What's on your mind?</div>
<!--         
         -->
      </div>
      <transition name="menuTrans">
      <div class="createWindow" v-if="showCompose">
        <div class="create_nav">
          <div @click="showComposeWindow" class="">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h14"></path></svg>
          </div>
          <div class="">Create Post</div>
          <div class="" @click="newPost">Post</div>
            <textarea ref="createPost" v-model="userInput" placeholder="Write something" name="" cols="100%" rows="5"></textarea>
        </div>
      </div>
      </transition>
    </div>

    <div class="posts-wrapper">
      <hr>
      <div class="post" v-for="post in postsArr" :key="post.postId">
        <div class="post_details">
          <img :src="dynaImg(post.userPic)" alt="">
          <div class="">
            <div class="author">{{ post.author }}</div>
            <div class="postDate">{{ post.date }}</div>
          </div>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </div>
        <div class="content" v-html="post.content"></div>
        <div v-if="post.likes" class="likes">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1501.7 1504.4" width="2496" height="2500"><style>.st0{fill:#5e91ff}.st1{fill:#fff}</style><title>Like</title><ellipse class="st0" cx="750.8" cy="752.2" rx="750.8" ry="752.2"/><path class="st1" d="M378.3 667.5h165.1c13 0 23.6 10.5 23.6 23.6v379.1c0 13-10.5 23.6-23.6 23.6H378.3c-13 0-23.6-10.5-23.6-23.6V691c.1-13 10.6-23.5 23.6-23.5zM624.7 1004.7V733.1c.1-66.9 18.8-132.4 54.1-189.2 21.5-34.4 69.7-89.5 96.7-118 6-6.4 27.8-25.2 27.8-35.5 0-13.2 1.5-34.5 2-74.2.3-25.2 20.8-45.9 46-45.7h1.1c44.1.8 58.2 41.6 58.2 41.6s37.7 74.4 2.5 165.4c-29.7 76.9-35.8 83.1-35.8 83.1s-9.6 13.9 20.8 13.3c0 0 185.6-.8 192-.8 13.7 0 57.4 12.5 54.9 68.2-1.8 41.2-27.4 55.6-40.5 60.3-1.7.6-2.6 2.5-1.9 4.2.3.7.8 1.3 1.5 1.7 13.4 7.8 40.8 27.5 40.2 57.7-.8 36.6-15.5 50.1-46.1 58.5-1.7.4-2.8 2.2-2.3 3.9.2.9.8 1.6 1.5 2 11.6 6.6 31.5 22.7 30.3 55.3-1.2 33.2-25.2 44.9-38.3 48.9-1.7.5-2.7 2.3-2.2 4 .2.7.7 1.4 1.3 1.8 8.3 5.7 20.6 18.6 20 45.1-.3 14-5 24.2-10.9 31.5-9.3 11.5-23.9 17.5-38.7 17.6l-411.8.8c-.1-.1-22.4 0-22.4-29.9z"/></svg>
          {{ post.likes }}
        </div>
<!--            {{ post.likes > 1 ? 'likes' : 'like' }} -->
        <div class="post_interact">
          <div class="post_inter" @click="updateLikes(post.likes, post.postId)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
            <div class="post_in">Like</div>
          </div>
          <div class="post_inter">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M12,2C6.486,2,2,5.589,2,10c0,2.908,1.898,5.516,5,6.934V22l5.34-4.005C17.697,17.852,22,14.32,22,10 C22,5.589,17.514,2,12,2z M12,16h-0.333L9,18v-2.417l-0.641-0.247C5.67,14.301,4,12.256,4,10c0-3.309,3.589-6,8-6s8,2.691,8,6 C20,13.309,16.411,16,12,16z"></path></svg>
            <div class="post_in">Comment</div>
          </div>
        </div>
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
        postsNumberInFire: 0,
        showCompose: false,

      }
    },
    // fetch all data from users and call updates hint
    mounted() {
       this.updatesFire()
       this.checkIfUserAlreadyInUsers()
    },
    methods: {
      showComposeWindow() {
        this.showCompose = !this.showCompose
        // this.$refs.createPost.focus();
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
          })

          this.userInput = ''
          this.showComposeWindow()
        }
      },
      // update like on each post onclick
      updateLikes(prev, postId) {
        this.fireDB.collection("posts").doc(`${postId}`).update({likes: prev + 1});
      },

      // fetch all posts
      fetchAllPosts() {
        this.postsArr = []
        this.fireDB.collection("posts")
        .orderBy("postId", "desc")
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.data())
            // console.log(doc.data().content.replace(/(?:\r\n|\r|\n)/g, '<br />'))
            this.postsArr.push(doc.data());
          });

          // replace content newline with a <br /> to render it a newline
          this.postsArr.forEach(obj =>  {
            obj.content = obj.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
          })
        });
      },
      // this will save the current user to the users collection, if they're not in collection yet
      saveUserInfo() {
        this.fireDB.collection("users").doc(`${this.user.displayName}`).set({
          uid: this.user.uid,
          userPic: this.user.photoURL,
          name: this.user.displayName,
        })
      },
      // check if user is already in users collection, if not add them
      checkIfUserAlreadyInUsers() {
        this.fireDB.collection("users")
        .get(this.user.displayName)
        .then(doc => {
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
          this.postsNumberInFire = doc.size
          this.fetchAllPosts()
        });
      },
    },
    // before create check if user is authenticated
    beforeCreate() {
      this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = this.$fire.auth.currentUser
        } else {
          this.$router.push('/auth/login')
        }
      })
    },
}
</script>

<style lang="scss" scoped>
  

  .main-container { 

    .particle {

    }

    -webkit-tap-highlight-color: transparent;

    .createFireDB, .retrieveData {
      cursor: pointer;
    }

    .posts-wrapper {
      padding: 30px 20px;

      hr {
        border-top: 1px solid #2d3748;
      }

      .post {
        margin: 10px 0 0;
        padding: 5px 5px 0;
        background-color: #2d3748;
        border-radius: 5px;

        .post_details {
          display: grid;
          grid-template-columns: 60px 1fr 30px;

          img {
            margin: 10px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }

          .postDate {
            font-size: 8px;
            top: 40px;
            left: 65px;
          }

          .author {
            padding-top: 10px;
          }
        }

        .content {
          font-size: 12px;
          padding: 0 10px;
          margin: 10px 0;
          word-wrap: break-word;
          margin-bottom: 20px;
        }

        .likes {
          font-size: 10px;
          padding: 0 10px;
          display: flex;

          svg {
            margin-right: 3px;

            .st0{fill:#5e91ff}
            .st1{fill:#fff}
          }
        }

        .post_interact {
          margin: 5px 5px 0;
          padding: 10px 20px;
          display: grid;
          border-top: 1px solid grey;
          grid-template-columns: 1fr 1fr;

          .post_inter {
            font-size: 13px;
            display: flex;
            width: fit-content;
            margin: 0 auto;
            cursor: pointer;

            .post_in {
              padding-bottom: 3px;
            }

            svg {
              margin-right: 5px;
            }
          }
        }
      }
    }

    .create {
      padding: 0 20px 20px;

      .menuTrans-enter-active, .menuTrans-leave-active {
        transition: opacity .5s;
      }

      .createWindow {
        position: absolute;
        background-color: #1a202c;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 20px;

        .create_nav {
          display: grid;
          border-bottom: 1px solid #2d3748;
          padding-bottom: 10px;
          grid-template-columns: 30px 1fr 30px;


          img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }


          textarea {
            grid-column: 1 / span 3;
            padding: 10px 15px;
            outline: none;
            border: 0;
            border-radius: 5px;
            background-color: #2d3748;
            width:100%;
            margin-top: 20px;
          }
        }
      }

      .createClick {
        margin-top: 60px;
        display: flex;

        .openCreate {
          font-size: 11px;
          width: 100%;
          padding: 11px 15px 10px;
          outline: none;
          border: 0;
          border-radius: 5px;
          background-color: #2d3748;
        }

        img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
      }
    }
  }

</style>
