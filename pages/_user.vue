<template>
	<div class="user-wrapper">
		<div class="userHero">
			<div class="img_wrapper">
				<vue-particles color="#dedede" :clickEffect="false"></vue-particles>
				<img v-if="isCreLoad" :src="dynaImg(userCredential[0].userPic)" alt="waray">
			</div>
			<div class="userCre">
				<div v-if="isCreLoad" class="username">{{ userCredential[0].name  }}<svg class="w-5 h-5" height="2500" viewBox="0 0 512 512" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"/></svg>
				</div></div>
				<div class="follow">
					<div class="following">30 Following</div>
					<div class="followers">10 Followers</div>
				</div>
		</div>
		

		<div class="userPosts">
			<div class="posts-wrapper">
      <hr>
      <div class="post" v-for="post in userPosts" :key="post.postId">
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
		<NuxtLink to="/">
			<div class="back">
				<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>
	</div>
</template>


<script>
	export default {
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
      	} else {
        	this.$router.push('/auth/login')
      	}
    	})
  	},
  	created() {
  		this.userCre()
  	},
		mounted() {
			this.updatesFire()
			
		},
		methods: {
			// update like on each post onclick
      updateLikes(prev, postId) {
        this.fireDB.collection("posts").doc(`${postId}`).update({likes: prev + 1});
      },
      updatesFire() {
        this.fireDB.collection("posts")
        .onSnapshot((doc) => {
          this.postsNumberInFire = doc.size
          this.fetchUserPosts()
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
	.user-wrapper {

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
			padding: 20px;

			.follow {
				margin-top: 0px;
					display: flex;
					text-align: center;
					justify-content: center;
					font-size: 10px;
					padding: 0 20px;

					.following, .followers {
						padding: 2px 5px;
					}
			}

			.img_wrapper {
				height: 100px;
				
				img {
					position: relative;
					top: -130px;
					margin: 0 auto;
					border-radius: 50%;
				}
			}

			.userCre {
				margin-top: 70px;
				display: grid;
				place-items: center;

				.username {
					text-align: center;
					font-size: 18px;
					display: flex;

					svg {
						margin: 6px 0 0 5px;
					}
				}


			}
		}

		.userPosts {

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
              padding-bottom: 4px;
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