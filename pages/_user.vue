<template>
	<div class="user-wrapper">
    <NuxtLink to="compose">
    <div class="createBtn shadow">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path></svg>
    </div>
    </NuxtLink>
		<div class="userHero">
      <div class="cover"></div>
      <div class="userdetails">
			<div class="img_wrapper">
				<img v-if="isCreLoad" class="shadow" :src="dynaImg(userCredential[0].userPic)" alt="waray">
			</div>
			<div class="userCre">
				<div v-if="isCreLoad" class="username">{{ userCredential[0].name  }}<svg class="w-5 h-5" height="2500" viewBox="0 0 512 512" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"/></svg>
				</div>
        <div class="joinDate">
          join date
        </div>
      </div>
        <div class="interact">
          <div class="msg">
            <svg class="w-8 h-8" fill="none" stroke="#73838F" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
          </div>
          <div class="addFriend">
            <svg class="w-8 h-8" fill="none" stroke="#73838F" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>
        </div>
        </div>
		</div>


		<div class="userPosts">
			<div class="posts-wrapper">
      <hr>
      <div class="post" v-for="post in userPosts" :key="post.postId">
        <div class="post_details">
          <img :src="dynaImg(post.userPic)" alt="">
          <div class="">
            <div class="author">{{ post.author }}
              <svg class="w-4 h-4" style="display: inline-block" height="2500" viewBox="0 0 512 512" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"/></svg>
              <div class="date">{{ $moment(post.date).fromNow() }}</div></div>
            
            <div class="username">@{{ post.author.replace(/ .*/, '').toLowerCase() }}</div>
          </div>
          <svg v-if="!post.openCloseOpIcon" @click="post.openCloseDelButton = !post.openCloseDelButton; post.openCloseOpIcon = !post.openCloseOpIcon" class="w-6 h-6" fill="none" stroke="#73838F" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          <svg v-if="post.openCloseOpIcon" @click="post.openCloseDelButton = !post.openCloseDelButton; post.openCloseOpIcon = !post.openCloseOpIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div class="postOptions" @click="deletePost(post.postId); fetchUserPosts()" v-if="post.openCloseDelButton" :key="post.postId">
            <svg class="w-5 h-5" style="display: inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Delete
          </div>
        </div>
        <div class="content" v-html="post.content"></div>
        <div class="post_interact">
          <div class="post_inter">
            <svg class="w-6 h-6" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></svg>
            <div class="postComments" v-if="post.likes">{{ post.likes }}</div>
          </div>
          <div class="post_inter">
            <svg class="w-6 h-6" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></svg>
            <div class="postShares" v-if="post.likes">{{ post.likes }}</div>
          </div>
          <div class="post_inter">
            <div @click="updateLikes(post.likes, post.postId); post.likes++">
              <ToogleFavorite />
            </div>
            <div class="postLikes" v-if="post.likes">{{ post.likes }}</div>
          </div>
          <div class="post_inter">
            <svg class="w-6 h-6" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg>
            <div class="postShares" v-if="post.likes">{{ post.likes }}</div>
          </div>
        </div>
      </div>
    </div>
		</div>
		<NuxtLink to="/">
			<div class="back">
				<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>
	</div>
</template>


