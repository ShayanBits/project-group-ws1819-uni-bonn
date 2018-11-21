<template>
  <div>&copy; {{year}} Otto</div>
</template>

<script>
  export default {
    name: "Footer",
    computed: {
      year() {
        return new Date().getFullYear();
      }
    }
  }
</script>

<style scoped>
  div {
    height: 20px;
    border-top: 1px solid black;
    padding: 10px;
    margin-top: 20px;
    background-color: lightgrey;
  }
</style>