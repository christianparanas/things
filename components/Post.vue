<template>
	  <div class="post" v-if="post" :key="post.postId">
        <div class="post_details">
          <NuxtLink :to="dynaImg(post.uid)">
            <img :src="dynaImg(post.userPic)" alt="">
          </NuxtLink>
          <div class="postLink">
              <NuxtLink :to="dynaImg(post.uid)" class="author">{{ post.author }}
                <svg class="w-4 h-4" style="display: inline-block" height="2500" viewBox="0 0 512 512" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"/></svg>
              </NuxtLink>
            <div class="date">{{ $moment(post.date).fromNow() }}</div>
            <div class="username">@{{ post.author.replace(/ .*/, '').toLowerCase() }}</div>
          </div>
          <svg v-if="!post.openCloseOpIcon" @click="post.openCloseDelButton = !post.openCloseDelButton; post.openCloseOpIcon = !post.openCloseOpIcon" class="w-6 h-6" fill="none" stroke="#73838F" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          <svg v-if="post.openCloseOpIcon" @click="post.openCloseDelButton = !post.openCloseDelButton; post.openCloseOpIcon = !post.openCloseOpIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div class="postOptions" @click="deletePost(post.postId); fetchAllPosts()" v-if="post.openCloseDelButton" :key="post.postId">
            <svg class="w-5 h-5" style="display: inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Delete
          </div>
        </div>

        <div class="content" v-html="post.content"></div>
        <cld-image
              v-if="post.postImg != 'null'"
              class="postImg"
              :public-id="`${post.postImg}`"
              width="300"
              crop="scale"
              fetchFormat="auto"
              quality="auto"
              loading="lazy"
            />
        <div class="post_interact">
          <div class="post_inter">
            <svg class="w-6 h-6" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></svg>
            <div class="postComments" v-if="post.likes"></div>
          </div>
          <div class="post_inter">
            <svg class="w-6 h-6" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></svg>
            <div class="postShares" v-if="post.likes"></div>
          </div>
          <div class="post_inter">
            <div @click="updateLikes(post.likes, post.postId); post.likes++">
              <ToogleFavorite />
            </div>
            <div class="postLikes" v-if="post.likes">{{ post.likes }}</div>
          </div>
          <div class="post_inter">
            <svg class="w-6 h-6" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg>
            <div class="postShares" v-if="post.likes"></div>
          </div>
        </div>
      </div>
</template>


<script>
	
	export default{
		props: ['post'],
		data() {
			return {
				user: '',
				fireDB: this.$fireModule.firestore(),
			}
		},
		methods: {
			dynaImg(photo) {
        return photo
      },
      fetchAllPosts() {
      	this.$emit('fetchAllPosts')
      },
      updateLikes(prev, postId) {
        this.fireDB.collection("posts").doc(`${postId}`).update({likes: prev + 1});
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
		},
		    // before create check if user is authenticated
    beforeCreate() {
      this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = this.$fire.auth.currentUser
        console.log(this.user)
      } else {
        this.$router.push('/login')
      }
      })
    },
	}
</script>

<style lang="scss" scoped>
	      .post {
        padding: 5px 5px 0;
        border-bottom: 1px solid #2d3748;


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
              position: relative;
              top: -4px;
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

            .username {
              font-size: 12px;
              position: absolute;
              top: 30px;
              color: #73838F;
            }

            .date {
              font-size: 10px;
              display: inline;
              color: #73838F;
            }

            .author {
              margin-top: 20px;
              padding-top: 10px;
              width: fit-content;

              svg {
                margin-bottom: 8px;
              }
            }
          }
        }

        .content {
          font-size: 12px;
          padding: 0 10px 0 60px;
          margin: 5px 0 10px;
          word-wrap: break-word;
          margin-bottom: 10px;
        }

        .postImg {
          margin-left: 60px;
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
          padding: 15px 0 10px 53px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          place-items: left;

          .post_inter {
            font-size: 13px;
            display: flex;
            width: fit-content;
            cursor: pointer;
            position: relative;

            svg {
              fill: #73838F;
            }

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

</style>
