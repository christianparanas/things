<template>
	<div class="nav shadow-md">
		<div class="" @click="openNav">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path></svg>
		</div>
		<div class="logo">
			<svg class="w-6 h-6" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#000" fill-opacity="0"/><circle cx="50" cy="50" r="48" fill="#EA4C89"/><path fill-rule="evenodd" clip-rule="evenodd" d="M50 0C22.397 0 0 22.397 0 50C0 77.603 22.397 100 50 100C77.5488 100 100 77.603 100 50C100 22.397 77.5488 0 50 0ZM83.026 23.0477C88.9913 30.3145 92.5705 39.5879 92.679 49.6204C91.269 49.3492 77.1692 46.4751 62.961 48.2646C62.6356 47.5597 62.3644 46.8004 62.0391 46.0412C61.1714 43.9805 60.1952 41.8655 59.2191 39.859C74.9458 33.4599 82.1041 24.2408 83.026 23.0477ZM50 7.37527C60.846 7.37527 70.7701 11.4425 78.308 18.1128C77.5488 19.1974 71.0954 27.82 55.9111 33.5141C48.9154 20.6616 41.1605 10.141 39.9675 8.5141C43.167 7.75488 46.5293 7.37527 50 7.37527ZM31.833 11.3883C32.9718 12.9067 40.564 23.4816 47.6681 36.0629C27.7115 41.3774 10.0868 41.269 8.18872 41.269C10.9544 28.0369 19.9024 17.0282 31.833 11.3883ZM7.26681 50.0542C7.26681 49.6204 7.26681 49.1866 7.26681 48.7527C9.11063 48.8069 29.8265 49.0781 51.1388 42.679C52.3861 45.0651 53.5249 47.5054 54.6095 49.9458C54.0672 50.1085 53.4707 50.2712 52.9284 50.4338C30.9111 57.538 19.1974 76.9523 18.2213 78.5792C11.4425 71.0412 7.26681 61.0087 7.26681 50.0542ZM50 92.7332C40.1302 92.7332 31.0195 89.3709 23.8069 83.731C24.5662 82.1584 33.243 65.4555 57.321 57.0499C57.4295 56.9957 57.4837 56.9957 57.5922 56.9414C63.6117 72.5054 66.0521 85.5748 66.7028 89.3167C61.551 91.5401 55.9111 92.7332 50 92.7332ZM73.807 85.4122C73.3731 82.8091 71.0955 70.3362 65.5098 54.9892C78.9046 52.8742 90.6182 56.3449 92.0824 56.833C90.2386 68.7093 83.4056 78.9588 73.807 85.4122Z" fill="#C32361"/></svg>
			<NuxtLink to="/">Random</NuxtLink>
		</div>
		<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path></svg>

		<transition name="menuTrans">
			<div v-if="openNavMenu" v-click-outside="closeNav" class="nav-menu">
				<div class="menu-wrapper">
					<NuxtLink :to="navToProfile(user.uid)">
						<div class="nav_profile">
							<img :src="dynaImg(user.photoURL)" alt="">
							<div class="user_nav_name">
								<div class="seeProfile">{{ user.displayName }}</div>
								<div class="see">See Profile</div>
							</div>
						</div>
					</NuxtLink>

					<NuxtLink to="/messages">
					<div class="users_nav">
						<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" height="226px" width="224px" version="1.1" viewBox="0 0 224 226">
						 <defs>
						  <linearGradient id="a" y1="6.76%" x2="50%" x1="50%" y2="95.6%">
						   <stop stop-color="#00C6FF" offset="0"/>
						   <stop stop-color="#0068FF" offset="1"/>
						  </linearGradient>
						 </defs>
						<path fill="url(#a)" d="m41.255 185.52v40.2l37.589-21.37c10.478 3.02 21.616 4.65 33.156 4.65 61.86 0 112-46.79 112-104.5 0-57.714-50.14-104.5-112-104.5-61.856 0-112 46.786-112 104.5 0 32.68 16.078 61.86 41.255 81.02z"/>
						<path fill="#fff" d="m100.04 75.878l-60.401 63.952 54.97-30.16 28.721 30.16 60.06-63.952-54.36 29.632-28.99-29.632z"/>
						</svg>

						<div class="userTit">Messages</div>
					</div>
					</NuxtLink>
					<NuxtLink to="/quizes">
					<div class="users_nav">
						<svg class="w-6 h-6" width="2500" height="2383" viewBox="0 0 256 244" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M177.381 169.733c9.447-.978 16.614-9.122 16.288-18.896-.325-9.773-8.47-17.592-18.243-17.592h-.651c-10.1.326-17.918 8.796-17.592 18.895.326 4.887 2.28 9.122 5.212 12.054-11.076 21.828-28.016 37.791-53.426 51.148-17.266 9.122-35.183 12.38-53.1 10.1-14.66-1.955-26.062-8.47-33.23-19.222-10.424-15.963-11.401-33.23-2.605-50.496 6.19-12.38 15.962-21.502 22.152-26.063-1.303-4.235-3.258-11.402-4.235-16.614-47.237 34.207-42.35 80.468-28.016 102.295 10.75 16.29 32.577 26.389 56.684 26.389 6.515 0 13.03-.652 19.546-2.28 41.699-8.145 73.299-32.905 91.216-69.718zm57.336-40.397c-24.759-28.995-61.245-44.958-102.944-44.958h-5.212c-2.932-5.864-9.122-9.774-15.963-9.774h-.652C99.848 74.93 92.03 83.4 92.355 93.5c.326 9.773 8.47 17.592 18.243 17.592h.651c7.167-.326 13.357-4.887 15.963-11.077h5.864c24.759 0 48.214 7.167 69.39 21.176 16.288 10.751 28.016 24.76 34.531 41.7 5.538 13.683 5.212 27.04-.652 38.443-9.121 17.266-24.432 26.714-44.63 26.714-13.031 0-25.41-3.91-31.926-6.842-3.583 3.258-10.099 8.47-14.66 11.729 14.009 6.515 28.343 10.099 42.025 10.099 31.274 0 54.404-17.267 63.2-34.533 9.447-18.896 8.795-51.474-15.637-79.165zM69.225 175.27c.326 9.774 8.47 17.592 18.243 17.592h.652c10.099-.325 17.917-8.796 17.591-18.895-.325-9.774-8.47-17.592-18.243-17.592h-.651c-.652 0-1.63 0-2.28.325-13.357-22.153-18.895-46.26-16.94-72.323 1.302-19.547 7.818-36.488 19.22-50.497 9.447-12.054 27.69-17.918 40.07-18.243 34.531-.652 49.19 42.351 50.168 59.618 4.235.977 11.402 3.258 16.289 4.887C189.434 27.366 156.857 0 125.584 0c-29.32 0-56.359 21.176-67.11 52.451-14.985 41.7-5.212 81.771 13.031 113.372-1.628 2.28-2.606 5.864-2.28 9.448z" fill="#764ABC"/></svg>
						<div class="userTit">Quizes</div>
					</div>
					</NuxtLink>
					<NuxtLink to="/users">
					<div class="users_nav">
						<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><circle fill="none" cx="12" cy="7" r="3"></circle><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path></svg>
						<div class="userTit">Users</div>
					</div>
					</NuxtLink>

					<button class="logout" @click="signOut">Logout</button>
				</div>
			</div>
		</transition>
	</div>