<script>
	export default {
		transition: 'home',
		data() {
			return {
				userPosts: [],
				fireDB: this.$fireModule.firestore(),
				userId: '',
				userDetails: [],
				userCredential: [],
				isCreLoad: false
			}
		},
		async asyncData({ params }) {
			const userId = params.user

			return {
				userId: userId
			}
		},
		updateLikes(prev, postId) {
        this.fireDB.collection("posts").doc(`${postId}`).update({likes: prev + 1});
      },
		beforeCreate() {
      this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userDetails = this.$fire.auth.currentUser
        	console.log(this.userDetails)
          this.fetchUserPosts()
      	} else {
        	this.$router.push('/login')
      	}
    	})
  	},
  	created() {
  		this.userCre()
  	},
		mounted() {
			this.updatesFire()
      this.userCre()
		},
		methods: {
      deletePost(postId) {
        if(this.userDetails.email == "christiannparanas@gmail.com") {
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
			// update like on each post onclick
      updateLikes(prev, postId) {
        this.fireDB.collection("posts").doc(`${postId}`).update({likes: prev + 1});
      },
      updatesFire() {
        this.fireDB.collection("posts")
        .onSnapshot((doc) => {
          this.postsNumberInFire = doc.size
        });
      },
			// get the user profile details
			userCre() {
				this.fireDB.collection("users")
				.where("uid", "==", this.userId)
				.get().then((querySnapshot) => {
        	querySnapshot.forEach((doc) => {
          	this.userCredential.push(doc.data());
        	});
      	}).then(() => {
      		this.isCreLoad = true
      	})
			},
			dynaImg(photo) {
        return photo
      },
      // fetch user posts
			fetchUserPosts() {
				this.userPosts = []
		    this.fireDB.collection("posts")
		    .where("uid", "==", this.userId)
		    .orderBy("postId", "desc")
		    .get().then((querySnapshot) => {
		      querySnapshot.forEach((doc) => {
		        // console.log(doc.data().content.replace(/(?:\r\n|\r|\n)/g, '<br />'))
		        this.userPosts.push(doc.data());
		      });

		      // replace content newline with a <br /> to render it a newline
		      this.userPosts.forEach(obj =>  {
		        obj.content = obj.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
		      })
		    });
		  },
		}
	}
</script>


<style lang="scss" scoped>
	.home-enter-active, .home-leave-active { transition: opacity .3s; }
  .home-enter, .home-leave-active { opacity: 0; }

	.user-wrapper {
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


		.back {
			position: absolute;
			top: 20px;
			left: 15px;
			background-color: #2d3748;
			width: fit-content;
			padding: 7px;
			border-radius: 50%;
		}

		.userHero {
      position: relative;

			.follow {
				margin-top: 0px;
					display: flex;
					font-size: 10px;

					.following, .followers {
						padding: 2px 5px;
					}
			}

      .cover {
        background-color: teal;
        height: 140px;
        width: 100%;
      }

      .userdetails {
        padding: 15px;
      }

      .interact {
        position: absolute;
        top: 150px;
        right: 20px;
        display: flex;
        
        .msg {
          margin-right: 10px;
        }

        .msg, .addFriend {
          svg {
            &:hover {
              stroke: #fff;
            }
          }
        }
      }

			.img_wrapper {

				img {
          width: 89px;
          height: 89px;
					position: relative;
					border-radius: 50%;
          top: -50px;
          border: 1px solid #15202B;
				}
			}

			.userCre {
				.username {
					font-size: 18px;
					display: flex;
          position: relative;
          top: -40px;

					svg {
						margin: 6px 0 0 5px;
					}
				}
			}
		}

		.userPosts {

			.posts-wrapper {
      padding: 30px 0;

      hr {
        border-top: 1px solid #2d3748;
      }

      .post {
        margin: 10px 0 0;
        padding: 5px 5px 0;
        border-bottom: 1px solid #2d3748;

        .post_details {
          display: grid;
          position: relative;
          grid-template-columns: 60px 1fr 30px;

          .postOptions {
            position: absolute;
            top: 0px;
            right: 45px;
            background-color: #ED5E68;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;

            svg {
              position: relative;
              top: -2px;
            }
          }

          img {
            margin: 10px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }

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
            padding-top: 10px;
          }
        }

        .content {
          font-size: 12px;
          padding: 0 62px;
          margin: 10px 0;
          word-wrap: break-word;
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
          grid-template-columns: 1fr 1fr 1fr 1fr;

          .post_inter {
            font-size: 13px;
            display: flex;
            width: fit-content;
            margin: 0 auto;
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
    }
		}
	}

</style>
