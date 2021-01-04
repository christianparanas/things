<template>
	<div class="msg-wrapper">
		<NuxtLink to="/messages">
			<div class="back">
			<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>
		<div class="head">
			<img src="https://avatars.dicebear.com/4.5/api/initials/Member's%20Chatbox.svg" alt="">
			<div class="title">Member's GroupChat</div>
		</div>
		<div class="messages">
			<div class="msg" v-for="arr in array" :key="arr.id">
				<div class="name">{{ arr.name }}</div>
				<div class="content">{{ arr.content }}</div>
			</div>
		</div>
		<div class="reply">
			<textarea name="" id="" cols="100%" rows="3"></textarea>
			<div class="send">Send</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				array: [
					{ id: 1, name: "christian", content: "Array" },
					{ id: 2, name: "thea", content: "hi" },
					{ id: 3, name: "chan", content: "Desk" },
				]
			}
		}
	}
</script>


<style lang="scss" scoped>
	.msg-wrapper {
		padding: 20px;

		.messages {
			margin-top: 20px;
			padding: 20px;
			background-color: #2f263c;
			height: 50vh;
		}

		.reply {
			display: grid;
			margin-top: 15px;
			grid-template-columns: 1fr 100px;

			textarea {
				outline: none;
				background-color: #e3e3e3;
				color: #000;
			 font-size: 12px;
        padding: 10px;
        margin: 10px 0;
        word-wrap: break-word;
			}

			.send {
				background-color: #c83b50;
				height: 80px;
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