</template>


<script>
	import vClickOutside from 'v-click-outside'

	export default {
		props: ['user'],
		data() {
			return {
				openNavMenu: false
			}
		},
		directives: {
      		clickOutside: vClickOutside.directive
    	},
		methods: {
			navToProfile(uid) {
				return uid
			},
			openNav() {
				this.openNavMenu = true
			},
			closeNav(e) {
				this.openNavMenu = false
			},
			dynaImg(photo) {
				return photo
			},
			signOut() {
      			this.$fire.auth.signOut()
      		}
		},
	}
</script>


<style lang="scss" scoped>
	.menuTrans-enter-active, .menuTrans-leave-active {
		transition: opacity .5s;
	}

	.menuTrans-enter, .menuTrans-leave-to {
  		opacity: 0;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		padding: 20px;
		position: fixed;
		z-index: 2;
		width: 100%;
		background-color: #1a202c;

		.logo {
			display: grid;
			grid-template-columns: 30px 1fr;
		}

		.nav-menu {
			background-color: #2d3748;
			position: fixed;
			z-index: 10;
			top: 0;
			right: 0;
			width: 250px;
			height: 100vh;
			padding: 30px 20px 20px;

			.menu-wrapper {

				.users_nav {
					display: flex;
					padding: 10px 0;

					.userTit {
						margin: 1px 0 0 8px;
					}
				}

				.nav_profile {
					display: flex;
					margin-bottom: 20px;

					img {
						border-radius: 50%;
						width: 40px;
						height: 40px;
						margin-right: 15px;
					}

					.seeProfile {
						.user_nav_name {
							margin-top: 15px;
						}

						.see {
							font-size: 8px;
							background-color: #1a202c;
						}
					}
				}

				.logout {
					margin-top: 40px;
					width: fit-content;
					padding: 5px 10px;
					border-radius: 4px;
					border: 2px solid #7C3AED;
					outline: none;
				}
			}
		}
	}
</style>
