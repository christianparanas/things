<template>
  <div>
    <input
      class="inputImg"
      type="file"
      accept=".jpeg,.jpg,.png,image/jpeg,image/png"
      aria-label="upload image button"
      @change="draftFile"
    />
    <img class="preview" :src="previewImg" v-if="previewBool" alt="">
  </div>
</template>

<style lang="scss" scoped>
	.inputImg {
		width: 100%;
		outline: none;
	}

	.inputImg::-webkit-file-upload-button {
		color: #fff;
	  background-color: #2d3748;
	  border: 0;
	  padding: 3px 6px;
	  border-radius: 4px;
	  outline: none;
	  
	}

	.preview {
		position: absolute;
		z-index: 11;
		margin-top: 20px;
		width: 280px;
	}
</style>


<script>
export default {
	data() {
		return {
			filePic: null,
			previewBool: true,
			previewImg: null
		}
	},
  methods: {
  	// this method will be called when the user select's an image from his/her directory, putting the credentials in the temp variables
  	draftFile(e) {
  		this.filePic = e.target.files[0]
  		this.previewImg = URL.createObjectURL(this.filePic)
  		this.$store.commit('setId', {
  			publicID: this.filePic.name.replace(/\..+$/, '')
  		})
  	},
  	// this method will be called in the compose.vue when user is trying to upload an image
  	postImg() {
  		this.selectFile(this.filePic)
  	},
  	// this will be called when postImg is called
    async selectFile(pic) {
      const file = pic
      const fileId = pic.name.replace(/\..+$/, '')

      /* Make sure file exists */
      if (!file) return;

      /* create a reader */
      const readData = (f) =>  new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
      });

      /* Read data */
      const data = await readData(file);

      /* upload the converted data */
      const instance = this.$cloudinary.upload(data, {
      	public_id: fileId,
        uploadPreset: 'm4bquuc2',
      })
    }
  }  
}
</script>