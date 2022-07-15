<template>
  <div>
  <footer class="main-footer">
    <div class="float-right ">
      <b>Version</b> {{version}}
    </div>
    <strong>Copyright &copy; 2020-2022 </strong> All rights reserved. 
  </footer></div>
</template>
<script>
import funciones from "../../controladores/funciones.js"
export default {
  name: "footer",
  data() {
    return {
      version:""
    };
  },
  methods: {},
  computed:{},
  mounted: function () {
    this.version=funciones.version();
  },
  created:function(){},
  components: {},
  props: [],
};
</script>
<style scoped>
</style>