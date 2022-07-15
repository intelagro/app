<template>
  <div>

  </div>
</template>
<script>
import session from "../../controladores/session";
import funciones from "../../controladores/funciones";
import rutas from "../../../router/rutas_back.js";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
export default {
  name: "faceid",
  data() {
    return {
      faceMatcher: "",
      displaySize: "",
      video: "",
      nombre: "",
      codigosface: [],
      setintervalface: "",
      fechahora: "",
      id_trabajador: "",
    };
  },
  methods: {
   
  },
  computed: {},
  mounted: function () {
  
  },
  created: function () {},
  components: {},
  props: [],
};
</script>
<style scoped>
.row {
  margin-bottom: 0.5%;
  margin-top: 0.5%;
}
</style>