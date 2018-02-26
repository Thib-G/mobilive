<template>
  <div>
    <div class="floating-hamburger" v-show="collapsed" @click="collapsed = !collapsed">
      <i class="fas fa-bars"></i>
    </div>
    <div class="floating-menu" v-show="!collapsed">
      <div class="close-btn">
        <span @click="collapsed = !collapsed">&times;</span>
      </div>
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
  </div>
</template>

<script>
export default {
  props: ['polygons'],
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>


<style scoped>
  .floating-hamburger {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px;
    top: 10px;
    right: 10px;
    width: 20px;
    z-index: 999;
    cursor: pointer;
  }
  .floating-menu {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px;
    width: 100px;
    top: 10px;
    right: 10px;
    z-index: 999;
    border-radius: 5px;
  }
  .close-btn {
    color: #c3c3c3;
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 4px 0 0;
    font: 16px/14px Tahoma, Verdana, sans-serif;
    font-weight: bold;
    cursor: pointer;
  }
  .close-btn:hover {
    color: #999999;
  }
</style>
