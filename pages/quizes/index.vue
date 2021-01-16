<template>
  <div class="quizes">
    <div class="head">
      OpenTDB
    </div>
    <div class="categ">
      <div class="title">
        Categories
      </div>
      <div class="content-container">
        <div class="content shadow-md" v-for="category in categ.trivia_categories" :key="category.id">
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const que = await $axios.$get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
    const categ = await $axios.$get('https://opentdb.com/api_category.php');
    console.log(categ.trivia_categories)
    console.log(que)

    return {
      categ
    }
  }
}
</script>

<style lang="scss" scoped>
  .quizes {
    padding: 20px;

    .head {
      padding: 100px 0;
    }

    .categ {
      .title {
        margin-bottom: 10px;
      }

      .content-container {

        .content {
          background-color: #2d3748;
          margin-bottom: 10px;
          padding: 10px 15px;
          border-radius: 4px;
        }
      }
    }
  }

</style>
