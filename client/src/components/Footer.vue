<template>
  <footer>
    <div>© {{year}} LOGO</div>
  </footer>
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
  footer {
    margin-top: 5px;
    background-color: #2c3e50;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    justify-content: center;
    color: #637688;
  }
</style>