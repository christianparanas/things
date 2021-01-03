<template>
	<div class="user-wrapper">
		<div class="userHero">
			<div class="img_wrapper">
				<vue-particles color="#dedede" :clickEffect="false"></vue-particles>
				<img :src="dynaImg(userDetails.photoURL)" alt="waray">
			</div>
			<div class="userCre">
				<div class="username">{{ userDetails.displayName }}<svg class="w-6 h-6" height="2500" viewBox="0 0 512 512" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z" fill="#1da1f2"/></svg>
				</div></div>
				<div class="user_email">{{ userDetails.email }}</div>
		</div>
		

		<div class="userPosts">
			<div class="posts-wrapper">
			<div class="">Your Posts</div>
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
        <div class="post_interact">
          <div class="post_inter">
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
			<button>Go back</button>
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
			}
		},
		async asyncData({ params }) {
			const userId = params.user			

			return {
				userId: userId
			}
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
		mounted() {
			this.fetchUserPosts()
			console.log(this.userId)
		},
		methods: {
			dynaImg(photo) {
        return photo
      },
			fetchUserPosts() {
				this.userPosts = []
		    this.fireDB.collection("posts")
		    .where("uid", "==", this.userId)
		    .orderBy("date", "desc")
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

		.userHero {
			padding: 20px;

			.img_wrapper {
				height: 100px;
				
				img {
					position: relative;
					top: -160px;
					margin: 0 auto;
					border-radius: 50%;
				}
			}

			.userCre {
				margin-top: 50px;

				.username {
					font-size: 18px;
					display: flex;

					svg {
						margin-left: 5px;
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