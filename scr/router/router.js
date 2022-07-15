import Vue    from 'vue'
import Router from 'vue-router'
import rutas from'./rutas_intelagro.js';
Vue.use(Router)

export default new Router({
    routes:rutas.rutas,
    linkActiveClass: "active",
    mode: "history"
})

