<template>
	<div class="users_container">
		<NuxtLink to="/">
			<div class="back">
				<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>

		<div class="users" v-if="userFetchComplete">
			<div class="title">Users</div>
			<NuxtLink v-if="user.uid != use.uid" :to="toUserProfile(use.uid)" class="user" v-for="(use, index) in users" :key="use.uid">
				<img :src="dynaImg(use.userPic)" alt="">
				<div class="name">{{ use.name }}<div v-if="use.role == 'admin' ? true: false" class="adminBadge">admin</div></div>
				<div class="isOnline" v-if="use.isOnline"><div class="isOn"></div></div>
			</NuxtLink>
		</div>

	</div>
</template>


<script>
	export default {
		transition: 'home',
		data() {
			return {
				user: '',
				users: [],
				fireDB: this.$fireModule.firestore(),
				userFetchComplete: false
			}
		},
		beforeCreate() {
  		this.$fire.auth.onAuthStateChanged((user) => {
  			if (user) {
    			this.user = this.$fire.auth.currentUser
    			this.userFetchComplete = true

    			this.online(this.user.displayName)
    			this.updatesFire()
  			} else {
    			this.$router.push('/login')
  			}
  		})
    	},
    	beforeDestroyed() {
    		this.offline(this.user.displayName)
    	},
    	created() {
      document.addEventListener('visibilitychange', this.browserInactive, false)
    },
		mounted() {
			this.forceOff()
		},
		methods: {
			offline(name) {
				this.fireDB.collection("users").doc(`${name}`).update({isOnline: false});
			},
			online(name) {
        this.fireDB.collection("users").doc(`${name}`).update({isOnline: true});
      },
      browserInactive(e) {
        if(document.hidden == true) {
          this.offline(this.user.displayName)
          console.log('offline')
        } else {
          this.online(this.user.displayName)
        }
      },
			toUserProfile(url) {
				return url
			},
			forceOff() {
        setTimeout(() => {
          this.offline(this.user.displayName)
        }, 30000)
      },
			fetchAllUsers() {
				this.users = []

        this.fireDB.collection("users")
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.users.push(doc.data());
          });
        });
      },
      dynaImg(photo) {
        return photo
      },
      updatesFire() {
        this.fireDB.collection("users")
        .onSnapshot((doc) => {
          this.fetchAllUsers()
        });
      },
		}
	}
</script>

<style lang="scss" scoped>
	.home-enter-active, .home-leave-active { transition: opacity .3s; }
    .home-enter, .home-leave-active { opacity: 0; }

	.users_container {
		padding: 20px;

		.back {
			position: absolute;
			top: 20px;
			left: 15px;
			background-color: #2d3748;
			width: fit-content;
			padding: 7px;
			border-radius: 50%;
		}

		.users {
			margin-top: 60px;

			.title {
				margin-bottom: 10px;
			}

			.user {
				display: flex;
				background-color: #192734;
				margin-bottom: 10px;
				padding: 10px;
				border-radius: 6px;
				position: relative;

				.isOnline {
					position: absolute;
					top: 38px;
					left: 35px;
					padding: 2px;
					border-radius: 50%;
					background-color: #192734;
					
					.isOn {
						width: 10px;
						height: 10px;
						background-color: #31A24C;
						border-radius: 50%;
						outline-color: #ffffff;
					}
				}
 
				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}

				.name {
					margin: 0 0 0 10px;

					.adminBadge {
						font-size: 10px;
						background-color: #7C3AED;
						width: fit-content;
						padding: 1px 5px;
						border-radius: 4px;
					}
				}
			}
		}
	}
</style>
