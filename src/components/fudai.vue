<template>
  <div class="fudai" @click="company">
    <img src="../assets/fudai.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'fudai',
    methods: {
      company: function () {
        this.$router.push({
          name: 'company'
        })
      }
    }
  }
</script>

<style scoped>
  .fudai {
    flex: 1;
  }

  img{
    width: 100%;
    height: 100%;
  }
</style>
