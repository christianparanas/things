<template>
	<div class="msg-wrapper">
		<NuxtLink to="/messages">
			<div class="back">
			<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>
		<div class="head">
			<div class="title">GroupChat</div>
		</div>
		<div class="messages" ref="msg">
			<div class="msg" v-for="arr in gcMessages" :key="arr.id" :class="arr.name == user.displayName? 'own' : 'other' ">
				<NuxtLink :to="msgPro(arr.userId)">
				<img v-if="arr.name == user.displayName? false : true" :src="dynaImg(arr.img)" alt="">
				</NuxtLink>
				<div v-if="arr.name == user.displayName? false : true" :style="'top: ' + seeDateUpName" class="name">{{ arr.name.replace(/ .*/, '') }}</div>
				<div @click="seeDateSpe(arr.id)" :style="'top: ' + seeDateUp" class="content" v-html="arr.message"></div>
				<div :class="arr.name == user.displayName? 'date1' : 'date2'" v-if="seeDate">{{ $moment(arr.date).calendar() }}</div>
			</div>
		</div>
		<div class="reply">
			<textarea autofocus name="" id="" cols="100%" v-model="msg" rows="3" placeholder="Write something"></textarea>
			<svg @click="sendData" class="w-10 h-10" fill="none" stroke="#73838F" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
		</div>

	</div>
</template>

<script>
	export default {
		transition: 'home',
		data() {
			return {
				seeDateUp: '0',
				seeDateUpName: '-17px',
				seeDate: false,
				user: [],
				msg: "",
				gcMessages: [],
				fireRDB: this.$fireModule.database(),
				line: null
			}
		},
		// run this if there's an update in the component
		updated() {
			this.scrollToEnd()
		},
		// run this on page load
		mounted() {
			this.fetchGCchats()
			this.scrollToEnd()
			this.detectOnline()
			console.log(this.gcMessages)
		},
		methods: {
			seeDateSpe(id) {
				this.seeDate = !this.seeDate
				this.seeDateUp = this.seeDateUp == '0' ? '-10px' : '0'
				this.seeDateUpName = this.seeDateUpName == '-17px' ? '-27px' : '-17px'
			},
			msgPro(url) {
				return `/${url}`
			},
			detectOnline() {

				this.fireRDB.ref(".info/connected").on("value", function(snap) {
				  if (snap.val() === true) {
				    console.log("connected")
				  } else {
				    console.log("not connected")
				  }
				});
			},
			// scroll to bottom when new msg
			scrollToEnd () {
	      var content = this.$refs.msg;
	      content.scrollTop = content.scrollHeight;
    	},
      dynaImg(photo) {
        return photo
      },
      // fetch data from realdb
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
			// send data to realdb
			sendData() {
				if(this.msg) {
					let data = {
						userId: this.user.uid,
      			name: this.user.displayName,
      			message: this.msg,
      			date: this.$moment().format('llll'),
      			time: this.$moment().format('LT'),
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
			// time converter
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
    	this.$router.push('/login')
  	}
  })
},
	}
</script>


<style lang="scss" scoped>
   .home-enter-active, .home-leave-active { transition: opacity .3s; }
   .home-enter, .home-leave-active { opacity: 0; }

	.msg-wrapper {
		padding: 20px;

		.messages {
			margin-top: 20px;
			padding: 15px;

			border: 2px solid #2d3748;
			height: 450px;
			overflow-y: scroll;

			.msg {
				margin-top: 30px;
				display: grid;
      	grid-template-columns: 40px 60%;
      	position: relative;

      	.date2 {
      		position: absolute;
      		font-size: 8px;
      		bottom: -2px;
      		left: 50px;
      	}

				.name {
					position: absolute;
					top: -17px;
					left: 55px;
					font-size: 10px;
					transition: top .3s ease;
				}

				img {
					width: 35px;
					border-radius: 50%;
				}

				.content {
					font-size: 12px;
					width: fit-content;
					background-color: #2d3748;
					padding: 8px 16px;
					margin-left: 5px;
					border-radius: 18px;
					word-wrap: break-word;
					word-break: break-all;
					position: relative;
					transition: top .3s ease;
				}
			}

			.own {
				display: grid;
				place-items: end;
				grid-template-columns: 1fr 70%;
				margin-top: 5px;

				.date1 {
					position: absolute;
      		font-size: 8px;
					right: 8px;
					bottom: -2px;
				}

				.content {
					grid-column-start: 2;
				}
			}
		}

		.reply {
			display: grid;
			margin-top: 5px;
			position: relative;

			textarea {
				outline: none;
				background-color: #2d3748;
				color: #fff;
			 	font-size: 12px;
        padding: 10px 50px 10px 10px;
        word-wrap: break-word;
        border: none;
        border-radius: 5px;
        margin-bottom: 5px;
        height: 60px;
			}

			svg {
				margin-right: 5px;
				position: absolute;
				top: 12px;
				right: 8px;
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
