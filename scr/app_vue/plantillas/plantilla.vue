<template>
  <div>
   <div class="card border border-success">
      <div class="card-body">
      

      </div>
    </div>
  </div>
</template>
<script>
import session from "../../controladores/session";
import rutas from "../../../router/rutas_back.js";
import funciones from "../../controladores/funciones.js";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
export default {
  name: "informediario",
  data() {
    return {};
  },
  methods: {},
  computed:{},
  mounted: function () {},
  created:function(){},
  components: {},
  props: [],
};
</script>
<style scoped>
</style>