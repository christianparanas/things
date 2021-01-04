<template>
	<div class="convo-main-container">
		<div class="title">
			<svg class="w-10 h-10 shadow-md" xmlns="http://www.w3.org/2000/svg" height="226px" width="224px" version="1.1" viewBox="0 0 224 226">
				<defs>
					<linearGradient id="a" y1="6.76%" x2="50%" x1="50%" y2="95.6%">
						<stop stop-color="#00C6FF" offset="0"/>
						<stop stop-color="#0068FF" offset="1"/>
				  </linearGradient>
				</defs>
			<path fill="url(#a)" d="m41.255 185.52v40.2l37.589-21.37c10.478 3.02 21.616 4.65 33.156 4.65 61.86 0 112-46.79 112-104.5 0-57.714-50.14-104.5-112-104.5-61.856 0-112 46.786-112 104.5 0 32.68 16.078 61.86 41.255 81.02z"/>
				<path fill="#fff" d="m100.04 75.878l-60.401 63.952 54.97-30.16 28.721 30.16 60.06-63.952-54.36 29.632-28.99-29.632z"/>
			</svg>
			<div class="tit">Messenger</div>
		</div>
		<NuxtLink to="/">
			<div class="back">
				<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg>
			</div>
		</NuxtLink>

		<div class="convo-container">
			<NuxtLink to="/messages/groupchat" @click="sole" class="convo">
				<img class="shadow-md" src="https://avatars.dicebear.com/4.5/api/initials/Member's%20Chatbox.svg" alt="">
				<div class="name">Member's Chatbox</div>
			</NuxtLink>
		</div>

	</div>
</template>

<script>
	export default {
		methods: {
			sole() {
				console.log('hi')
			}
		}
	}
</script>



<style lang="scss" scoped>
	.convo-main-container {
		padding: 20px;

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
			margin-top: 60px;

			.convo {
				padding: 15px 10px;
				background-color: #2d3748;
				border-radius: 12px;
				display: flex;

				img {
					width: 40px;
					border-radius: 50%;
				}

				.name {
					margin: 9px 0 0 10px;
				}
			}
		}
	}
</style>