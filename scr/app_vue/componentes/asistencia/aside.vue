<template>
  <div>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a href="#" class="brand-link">
       <img
              :src="logo"
              alt="intelagro"
              class="brand-image img-circle elevation-3"
              style="opacity: 0.8"
            />
            <span class="info-box-text text-success">INTELAGRO</span>
      </a>

      <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="info">
            <a href="#" class="d-block">{{ nombre }}</a>
          </div>
        </div>

        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li class="nav-header">ASISTENCIA</li>
           
            <li class="nav-item">
              <a href="#" class="nav-link" @click="router('asistencia', 'ASISTENCIA')">
                <i class="nav-icon fad fa-user text-success"></i>
                <p class="text">Asistencia</p>
              </a>
            </li>
           

            

             
          </ul>
        </nav>
      </div>
    </aside>
  </div>
</template>
<script>
import session from "../../controladores/session.js";
import rutas from "../../../router/rutas_front.js";
export default {
  name: "aside",
  data() {
    return {
         logo: "https://intelagro.mx/wp-content/uploads/2021/10/intelagro_logito.png",
      nombre: "",
    };
  },
  methods: {
     inicio: function () {
      location.href = rutas.host + rutas.modulos;
    },
    router: function (puntero, title) {
      var isMobile = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return (
            navigator.userAgent.match(/IEMobile/i) ||
            navigator.userAgent.match(/WPDesktop/i)
          );
        },
        any: function () {
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
          );
        },
      };
      if (isMobile.any()) $('[data-widget="pushmenu"]').PushMenu("toggle");
      this.$parent.$emit("asistencia", {
        activar: puntero,
        titulo: title,
      });
    },
  },
  computed: {},
  mounted: function () {
    this.nombre = session.nombre();
  },
  created: function () {},
  components: {},
  props: [],
};
</script>
<style scoped>
</style>