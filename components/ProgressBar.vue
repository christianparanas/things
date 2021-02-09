<template>
	<div class="container">    
		<div class="progress2 progress-moved">
			<div class="progress-bar2" ></div>                       
		</div> 
	</div>
</template>

<style lang="scss" scoped>
	$background: #2c303a;

	.container {
	  position: absolute;
	  width: 90%;
	  margin: 100px auto;
	  text-align: center;
	}

	.progress2 {
	  padding: 6px;
	  border-radius: 30px;
	  background: rgba(0, 0, 0, 0.25);  
	  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
	}

	.progress-bar2 {
	  height: 18px;
	  border-radius: 30px;
	  background-image: 
	    linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
	  transition: 0.4s linear;  
	  transition-property: width, background-color;    
	}

	.progress-moved .progress-bar2 {
	  width: 100%; 
	  background-color: #EF476F;  
	  animation: progressAnimation 6s;
	}

	@keyframes progressAnimation {
	  0%   { width: 5%; background-color: #F9BCCA;}
	  100% { width: 100%; background-color: #EF476F; }
	}
</style>