<template>
	<div class="nav shadow-md">
		<div class="logo">
			<div class=""><svg class="w-6 h-6" width="2500" height="2500" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M165.964 15.838c-3.89-11.975-16.752-18.528-28.725-14.636-11.975 3.89-18.528 16.752-14.636 28.725l58.947 181.365c4.048 11.187 16.132 17.473 27.732 14.135 12.1-3.483 19.475-16.334 15.614-28.217L165.964 15.838" fill="#DFA22F"/><path d="M74.626 45.516C70.734 33.542 57.873 26.989 45.9 30.879 33.924 34.77 27.37 47.631 31.263 59.606l58.948 181.366c4.047 11.186 16.132 17.473 27.732 14.132 12.099-3.481 19.474-16.332 15.613-28.217L74.626 45.516" fill="#3CB187"/><path d="M240.162 166.045c11.975-3.89 18.526-16.75 14.636-28.726-3.89-11.973-16.752-18.527-28.725-14.636L44.708 181.632c-11.187 4.046-17.473 16.13-14.135 27.73 3.483 12.099 16.334 19.475 28.217 15.614l181.372-58.93" fill="#CE1E5B"/><path d="M82.508 217.27l43.347-14.084-14.086-43.352-43.35 14.09 14.089 43.347" fill="#392538"/><path d="M173.847 187.591c16.388-5.323 31.62-10.273 43.348-14.084l-14.088-43.36-43.35 14.09 14.09 43.354" fill="#BB242A"/><path d="M210.484 74.706c11.974-3.89 18.527-16.751 14.637-28.727-3.89-11.973-16.752-18.526-28.727-14.636L15.028 90.293C3.842 94.337-2.445 106.422.896 118.022c3.481 12.098 16.332 19.474 28.217 15.613l181.371-58.93" fill="#72C5CD"/><path d="M52.822 125.933c11.805-3.836 27.025-8.782 43.354-14.086-5.323-16.39-10.273-31.622-14.084-43.352l-43.36 14.092 14.09 43.346" fill="#248C73"/><path d="M144.16 96.256l43.356-14.088a546179.21 546179.21 0 0 0-14.089-43.36L130.07 52.9l14.09 43.356" fill="#62803A"/></svg></div>
			<div class="text-xl">Random Stuff</div>
		</div>
		<div class="" @click="openNav">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path></svg>
		</div>
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
					<NuxtLink to="/users">
					<div class="users_nav">
						<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff"><circle fill="none" cx="12" cy="7" r="3"></circle><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path></svg>
						<div class="userTit">Users</div>
					</div>
					</NuxtLink>
					
					<div class="logout" @click="signOut">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12,21c4.411,0,8-3.589,8-8c0-3.35-2.072-6.221-5-7.411v2.223c1.79,1.04,3,2.973,3,5.188c0,3.309-2.691,6-6,6s-6-2.691-6-6 c0-2.215,1.21-4.149,3-5.188V5.589C6.072,6.779,4,9.65,4,13C4,17.411,7.589,21,12,21z"></path><path d="M11 2H13V12H11z"></path></svg>
						<div class="logtext">Logout</div>
					</div>
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
		width: 100%;
		background-color: #1a202c;

		.logo {
			display: grid;
			grid-template-columns: 30px 1fr;
		}

		.nav-menu {
			background-color: #2d3748;
			position: absolute;
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
						margin: 1px 0 0 4px;
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
					display: flex;
					width: fit-content;
					padding: 10px;
					border: 1px solid #1a202c;

					svg {
						fill: #fff;
					}

					.logtext {
						margin-top: 2px;
					}
				}				
			}
		}
	}
</style>