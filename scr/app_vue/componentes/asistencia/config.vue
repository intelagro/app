<template>
  <div>
    <div class="card border border-success">
      <div class="card-header">
        <form role="form">
          <div class="card-body">
            <center>
              <button
                v-on:click="actualizar()"
                type="button"
                class="btn btn-success btn-lg"
              >
                ACTUALIZAR
                <i class="fas fa-download"></i>
              </button>
            </center>
          </div>
        </form>
      </div>
    </div>

    <div class="modal fade" id="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="overlay d-flex justify-content-center align-items-center">
            <i class="fas fa-2x fa-sync fa-spin"></i>
          </div>

          <div class="modal-body">
            <p>CARGANDO....</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rutas from "../../../router/rutas_back.js";
import session from "../../controladores/session.js";
var bt;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
export default {
  name: "configasistencia",
  data() {
    return {
      impresora: "",
      bascula: "",
      device: "",
      btu: "",
    };
  },
  methods: {
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
            localStorage.setItem("actividades", JSON.stringify(res.actividades));

            setTimeout(() => {
              $("#modal-overlay").modal("hide");
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
  mounted: async function () {
    this.actualizar();
  },
  created: function () {},
  components: {},
  props: [],
};
</script>
<style scoped>
</style>