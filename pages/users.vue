<template>
	<div class="users_container">
		<NuxtLink to="/">
			<div class="back">
				<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>

		<div class="users">

			<div class="title">Users</div>
			<NuxtLink :to="toUserProfile(user.uid)" class="user" v-for="user in users" :key="user.uid">
				<img :src="dynaImg(user.userPic)" alt="">
				<div class="name">{{ user.name }}</div>
			</NuxtLink>
		</div>

	</div>
</template>


<script>
	export default {
		transition: 'home',
		data() {
			return {
				users: [],
				fireDB: this.$fireModule.firestore(),
			}
		},
		beforeCreate() {
      		this.$fire.auth.onAuthStateChanged((user) => {
      			if (user) {
        			this.user = this.$fire.auth.currentUser
        			console.log(this.$fire.auth)
      			} else {
        			this.$router.push('/login')
      			}
      		})
    	},
		mounted() {
			this.fetchAllUsers()
		},
		methods: {
			toUserProfile(url) {
				return url
			},
			fetchAllUsers() {
        this.fireDB.collection("users")
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.users.push(doc.data());
          });

          console.log(this.users)

        });
      },
      dynaImg(photo) {
        return photo
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
				background-color: #2d3748;
				margin-bottom: 10px;
				padding: 10px;
				border-radius: 6px;

				img {
					width: 50px;
					border-radius: 50%;
				}

				.name {
					margin: 12px 0 0 10px;
				}
			}
		}
	}
</style>
