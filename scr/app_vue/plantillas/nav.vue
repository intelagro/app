<template>
  <div>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link">INTELAGRO</a>
        </li>
      </ul>

      <!-- Right navbar links -->

      <ul class="navbar-nav ml-auto">

        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-cloud-upload-alt"></i>
            <span class="badge badge-success navbar-badge">{{numregs}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-item dropdown-header">{{numregs}} Registros</span>
            <div class="dropdown-divider"></div>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-comments"></i>
            <span class="badge badge-danger navbar-badge">0</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-item dropdown-header">0 Mensajes</span>
            <div class="dropdown-divider"></div>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">0</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-item dropdown-header">0 Notificaciones</span>
            <div class="dropdown-divider"></div>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="fa fa-sign-out"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span @click="salir()" class="dropdown-item dropdown-header"
              >Cerrar sesion</span
            >
            <div class="dropdown-divider"></div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>

import rutas from '../../../router/rutas.js';
import session from '../../controladores/session.js';
export default {
  name: "nav",
  data() {
    return {
      img1: "../../dist/img/user1-128x128.jpg",
      img2: "../../dist/img/user1-128x128.jpg",
      img3: "../../dist/img/user1-128x128.jpg",
      img4: "../../dist/img/user1-128x128.jpg",
    };
  },
  methods: {
    salir: function () {
      session.salir();
    },
  },
  computed: {},
  mounted: function () {},
  created: function () {},
  components: {},
  props: ["numregs"],
};
</script>
<style scoped>
</style>