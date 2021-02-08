<template>
	<div class="convo-main-container">
		
		<NuxtLink to="/">
			<div class="back">
				<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>

		<div class="convo-container">
			<NuxtLink to="/messages/groupchat" @click="sole" class="convo">
				<img class="shadow-md" src="https://avatars.dicebear.com/4.5/api/initials/Member's%20Chatbox.svg" alt="">
				<div class="name">Random GC</div>
				<div class="recentmsg" v-if="isLoading">loading</div>
				<div class="recentmsg" v-if="!isLoading">{{ recent.name.replace(/ .*/, '') }}: {{ recent.message }}</div>
			</NuxtLink>
		</div>
		<div class="convo-container">
			<NuxtLink to="/messages/groupchat" @click="sole" class="convo">
				<img class="shadow-md" src="https://avatars.dicebear.com/4.5/api/initials/Member's%20Chatbox.svg" alt="">
				<div class="name">Random GC</div>
				<div class="recentmsg" v-if="isLoading">loading</div>
				<div class="recentmsg" v-if="!isLoading">{{ recent.name.replace(/ .*/, '') }}: {{ recent.message }}</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script>
	export default {
		transition: 'home',
		data() {
			return {
				idPic: "oo89sd2s8tikuthzn1im.png",
				isLoading: true,
				gcMessages: [],
				recent: [],
				fireRDB: this.$fireModule.database(),
			}
		},
		mounted() {
			this.fetchGCchats()
		},
		methods: {
			recentMsg() {
				this.recent = this.gcMessages[this.gcMessages.length -1 ]
			},
			sole() {
				console.log('hi')
			},
			fetchGCchats() {
				let msgRef = this.fireRDB.ref("Messages")
				msgRef.child("MembersChatroom").on("value", (snapshot) => {
					let list = []

					for(let chat in snapshot.val()) {
						let obj = {
		          id: chat,
		          userId: snapshot.val()[chat].userId,
		          name: snapshot.val()[chat].name,
		          message: snapshot.val()[chat].message,
		          date: snapshot.val()[chat].date,
		          time: snapshot.val()[chat].time,
		          img: snapshot.val()[chat].img
		        };
		        list.push(obj)
					}
					this.gcMessages = list
					this.gcMessages.forEach(obj =>  {
			            obj.message = obj.message.replace(/(?:\r\n|\r|\n)/g, '<br />')
			         })
					this.recentMsg()
					this.isLoading = false
				})
			},
		},
		created() {
      		this.$fire.auth.onAuthStateChanged((user) => {
      		if (user) {
        		this.user = this.$fire.auth.currentUser
        		console.log(this.$fire.auth)
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

	.convo-main-container {
		padding: 100px 20px;

		.title {
			display: flex;
			justify-content: center;

			svg {
				margin-right: 5px;
			}

			.tit {
				margin-top: 8px;
			}
		}

		.back {
			position: absolute;
			top: 20px;
			left: 15px;
			background-color: rgb(45, 55, 72, .5);
			width: fit-content;
			padding: 7px;
			border-radius: 50%;
		}

		.convo-container {

			.convo {
				padding: 10px 0;
				border-radius: 12px;
				display: flex;
				position: relative;

				img {
					width: 38px;
					border-radius: 50%;
				}

				.recentmsg {
					position: absolute;
					font-size: 10px;
					bottom: 13px;
					left: 48px;
					color: #73838F;
				}

				.name {
					margin: 0px 0 0 10px;
				}
			}
		}
	}
</style>
