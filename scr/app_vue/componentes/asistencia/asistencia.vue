<template>
  <div>
    <div class="wrapper">
      <app-nav :numregs="numRegs" :impresora="impresora"></app-nav>
      <app-asside></app-asside>

      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>{{ titulo }}</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="#">INTELAGRO</a>
                  </li>
                  <li class="breadcrumb-item active">{{ titulo }}</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <app-config v-if="aside.config"></app-config>
          <app-asistencia v-if="aside.asistencia"></app-asistencia>
          <app-bitacora v-if="aside.bitacora"></app-bitacora>
          <app-editar v-if="aside.editar"></app-editar>
        </section>
      </div>

      <app-footer></app-footer>

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  </div>
</template>

<script>
import asside from "./aside.vue";
import nav from "./nav.vue";
import footer from "./footer.vue";
import session from "../../controladores/session.js";
import faceid from "./faceid.vue";
import alta from "./alta.vue";
import config from "./config.vue";
import bitacora from "./bitacora.vue";
import rutas from "../../../router/rutas_back.js";
import asistenciatrabajador from "./faceid.vue";
import editar from "./editar.vue";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
export default {
  name: "asistencia",
  data() {
    return {
      page: "Campo",
      titulo: "ASISTENCIA",
      aside: {
        asistencia: true,
        actividades: false,
        bitacora: false,
        editar:false,
      },
      numRegs: 0,
      role: "",
      impresora: "",
    };
  },
  methods: {
    router: function (puntero) {
      this.aside = {
        asitencia: false,
        actividades: false,
        bitacora: false,
        editar:false,
      };
      this.aside[puntero] = true;
    },
   
  },
  computed: {},
  mounted: function () {
    
    session.mountStorage();

  },
  created: function () {
    this.$on("asistencia", (data) => {
      this.router(data.activar);
      this.titulo = data.titulo;
    });
  },
  props: [],
  components: {
    "app-footer": footer,
    "app-nav": nav,
    "app-asside": asside,
    "app-faceid": faceid,
    "app-alta": alta,
    "app-config": config,
    "app-asistencia": asistenciatrabajador,
    "app-bitacora": bitacora,
    "app-editar":editar
  },
};
</script>
<style scoped>
</style>