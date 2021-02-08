export const state = () => ({
  postImgPublicId: null
})

export const mutations = {
  setId(state, payload) {
    state.postImgPublicId = payload.publicID
  },

  removeId(state) {
  	state.postImgPublicId = ""
  }
}