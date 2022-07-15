<template>
  <div>
    <div class="login-box">
      <div class="login-logo"></div>

      <div class="card">
        <div class="card-body login-card-body">
          <center>
            <img :src="logo" style="opacity: 0.8" />
          </center>
          <br />
          <h4 class="login-box-msg"></h4>
          <p class="login-box-msg">Iniciar Sesión</p>

          <form>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Usuario"
                v-model="usuario"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Contraseña"
                v-model="pass"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button
                  v-on:click="login"
                  type="button"
                  class="btn btn-success btn-block"
                >
                  Entrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div style="text-align: center"><b>Version</b> {{ version }}</div>
    </div>
  </div>
</template>
<script>
import back from "../../../router/rutas_back.js";
import front from "../../../router/rutas_front.js";
import session from "../../controladores/session.js";
import funciones from "../../controladores/funciones.js";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
export default {
  name: "login",
  data() {
    return {
      logo: "https://intelagro.mx/wp-content/uploads/2021/10/intelagro_logito.png",
      usuario: "",
      pass: "",
      version: "",
    };
  },
  methods: {
    login: function () {
      if (this.pass != "" && this.usuario != "") {
        var logindata = {
          pass: this.pass,
          user: this.usuario,
        };

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("user", this.usuario);
        urlencoded.append("pass", this.pass);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        fetch("https://intelagro.net/intelagro/loginIntelagro", requestOptions)
          .then((response) => response.json())
          .then((data) =>{ console.log(data)

           if (data.estado == "fail") {
              Toast.fire({
                icon: "error",
                title: "Contraseña y/o Usuario Incorrectos",
              });
            }
            if (data.estado == "OK") {
              Toast.fire({
                icon: "success",
                title: "Bienvenido " + data.data.usuario,
              });
            
              setTimeout(() => {
              session.inicio(
                  data.data.nombre,
                  data.data.cat_usuarios_licencia_id,
                  data.data.token,
                  data.data.usuario,
                  data.data.vigente,
                  data.data.modulos,
                  data.data.catalogos
                );
              
              }, 1000);
            }
          
          }
          )
          .catch((error) => console.log("error", error));

        /*
        fetch("https://intelagro.net/intelagro/loginIntelagro", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logindata),
        })
          .then(function (response) {
            if (!response.ok) throw Error(response.status);

            return response.json();
          })
          .then(function (data) {
           
            if (data.estado == "fail") {
              Toast.fire({
                icon: "error",
                title: "Contraseña y/o Usuario Incorrectos",
              });
            }
            if (data.estado == "OK") {
              Toast.fire({
                icon: "success",
                title: "Bienvenido " + data.data.usuario,
              });
            
              setTimeout(() => {
              session.inicio(
                  data.data.nombre,
                  data.data.cat_usuarios_licencia_id,
                  data.data.token,
                  data.data.usuario,
                  data.data.vigente,
                  data.data.modulos,
                  data.data.catalogos
                );
              
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);

            Toast.fire({
              icon: "error",
              title: "Contraseña y/o Usuario Incorrectos",
            });
          });
      */
      } else {
        Toast.fire({
          icon: "info",
          title: "Existen Campos En Blanco",
        });
      }
    },
  },
  computed: {},
  mounted: function () {
    if (
      localStorage.getItem("cat_usuarios_licencias_id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("usuario")
    ) {
      location.href = front.host + front.modulos;
    }
    this.version = funciones.version();
  },
  created: function () {},
  components: {},
  props: [],
};
</script>
<style scoped>
img {
  max-width: 100%;
  height: auto;
  width: 50%;
}
.login-box {
  margin-left: 5%;
}
</style>
