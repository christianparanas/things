<template>
  <div class="quizes">
    <Nav :user="user" />
    <div class="head">
      <h1>Questions</h1>
    </div>
    <div class="categ">
      <div class="title">
        <div class="">Categories</div>
        <div class="right">
          <select class="">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select class="">
            <option value="choice">Multiple Choice</option>
            <option value="truefalse">True or False</option>
          </select>
        </div>
      </div>
      <div class="content-container">
        <div class="content" v-for="category in categ.trivia_categories" :key="category.id">
          <svg class="w-5 h-5" style="display: inline-block" fill="none" stroke="#15202B" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  async asyncData({ $axios }) {
    const que = await $axios.$get('https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple');
    const categ = await $axios.$get('https://opentdb.com/api_category.php');
    console.log(categ.trivia_categories)
    console.log(que)

    return {
      categ
    }
  },
  beforeCreate() {
    this.$fire.auth.onAuthStateChanged((user) => {
    if (user) {
      this.user = this.$fire.auth.currentUser
      console.log(this.$fire.auth)
    } else {
      this.$router.push('/login')
    }
    })
  },
}
</script>

<style lang="scss" scoped>

  .quizes {

    .head {
      font-size: 50px;
      font-weight: 700;
      padding: 100px 0 30px;
      text-align: center;
      color: #FFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      letter-spacing: 1px;

      h1 {
        background-image: url(https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif);
      	background-size: cover;
      	color: transparent;
      	-moz-background-clip: text;
      	-webkit-background-clip: text;
      	text-transform: uppercase;
      	font-size: 50px;
      	margin: 10px 0;
      }
    }

    .categ {
      padding: 20px;

      .title {
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;

        .right {
          display: flex;
          justify-content: space-around;

          & > select {
            background-color: #1a202c;
            border: 2px solid #7C3AED;
            margin-left: 5px;
            outline: none;
            border-radius: 4px;
          }
        }
      }

      .content-container {

        .content {
          background-color: #192734;
          margin-bottom: 10px;
          padding: 12px;
          border-radius: 4px;

          &:hover, &:active {
            background-color: #7C3AED;
          }
        }
      }
    }
  }

</style>
