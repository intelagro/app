<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/locale/es';

    import InputComponent from './ui/InputComponent.vue';
    
    export default {
        components: {
            DatePicker,
            InputComponent 
        },
        data: () => ({
            formData: {
                date: null,
                ranch: '1 / La Estación',
                sector: null,
                ph: null,
                ce: null,
                sodium: null
            },
        }),
        methods: {
            validateInput(key, ref){
                if (this.formData[key] === null || this.formData[key] === '') {
                    this.$refs[ref].showError = true;
                    return true;
                } else return false;
            },
            showAlert() {
                this.$swal({
                    text: 'Datos guardados con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: "#28A745",
                }).then( isConfirm => isConfirm && location.reload() );
            },
            validateForm(){
                var error = false;

                if (this.validateInput('sector', 'formSector')) error = true;
                if (this.validateInput('ph', 'formPh')) error = true;
                if (this.validateInput('ce', 'formCe')) error = true;
                if (this.validateInput('sodium', 'formSodium')) error = true;

                return error;
            },
            submitForm(){
                if (this.validateForm()) return;

                localStorage.setItem('form-monitoreo-ph-ce-sodio', JSON.stringify(this.formData));
                this.showAlert();
            }
        },
        mounted(){
            /* GET CURRENT DATE */
            const date = new Date();

            let day = date.getDate(), 
                month = date.getMonth() + 1, 
                year = date.getFullYear();

            let currentDate = `${year}-${month < 10 ? '0' + month : month}-${day}`;
            this.formData.date = currentDate;
        },
    }
</script>
<template>
    <div class="form py-5">
        <!-- HEADER -->
        <div class="text-center mb-4">
            <img class="mb-3" src="https://intelagro.mx/wp-content/uploads/2021/10/intelagro_logito.png" alt="">
            <h2 class="font-weight-bold">
                Monitoreo PH/CE/Sodio 2
            </h2>
            <p>
                Bienvenido, por favor completa la información siguiente.
            </p>
        </div> 

        <div class="form-box mx-auto">

            <!-- DATE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold">Fecha</span>
                </label>
                <date-picker class="w-100" inputClass="form-control w-100" :appendToBody="false" :editable="false" :clearable = "false" v-model="formData.date" valueType="format" ref="inputDate"/>
            </div>

            <!-- RANCH -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold">Rancho</span>
                </label>

                <!-- INPUT -->
                <div class="row">
                    <div class="col-6">
                        <label class="custom-control custom-radio form-control text-center"  for="rancho1">
                            <input type="radio" id="rancho1" name="rancho" class="custom-control-input" value="1 / La Estación" v-model="formData.ranch">
                            <span class="custom-control-label">
                                1 / La Estación
                            </span>
                        </label>
                    </div>
                    <div class="col-6">
                        <label class="custom-control custom-radio form-control text-center"  for="rancho2">
                            <input type="radio" id="rancho2" name="rancho" class="custom-control-input" value="2 / Loma" v-model="formData.ranch">
                            <span class="custom-control-label">
                                2 / Loma
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- SECTOR -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Sector</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.sector"
                    ref="formSector"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- PH -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">1 / PH*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.ph"
                    ref="formPh"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- CE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">2 / CE*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.ce"
                    ref="formCe"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- SODIUM -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">3 / Sodio*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.sodium"
                    ref="formSodium"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <button type="submit" class="btn btn-success btn-block col-sm-4 mt-4 mx-auto" @click="submitForm()">
                Enviar
            </button>
        </div>         
    </div>
</template>
<style scoped>
    @import '../../../../node_modules/vue2-datepicker/index.css';
    @import '../../../../node_modules/sweetalert2/dist/sweetalert2.min.css';
    @import 'css/style.css';
</style>