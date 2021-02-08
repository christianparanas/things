<template>
  <div>
    <input
      type="file"
      accept=".jpeg,.jpg,.png,image/jpeg,image/png"
      aria-label="upload image button"
      @change="draftFile"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>


<script>
export default {
	data() {
		return {
			filePic: null,
		}
	},
  methods: {
  	draftFile(e) {
  		this.filePic = e.target.files[0]
  		this.$store.commit('setId', {
  			publicID: this.filePic.name.replace(/\..+$/, '')
  		})
  	},
  	postImg() {
  		this.selectFile(this.filePic)
  		
  	},
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