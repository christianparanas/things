<template>
  <div class="main-container">
    <Nav :user="user" />
    <div v-if="haveNewPost" class="refreshNewPosts" @click="tapNew">
      <svg class="w-6 h-6" style="display: inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
      Tap to load updates!
    </div>

    <div class="create">
      <div class="createClick">
        <img v-cloak :src="dynaImg(user.photoURL)" alt="">
        <div class="createWindow" >
          <div class="create_nav">
            <div class="">Write Post</div>
            <button class="" @click="newPost">Post</button>
              <textarea ref="createPost" v-model="userInput" placeholder="Write something" name="" cols="100%" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="posts-wrapper">
      <h1>Feed</h1>
      <hr>
      <div class="" v-if="postsArr.length > 0 ? false: true">
        No Posts!
      </div>
      <div class="post shadow" v-for="post in postsArr" v-if="postsArr" :key="post.postId">
        <div class="post_details">
          <NuxtLink :to="dynaImg(post.uid)">
            <img :src="dynaImg(post.userPic)" alt="">
          </NuxtLink>
          <div class="postLink">
              <NuxtLink :to="dynaImg(post.uid)" class="author">{{ post.author }}
                <svg class="w-4 h-4" style="display: inline-block" height="2500" viewBox="0 0 512 512" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"/></svg>
              </NuxtLink>
            <div class="postDate">{{ post.date }}</div>
          </div>
          <svg v-if="!post.openCloseOpIcon" @click="post.openCloseDelButton = !post.openCloseDelButton; post.openCloseOpIcon = !post.openCloseOpIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          <svg v-if="post.openCloseOpIcon" @click="post.openCloseDelButton = !post.openCloseDelButton; post.openCloseOpIcon = !post.openCloseOpIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div class="postOptions" @click="deletePost(post.postId); fetchAllPosts()" v-if="post.openCloseDelButton" :key="post.postId">
            <svg class="w-5 h-5" style="display: inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Delete
          </div>
        </div>

        <div class="content" v-html="post.content"></div>
<!--            {{ post.likes > 1 ? 'likes' : 'like' }} -->
        <div class="post_interact">
          <div class="post_inter">
            <div @click="updateLikes(post.likes, post.postId); post.likes++">
              <ToogleFavorite />
            </div>
            <div class="postLikes" v-if="post.likes">{{ post.likes }}</div>
          </div>
          <div class="post_inter">
            <svg class="w-6 h-6" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12,2C6.486,2,2,5.589,2,10c0,2.908,1.898,5.516,5,6.934V22l5.34-4.005C17.697,17.852,22,14.32,22,10 C22,5.589,17.514,2,12,2z M12,16h-0.333L9,18v-2.417l-0.641-0.247C5.67,14.301,4,12.256,4,10c0-3.309,3.589-6,8-6s8,2.691,8,6 C20,13.309,16.411,16,12,16z"></path></svg>
            <div class="postComments" v-if="post.likes">{{ post.likes }}</div>
          </div>
          <div class="post_inter">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            <div class="postShares" v-if="post.likes">{{ post.likes }}</div>
          </div>
        </div>
      </div>
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
      }
    },
    updated() {
			console.log("new update dom")
      this.updatesFire()
		},
    // fetch all data from users and call updates hint
    mounted() {
       this.checkIfUserAlreadyInUsers()
    },
    methods: {
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
            this.postsArr.push(doc.data());
          });

          // replace content newline with a <br /> to render it a newline
          this.postsArr.forEach(obj =>  {
            obj.content = obj.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
          })
        });

        this.closePostOp()
      },
      deletePost(postId) {
        if(this.user.email == "christiannparanas@gmail.com") {
          this.fireDB.collection("posts").doc(`${postId}`).delete()
          .then(function() {
              console.log("Document successfully deleted!");
          })
          .catch(function(error) {
              console.error("Error removing document: ", error);
          });
        } else {
          alert('Please contact the admin to delete this post, thank you!')
        }
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

          this.fetchAllPosts()
          this.userInput = ''
          this.showComposeWindow()
        }
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
        console.log(this.postsArr.length)
        this.fireDB.collection("posts")
        .onSnapshot((doc) => {
          console.log(doc)
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
        console.log(this.user)
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
      padding: 10px 20px 40px;

      h1 {
        font-size: 20px;
        margin-bottom: 5px;
      }

      hr {
        border-top: 1px solid #2d3748;
      }

      .postSkeleton {
        background-color: #2d3748;
      }

      .post {
        margin: 12px 0 0;
        padding: 5px 5px 0;
        background-color: #2d3748;
        border-radius: 5px;


        .post_details {
          display: grid;
          grid-template-columns: 60px 1fr 30px;
          position: relative;

          svg {
            margin-top: 5px;
            cursor: pointer;
          }

          .postOptions {
            position: absolute;
            top: 5px;
            right: 45px;
            background-color: #ED5E68;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;

            svg {
              margin-bottom: 2px;
            }
          }

          img {
            margin: 10px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }

          .postLink {
            padding-top: 10px;

            .postDate {
              font-size: 8px;
              top: 40px;
              left: 65px;
            }

            .author {
              margin-top: 20px;

              padding-top: 10px;
              width: fit-content;

              svg {
                margin-bottom: 3px;
              }
            }
          }
        }

        .content {
          font-size: 12px;
          padding: 0 10px;
          margin: 10px 0;
          word-wrap: break-word;
          margin-bottom: 10px;
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
          margin: 0 5px 0;
          padding: 10px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;

          .post_inter {
            font-size: 13px;
            display: flex;
            width: fit-content;
            margin: 0 auto;
            cursor: pointer;
            position: relative;

            .postLikes, .postComments, .postShares {
              font-size: 10px;
              margin-left: 10px;
              margin-top: 3px;
              position: absolute;
              right: -12px;
            }

            .postLikes {
              right: -16px;
            }

            button {
              background: none;
              border: none;
              padding: 0;
              outline: inherit;
              cursor: pointer;
              position: relative;
              z-index: 1;
            }

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
      padding: 100px 20px 20px;

      .menuTrans-enter-active, .menuTrans-leave-active {
        transition: opacity .5s;
      }

      .createWindow {
        position: relative;
        z-index: 1;
        background-color: #1a202c;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0 0 20px 10px;

        .create_nav {
          display: grid;
          border-bottom: 1px solid #2d3748;
          padding-bottom: 10px;
          grid-template-columns: 1fr 1fr;

          button {
            width: fit-content;
            place-self: end;
            border-radius: 4px;
            background-color: #7C3AED;
            padding: 2px 15px;
            outline: none;
          }


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
            margin-top: 10px;
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
