<template>
  <div>
    <div class="card border border-success">
      <div class="card-header">
        <div class="row">
          <div class="col-6">
            <label for="sel_ranch">Unidad</label>
            <select
              @change="tabla()"
              id="sel_ranch"
              v-model="unidad"
              class="form-control form-control-sm"
              style="width: 100%"
            >
              <option
                v-for="(item, index) in unidades"
                :key="item"
                v-bind:selected="index === 0"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="col-6">
            <label for="sel_fecha">Fecha</label>
            <select
              @change="tabla()"
              id="sel_fecha"
              v-model="fecha"
              class="form-control form-control-sm"
              style="width: 100%"
            >
              <option
                v-for="(item, index) in fechas"
                :key="item"
                v-bind:selected="index === 0"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Trabajador</th>
                  <th>Turno</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in datatabla" :key="index">
                  <td>{{ item.trabajador }}</td>
                  <td>{{ item.descripcion_turno }}</td>
                  <td>{{ item.fecha_filtro }}</td>
                  <td>{{ formatoHora(item.fecha_hora) }}</td>
                </tr>
              </tbody>
            </table>
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
      fechas: [],
      unidades: [],
      unidad: "",
      fecha: "",
      datatabla: [],
      datos: [],
    };
  },
  methods: {
    formatoHora: function (item) {
      var hora = item.split("T");
      var h = hora[1].substring(0, 8);
      return h;
    },
    tabla: function () {
      this.datatabla = [];
      this.datos.forEach((element) => {
        if (element.fecha_filtro == this.fecha && element.UP == this.unidad) {
          this.datatabla.push(element);
        }
      });
      this.refresch_table();
    },
    refresch_table: function () {
      if ($.fn.dataTable.isDataTable("#example1")) {
        $("#example1").DataTable().destroy();
        $(document).ready(function () {
          $("#example1").DataTable({
            responsive: true,
            autoWidth: true,
            searching: false,
            paging: false,
          });
        });
      } else {
        $(document).ready(function () {
          $("#example1").DataTable({
            responsive: true,
            autoWidth: true,
            searching: false,
            paging: false,
          });
        });
      }
    },
    datosfechas: function () {
      var sem = [];
      if (localStorage.getItem("actividades")) {
        var informe = JSON.parse(localStorage.getItem("actividades"));
        informe.forEach((element) => {
          if (element.fecha_filtro != null) {
            sem.push(element.fecha_filtro);
          }
        });
      }

      var unicossem = [...new Set(sem)];
      return unicossem.sort(function (a, b) {
        return a - b;
      });
    },
    datosunidades: function () {
      var sem = [];
      if (localStorage.getItem("actividades")) {
        var informe = JSON.parse(localStorage.getItem("actividades"));
        informe.forEach((element) => {
          if (element.UP != null) {
            sem.push(element.UP);
          }
        });
      }

      var unicossem = [...new Set(sem)];
      return unicossem.sort(function (a, b) {
        return a - b;
      });
    },
    actualizar: function () {
      var licencia = { licencia: session.licencia() };
      $("#modal-overlay").modal("show");
      fetch(rutas.Apidatosasistencia, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + session.token(),
        },
        body: JSON.stringify(licencia),
      })
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          $("#modal-overlay").modal("hide");
          if (res.estado == "fail") {
            Toast.fire({
              icon: "error",
              title: "Error ",
            });
          }
          if (res.estado == "OK") {
            Toast.fire({
              icon: "success",
              title: "DATOS ACTUALIZADOS",
            });

            localStorage.setItem(
              "trabajadores",
              JSON.stringify(res.trabajadores)
            );

            localStorage.setItem("unidades", JSON.stringify(res.unidades));
            localStorage.setItem("costeo", JSON.stringify(res.costeo));
            localStorage.setItem("turnos", JSON.stringify(res.turnos));
            localStorage.setItem(
              "actividades",
              JSON.stringify(res.actividades)
            );

            setTimeout(() => {
              $("#modal-overlay").modal("hide");
              this.fechas = this.datosfechas();
              this.fechas.reverse();
              this.unidades = this.datosunidades();
              this.datos = JSON.parse(localStorage.getItem("actividades"));
              this.refresch_table();
            }, 1000);
          }
        })
        .catch(function (err) {
          $("#modal-overlay").modal("hide");
          Toast.fire({
            icon: "error",
            title: err,
          });
          console.error(err);
        });
    },
  },
  computed: {},
  mounted: function () {
    this.actualizar();
  },
  created: function () {},
  components: {},
  props: [],
};
</script>
<style scoped>
</style>