<template>
	<div class="msg-wrapper">
		<NuxtLink to="/messages">
			<div class="back">
			<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>
		<div class="head">
			<div class="title">Member's GroupChat</div>
		</div>
		<div class="messages" ref="msg">
			<div class="msg" v-for="arr in gcMessages" :key="arr.id" :class="arr.name == user.displayName? 'own' : 'other' ">
				<img v-if="arr.name == user.displayName? false : true" :src="dynaImg(arr.img)" alt="">
				<div v-if="arr.name == user.displayName? false : true" class="name">{{ arr.name.replace(/ .*/, '') }}</div>
				<div class="content" v-html="arr.message"></div>
			</div>
		</div>
		<div class="reply">
			<textarea name="" id="" cols="100%" v-model="msg" rows="3" placeholder="Write something"></textarea>
			<div class="send shadow"  @click="sendData">
				<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.001,1.993C6.486,1.994,2,6.48,2,11.994c0.001,5.514,4.487,10,10,10c5.515,0,10.001-4.486,10.001-10 S17.515,1.994,12.001,1.993z M12,19.994c-4.41,0-7.999-3.589-8-8c0-4.411,3.589-8,8.001-8.001c4.411,0.001,8,3.59,8,8.001 S16.412,19.994,12,19.994z"></path><path d="M12.001 8.001L7.996 12.006 11.001 12.006 11.001 16 13.001 16 13.001 12.006 16.005 12.006z"></path></svg>
				<div class="se">Send</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: [],
				msg: "",
				gcMessages: [],
				fireRDB: this.$fireModule.database(),
			}
		},
		updated() {
			this.scrollToEnd()
		},

		mounted() {
			this.fetchGCchats()
			this.scrollToEnd()
		},
		methods: {
			scrollToEnd () {
	      var content = this.$refs.msg;
	      content.scrollTop = content.scrollHeight;
    	},
      dynaImg(photo) {
        return photo
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
				})
			},
			sendData() {
				if(this.msg) {
					const datex = new Date(Date.now());
					let data = {
						userId: this.user.uid,
      			name: this.user.displayName,
      			message: this.msg,
      			date: datex.toDateString(),
      			time: this.getTime(new Date),
      			img: this.user.photoURL
    			};

    			let realdb = this.fireRDB.ref("Messages")

    			realdb.child("MembersChatroom").push(data, (err) =>{
    				if(err) {
    					console.log(err)
    				} else {
    					this.msg = ""
    				}
    			})

    			console.log(data)
				}
			},
			getTime(date) {
		    var hours = date.getHours();
		    var minutes = date.getMinutes();
		    var ampm = hours >= 12 ? "pm" : "am";
		    hours = hours % 12;
		    hours = hours ? hours : 12;
		    minutes = minutes < 10 ? "0" + minutes : minutes;
		    var strTime = hours + ":" + minutes + " " + ampm;
		    return strTime;
		  }
		},
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
	.msg-wrapper {
		padding: 20px;

		.messages {
			margin-top: 20px;
			padding: 15px;

			border: 2px solid #2f263c;
			height: 450px;
			overflow-y: scroll;

			.msg {
				margin-top: 30px;
				display: grid;
      	grid-template-columns: 40px 60%;
      	position: relative;

				.name {
					position: absolute;
					top: -17px;
					left: 63px;
					font-size: 10px;
				}

				img {
					width: 37px;
					border-radius: 50%;
				}

				.content {
					font-size: 12px;
					width: fit-content;
					background-color: #2d3748;
					padding: 8px 16px;
					margin-left: 10px;
					border-radius: 18px;
					word-wrap: break-word;
					word-break: break-all;
				}
			}

			.own {
				display: grid;
				place-items: end;
				grid-template-columns: 1fr 70%;

				.content {
					grid-column-start: 2;
				}
			}
		}

		.reply {
			display: grid;
			margin-top: 5px;

			textarea {
				outline: none;
				background-color: #2d3748;
				color: #fff;
			 	font-size: 12px;
        padding: 10px;
        word-wrap: break-word;
        border: none;
        border-radius: 3px;
        margin-bottom: 5px;
        height: 60px;
        resize: none;
			}

			.send {
				padding: 10px;
				background-color: #c83b50;
				height: 50px;
				border-radius: 3px;
				display: flex;
				justify-content: center;
				border: none;

				svg {
					fill: #fff;
					margin-right: 5px;
				}

				.se {
					margin-top: 4px;
				}
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

		.head {
			display: flex;
			justify-content: center;

			img {
				width: 45px;
				border-radius: 50%;
			}

			.title {
				margin: 11px 0 0 5px;
			}
		}


	}
</style>