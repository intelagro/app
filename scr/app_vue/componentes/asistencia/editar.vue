<template>
  <div>
    <div class="card border border-success">
      <div class="card-body">
        <center>
          <label for="basic-url"><b>Trabajador</b></label>
        </center>

        <div class="row">
          <div class="col-12">
            <center>
              <button
                v-on:click="showBuscarTrabajar()"
                type="button"
                class="btn btn-success btn-lg"
              >
                Buscar Trabajador
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>

    <div class="card border border-success">
      <div class="card-body">
        <center>
          <label for="basic-url"><b>Registros</b></label>
        </center>
        <div class="row">
          <div class="col-12">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, index) in list_registros"
                :key="index"
                v-on:click="editar(item)"
              >
                {{ item.fecha_de_captura }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modal-buscar-trabajador"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Buscar Trabajador</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, index) in list_trabajadores"
                :key="index"
                v-on:click="registros(item)"
              >
                {{ item.nombre }}
              </li>
            </ul>
            <form role="form" onsubmit="event.preventDefault()">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                  v-model="nombre_trabajador"
                  id="nombre_proveedor"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modal-editar-registro"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Editar Registro</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <form role="form" onsubmit="event.preventDefault()">
                  <center>
                    <label for="basic-url"><b>Fecha</b></label>
                  </center>

                  <div class="input-group mb-3">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Nombre"
                      v-model="editfecha"
                      id="nombre_proveedor"
                    />
                  </div>

                  <center>
                    <label for="basic-url"><b>Hora</b></label>
                  </center>

                  <div class="input-group mb-3">
                    <input
                      type="time"
                      class="form-control"
                      placeholder="Nombre"
                      v-model="edithora"
                      id="nombre_proveedor"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <center>
                  <button
                    v-on:click="cancelar()"
                    type="button"
                    class="btn btn-success btn-lg"
                  >
                    Cancelar
                  </button>
                </center>
              </div>
              <div class="col-4">
                <center>
                  <button
                    v-on:click="editarRegistro('edit')"
                    type="button"
                    class="btn btn-success btn-lg"
                  >
                    Editar
                  </button>
                </center>
              </div>
              <div class="col-4">
                <center>
                  <button
                    v-on:click="editarRegistro('delete')"
                    type="button"
                    class="btn btn-success btn-lg"
                  >
                    Eliminar
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
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
    return {
      trabajadores: [],
      nombre_trabajador: "",
      list_registros: [],
      editregistro: {},
      editfecha: "",
      edithora: "",
    };
  },
  methods: {
    showBuscarTrabajar: function () {
      $("#modal-buscar-trabajador").modal("show");
    },
    registros: function (item) {
      let senddata = {
        id: item.cat_trabajadores_altas_id,
      };

      fetch(rutas.Apigetregistroasistencia, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + session.token(),
        },
        body: JSON.stringify(senddata),
      })
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          if (res.estado == "fail") {
            Toast.fire({
              icon: "error",
              title: "Error ",
            });
          }
          if (res.estado == "OK") {
            console.log(res);
            $("#modal-buscar-trabajador").modal("hide");

            if (res.registros.length > 0) {
              Toast.fire({
                icon: "success",
                title: "REGISTROS OK",
              });

              this.list_registros = res.registros.reverse();
            } else {
              Toast.fire({
                icon: "error",
                title: "SIN REGISTROS",
              });
            }
          }
        })
        .catch(function (err) {
          Toast.fire({
            icon: "error",
            title: err,
          });
          console.error(err);
          setTimeout(() => {
            $("#modal-overlay").modal("hide");
          }, 1000);
        });
    },
    editar: function (item) {
      $("#modal-editar-registro").modal("show");
      this.editregistro = item;
      console.log(item.fecha_de_captura.substring(0, 10));
      console.log(item.fecha_de_captura.substring(12, 16));

      this.editfecha = item.fecha_de_captura.substring(0, 10);
      this.edithora = item.fecha_de_captura.substring(11, 16);
    },
    cancelar: function () {
      $("#modal-editar-registro").modal("hide");
      this.list_registros = [];
      this.editregistro = {};
      this.editfecha = "";
      this.edithora = "";
    },
    editarRegistro: function (cmd) {
      let fechahora = this.editfecha + " " + this.edithora;
      let senddata = {
        item: this.editregistro,
        fecha: fechahora,
        cmd:cmd
      };

      fetch(rutas.Apieditregistroasistencia, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + session.token(),
        },
        body: JSON.stringify(senddata),
      })
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          if (res.estado == "fail") {
            Toast.fire({
              icon: "error",
              title: "Error ",
            });
          }
          if (res.estado == "OK") {

             Toast.fire({
                icon: "success",
                title: "REGISTRO EDITADO",
              });

              this.cancelar();
          }
        })
        .catch(function (err) {
          Toast.fire({
            icon: "error",
            title: err,
          });
          console.error(err);
          setTimeout(() => {
            $("#modal-overlay").modal("hide");
          }, 1000);
        });
    },
  },
  computed: {
    list_trabajadores: function () {
      var p = [];

      if (this.trabajadores.length > 0 && this.nombre_trabajador != "") {
        this.trabajadores.forEach((element) => {
          var n = element.nombre.toUpperCase();
          if (n.includes(this.nombre_trabajador.toUpperCase())) {
            p.push(element);
          }
        });
      }
      return p;
    },
  },
  mounted: function () {
    this.trabajadores = JSON.parse(localStorage.getItem("trabajadores"));
  },
  created: function () {},
  components: {},
  props: [],
};
</script>
<style scoped>
ul {
  height: 200px;
  width: 100%;
}
ul {
  overflow: hidden;
  overflow-y: scroll;
}

.row {
  margin-top: 2.5%;
  margin-bottom: 2.5%;
}
</style>