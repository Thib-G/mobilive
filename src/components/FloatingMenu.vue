<template>
  <div class="floating-menu">
    <h4>Isochrones*</h4>
    <p>
      <span v-for="polygon in polygons" :key="polygon.minutes">
        <input type="checkbox" v-model="polygon.visible" /> {{ polygon.minutes }} min<br />
      </span>
    </p>
    <p>
      <small>* only for car. <br />&copy; <a href="https://iso4app.net/">iso4app</a></small>
    </p>
  </div>
</template>

<script>
export default {
  props: ['polygons'],
};
</script>


<style scoped>
  .floating-menu {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px;
    width: 100px;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 999;
    border-radius: 5px;
  }
</style>
