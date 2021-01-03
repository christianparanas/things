<template>
  <div class="main-container">
    <Nav :user="user" />

    <div class="create">
      <div class="createClick">
        <img v-cloak :src="dynaImg(user.photoURL)" alt="">
        <div @click="showComposeWindow" class="openCreate">What's on your mind?</div>
<!--         
         -->
      </div>
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
        <div class="post_interact">
          <div class="post_inter">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
            <div class="post_in">Like</div>
          </div>
          <div class="post_inter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M12,2C6.486,2,2,5.589,2,10c0,2.908,1.898,5.516,5,6.934V22l5.34-4.005C17.697,17.852,22,14.32,22,10 C22,5.589,17.514,2,12,2z M12,16h-0.333L9,18v-2.417l-0.641-0.247C5.67,14.301,4,12.256,4,10c0-3.309,3.589-6,8-6s8,2.691,8,6 C20,13.309,16.411,16,12,16z"></path></svg>
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
        showCompose: false
      }
    },
    // fetch all data from users and call updates hint
    beforeMount() {
       this.fetchAllPosts()
       this.updatesFire()
    },
    methods: {
      showComposeWindow() {
        this.showCompose = !this.showCompose
        // this.$refs.createPost.focus();
      },
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
          this.showComposeWindow()
        }
      },
      // fetch all posts
      fetchAllPosts() {
        this.postsArr = []
        this.fireDB.collection("posts")
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.data().content.replace(/(?:\r\n|\r|\n)/g, '<br />'))
            this.postsArr.push(doc.data());
          });

          // replace content newline with a <br /> to render it a newline
          this.postsArr.forEach(obj =>  {
            obj.content = obj.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
          })
        });
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
        }

        .post_interact {
          margin: 20px 5px 0;
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
              padding-top: 2px;
            }

            svg {
              margin-right: 5px;
            }
          }
        }
      }
    }

    .create {
      padding: 20px;

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
