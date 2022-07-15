<template>
  <div>
    <div class="wrapper">
      <app-nav :numregs="numRegs" :impresora="impresora"></app-nav>
      <app-asside :namerouter="namerouter"></app-asside>

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
           <app-config  v-if="aside.configuracion"></app-config>
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
import config from "./config.vue";


export default {
  name: "ALMACEN",
  data() {
    return {
      page: "Almacen",
      namerouter:"almacen",
      titulo: "",
      aside: {
        configuracion: true,
      },
      numRegs:0,
      impresora:""
     
    };
  },
  methods: {
    router: function (puntero) {
      this.aside = {
        configuracion: false,
      };
      this.aside[puntero] = true;
    },
  
  },
  computed: {},
  mounted: function () {
    
    session.mountStorage();
  },
  created: function () {
    this.$on(this.namerouter, (data) => {
      this.router(data.activar);
      this.titulo = data.titulo;
    });
    this.$on("numregs", (data) => {
      this.numRegs = data;
    });
    this.$on("impresora", (data) => {
      this.impresora = data;
    });
  },
  props: [],
  components: {
    "app-footer": footer,
    "app-nav": nav,
    "app-asside": asside,
    "app-config": config,
    
  },
};
</script>
<style scoped>
</style>