<template>
  <div>
    <div class="card border border-success">
      <div class="card-body">
        <form onsubmit="event.preventDefault();" role="form">
          <center>
            <label for="basic-url"><b>Unidades Productivas</b></label>
          </center>
          <div class="input-group mb-3">
            <select
              id="sel_ranch"
              v-model="cat_holding_03_empresas_unidades_productivas_id"
              class="form-control form-control-sm"
              style="width: 100%"
            >
              <option
                v-for="(
                  item, index
                ) in cat_holding_03_empresas_unidades_productivas_ids"
                :key="index"
                v-bind:value="
                  item.cat_holding_03_empresas_unidades_productivas_id
                "
              >
                {{ item.UP }}
              </option>
            </select>
          </div>

        

          

          <center>
            <label for="basic-url"><b>Turnos</b></label>
          </center>
          <div class="input-group mb-3">
            <select
              id="sel_ranch"
              v-model="cat_actividades_turnos_id"
              class="form-control form-control-sm"
              style="width: 100%"
            >
              <option
                v-for="(item, index) in cat_actividades_turnos_ids"
                :key="index"
                v-bind:value="item.cat_actividades_turnos_mu_id"
              >
                {{ item.descripcion_turno }}
              </option>
            </select>
          </div>
          <center>
            <label for="basic-url"><b>Fecha</b></label>
          </center>
          <div class="input-group mb-3">
            <input
              type="date"
              class="form-control"
              placeholder=""
              v-model="fecha_de_captura"
              id="fecha"
            />
          </div>
          <center>
            <label for="basic-url"><b>Hora</b></label>
          </center>
          <div class="input-group mb-3">
            <input
              type="time"
              class="form-control"
              placeholder=""
              v-model="hora"
              id="fecha"
            />
          </div>
        </form>
      </div>
    </div>

    <div class="card border border-success">
      <div class="card-body">
        <center>
          <label for="basic-url"><b>Trabajadores</b></label>
        </center>

        <div class="row">
          <div class="col-12">
            <center>
              <button
                v-on:click="showModalTrabajadores()"
                type="button"
                class="btn btn-success btn-sm"
              >
                Agregar Trabajador
              </button>
            </center>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-12">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, index) in trabajadores"
                :key="index"
                v-on:click="borrarTrabajador(item)"
              >
                {{ item.nombre }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card border border-success">
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <center>
              <button
                v-on:click="borrar()"
                type="button"
                class="btn btn-success btn-sm"
              >
                Borrar
              </button>
            </center>
          </div>
          <div class="col-4">
            <center>
              <button
                v-on:click="guardar()"
                type="button"
                class="btn btn-success btn-sm"
              >
                Guardar
              </button>
            </center>
          </div>
          <div class="col-4">
            <center>
              <button
                v-on:click="enviar()"
                type="button"
                class="btn btn-success btn-sm"
              >
                Enviar
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modal-agregar-trabajador"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Buscar trabajador</h4>
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
                v-for="(item, index) in findtrabajador"
                :key="index"
                v-on:click="seleccionarTrabajador(item)"
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
                    <span class="fas fa-barcode"></span>
                  </div>
                </div>
              </div>
            </form>
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
      cat_holding_03_empresas_unidades_productivas_id: "",
      cat_actividades_metodo_de_costeo_id: "",
      cat_actividades_turnos_id: "",
      cat_trabajadores_altas_id: "",
      cantidad_metodo_de_costeo: "",
      fecha_de_captura: "",
      vigente: "1",
      capturista: "",
      imei: "",
      folio_maestro: "",
      registro_detalle: "",
      lat: "",
      lng: "",
      time_stamp: "",
      cat_holding_03_empresas_unidades_productivas_ids: [],
      cat_actividades_metodo_de_costeo_ids: [],
      cat_actividades_turnos_ids: [],
      cat_trabajadores_altas_ids: [],
      trabajadores: [],
      nombre_trabajador: "",
      hora: "",
    };
  },
  methods: {
    borrar: function () {
      this.cat_holding_03_empresas_unidades_productivas_id = "";
      this.cat_actividades_turnos_id = "";
      this.cat_trabajadores_altas_id = "";
      this.trabajadores = [];
    },
    guardar: function () {
      if (
        this.cat_holding_03_empresas_unidades_productivas_id != "" &&
        this.cat_actividades_turnos_id != "" &&
        this.trabajadores.length > 0
      ) {
        this.capturista = localStorage.getItem("usuario");
        this.registro_detalle = localStorage.getItem(
          "folio_asistencia_detalle"
        );
        this.folio_maestro = localStorage.getItem("folio_asistencia__maestro");
        this.imei = localStorage.getItem("uuid");
        var fecha = this.fecha_de_captura + " " + this.hora;

        if (this.lat == "") {
          this.lat = 0.0;
        }
        if (this.lng == "") {
          this.lng = 0.0;
        }

        this.trabajadores.forEach((element) => {
          var registro =
            "$," +
            this.cat_holding_03_empresas_unidades_productivas_id +
            "," +
            this.cat_actividades_turnos_id +
            "," +
            element.cat_trabajadores_altas_id +
            "," +
            fecha +
            "," +
            this.vigente +
            "," +
            this.capturista +
            "," +
            this.imei +
            "," +
            this.folio_maestro +
            "," +
            this.registro_detalle +
            "," +
            this.lat +
            "," +
            this.lng +
            ",";

          this.registro_detalle = parseInt(this.registro_detalle) + 1;
          localStorage.setItem(
            "folio_asistencia_detalle",
            this.registro_detalle
          );

          let regs = localStorage.getItem("registroAsistencia");
          regs = regs + registro;
          localStorage.setItem("registroAsistencia", regs);
          console.log(registro);
        });

        this.folio_maestro = parseInt(this.folio_maestro) + 1;
        localStorage.setItem("folio_asistencia__maestro", this.folio_maestro);

        Toast.fire({
          icon: "success",
          title: "Registro Guardado",
        });
        this.borrar();
      } else {
        Toast.fire({
          icon: "error",
          title: "Faltan Campos",
        });
      }
    },
    enviar: function () {
      if (localStorage.getItem("registroAsistencia") != "") {
        $("#modal-overlay").modal("show");
        let senddata = {
          data: localStorage.getItem("registroAsistencia"),
        };

        fetch(rutas.Apiregistroasistencia, {
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
                title: "DATOS ENVIADOS",
              });
              localStorage.setItem("registroAsistencia", "");
            }
            setTimeout(() => {
              $("#modal-overlay").modal("hide");
            }, 1000);
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
      } else {
        Toast.fire({
          icon: "error",
          title: "NO EXISTEN REGISTROS",
        });
      }
    },
    fecha: function () {
      var date = new Date();

      var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hour = date.getHours(),
        min = date.getMinutes();

      month = (month < 10 ? "0" : "") + month;
      day = (day < 10 ? "0" : "") + day;
      hour = (hour < 10 ? "0" : "") + hour;
      min = (min < 10 ? "0" : "") + min;

      this.fecha_de_captura = year + "-" + month + "-" + day;
      this.hora = hour + ":" + min;
    },
    showModalTrabajadores: function () {
      $("#modal-agregar-trabajador").modal("show");
    },
    seleccionarTrabajador: function (item) {
      this.trabajadores.push(item);
      this.nombre_trabajador = "";
      $("#modal-agregar-trabajador").modal("hide");
    },
    borrarTrabajador: function (item) {
      var arr = this.trabajadores;
      this.trabajadores = arr.filter((e) => e.nombre !== item.nombre);
    },
    localizacion: function (position) {
      var coordenadas = position.coords;
      this.lat = coordenadas.latitude;
      this.lng = coordenadas.longitude;
      console.log(this.lat);
      console.log(this.lng);
    },
    error: function (error) {
      console.warn("ERROR(" + error.code + "): " + error.message);
    },
  },
  computed: {
    findtrabajador: function () {
      var p = [];

      if (
        this.cat_trabajadores_altas_ids.length > 0 &&
        this.nombre_trabajador != ""
      ) {
        this.cat_trabajadores_altas_ids.forEach((element) => {
          if (element.nombre != null) {
            var n = element.nombre.toUpperCase();
            if (n.includes(this.nombre_trabajador.toUpperCase())) {
              p.push(element);
            }
          }
        });
      }

      return p;
    },
  },
  mounted: function () {
    setTimeout(() => {
      this.cat_holding_03_empresas_unidades_productivas_ids = JSON.parse(
        localStorage.getItem("unidades")
      );
      this.cat_actividades_metodo_de_costeo_ids = JSON.parse(
        localStorage.getItem("costeo")
      );
      this.cat_actividades_turnos_ids = JSON.parse(
        localStorage.getItem("turnos")
      );
      this.cat_trabajadores_altas_ids = JSON.parse(
        localStorage.getItem("trabajadores")
      );
      this.fecha();
    }, 1000);

    var options = {
      enableHighAccuracy: true,
      timeout: 6000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      this.localizacion,
      this.error,
      options
    );
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