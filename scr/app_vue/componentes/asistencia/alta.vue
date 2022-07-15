<template>
  <div>
    <div class="card border border-success">
      <div class="card-header">
        <div class="row">
          <div class="col-12" style="text-align: center">
            <video autoplay="true" id="camara"></video>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <center>
              <button
                v-on:click="tomarFoto()"
                type="button"
                class="btn btn-success btn-lg"
              >
                <i class="fas fa-camera"></i>
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modal-foto"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
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
              <div class="col-12" style="text-align: center">
                <canvas id="foto"></canvas>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <ul v-if="ullist" class="list-group">
                  <li
                    class="list-group-item"
                    v-for="item in findtrabajador"
                    :key="item.nombre_completo"
                    v-on:click="
                      seleccionarNombre(
                        item.cat_trabajadores_altas_id,
                        item.nombre_completo
                      )
                    "
                  >
                    {{ item.nombre_completo }}
                  </li>
                </ul>

                <form onsubmit="event.preventDefault();" role="form">
                  <div class="card-body">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nombre"
                        @change="buscartrabajador()"
                        v-model="nombreTrabajador"
                        id="nombreproducto"
                      />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <span class="fas fa-user"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="row">
                      <div class="col-12">
                        Nombre: {{ nombre }}
                        <br />
                        Id: {{ idtrabajador }}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <center>
                <button
                  v-on:click="enviar()"
                  type="button"
                  class="btn btn-success btn-sm"
                >
                  ENVIAR
                  <i class="fas fa-cloud-upload-alt"></i>
                </button>
              </center>
            </div>
            <div class="col-6">
              <center>
                <button
                  v-on:click="cancelar()"
                  type="button"
                  class="btn btn-success btn-sm"
                >
                  CANCELAR
                  <i class="fas fa-trash"></i>
                </button>
              </center>
            </div>
          </div>

          <div class="modal-footer justify-content-between"></div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal-overlay-act">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="overlay d-flex justify-content-center align-items-center">
            <i class="fas fa-2x fa-sync fa-spin"></i>
          </div>

          <div class="modal-body">
            <p>ACTUALIZANDO....</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal-overlay-env">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="overlay d-flex justify-content-center align-items-center">
            <i class="fas fa-2x fa-sync fa-spin"></i>
          </div>

          <div class="modal-body">
            <p>ENVIANDO....</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import session from "../../controladores/session";
import rutas from "../../../router/rutas_back.js";
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
      camaras: [],
      camid: "",
      video: "",
      canvas: "",
      nombre: "",
      codigo: "",
      nombreTrabajador: "",
      idtrabajador: "",
      findtrabajador: [],
      ullist: false,
    };
  },
  methods: {
    seleccionarNombre: function (codigo, nombre) {
      this.ullist = false;
      this.findtrabajador = [];
      this.nombreTrabajador = "";
      this.idtrabajador = codigo;
      this.nombre = nombre;
    },
    initCamara: function () {
      this.video = document.getElementById("camara");
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => {
          this.video.srcObject = stream;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tomarFoto: function () {
      $("#modal-foto").modal("show");
      this.canvas = document.getElementById("foto");
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      let ctx = this.canvas.getContext("2d");
      ctx.drawImage(
        this.video,
        0,
        0,
        this.video.videoWidth,
        this.video.videoHeight
      );
    },
    buscartrabajador: function () {
      this.ullist = true;
      this.findtrabajador = [];
      if (localStorage.getItem("trabajadores")) {
        var arraytrabajadores = JSON.parse(
          localStorage.getItem("trabajadores")
        );
        if (this.nombreTrabajador != "") {
          arraytrabajadores.forEach((element) => {
            if (element.nombre_completo != null) {
              var n = element.nombre_completo.toUpperCase();
              if (n.includes(this.nombreTrabajador.toUpperCase())) {
                this.findtrabajador.push(element);
              }
            }
          });
        }
      }
    },
    enviar: function () {
      this.canvas.toBlob((blob) => {
        var data = new FormData();
        data.append("image", blob, this.idtrabajador + ".png");
        $("#modal-overlay-env").modal("show");

        fetch(rutas.Apiagregarfoto, {
          method: "POST",
          headers: {
            authorization: "Bearer " + session.token(),
          },
          body: data,
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

              setTimeout(() => {
                $("#modal-overlay-env").modal("hide");
                this.cancelar();
              }, 1000);
            }
          })
          .catch(function (err) {
            Toast.fire({
              icon: "error",
              title: err,
            });
            console.error(err);
            setTimeout(() => {
              $("#modal-overlay-env").modal("hide");
              this.cancelar();
            }, 1000);
          });
      });
    },
    cancelar: function () {
      this.idtrabajador = "";
      this.nombreTrabajador = "";
      this.nombre = "";
      this.codigo = "";
      var contexto = this.canvas.getContext("2d");
      contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
      $("#modal-foto").modal("hide");
    },
  },
  computed: {},
  mounted: function () {
    this.initCamara();
  },
  created: function () {},
  components: {},
  props: [],
};
</script>
<style scoped>
#camara {
  max-width: 100%;
  max-height: 100%;
}
#foto {
  max-width: 100%;
  max-height: 100%;
}
.modal-body {
  height: 100%;
}
ul {
  height: 100px;
  width: 100%;
}
ul {
  overflow: hidden;
  overflow-y: scroll;
}
.row {
  margin-top: 0.5%;
  margin-bottom: 0.5%;
}
</style>