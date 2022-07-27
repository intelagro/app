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
            hours: '',
            minutes: '',
            formData: {
                date: null,
                time: '',
                ranch: '1 / La Estación',
                sector: null,
                incomingPh: null,
                incomingCe: null,
                incomingWater: null,
                outgoingPh: null,
                outgoingCe: null,
                outgoingWater: null,
                temperature: null,
                notes: ''
            },
        }),        
        computed: {
            getHour() {
                this.formData.time = this.hours +':'+ this.minutes;
            }
        },
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
                if (this.validateInput('incomingPh', 'formIncomingPh')) error = true;
                if (this.validateInput('incomingCe', 'formIncomingCe')) error = true;
                if (this.validateInput('incomingWater', 'formIncomingWater')) error = true;
                if (this.validateInput('outgoingPh', 'formOutgoingPh')) error = true;
                if (this.validateInput('outgoingCe', 'formOutgoingCe')) error = true;
                if (this.validateInput('outgoingWater', 'formOutgoingWater')) error = true;
                if (this.validateInput('temperature', 'formTemperature')) error = true;

                return error;
            },
            submitForm(){
                if (this.validateForm()) return;

                localStorage.setItem('form-monitoreo-drenaje', JSON.stringify(this.formData));
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

            /* GET CURRENT TIME */
            let hour = date.getHours();
            let currentHour = hour < 10 ? '0' + hour : hour;
            this.hours = currentHour;

            let minutes = date.getMinutes();
            let currentMinutes = minutes < 10 ? '0' + minutes : minutes;
            this.minutes = currentMinutes;
        },
    }
</script>
<template>
    <div class="form py-5">
        <!-- HEADER -->
        <div class="text-center mb-4">
            <img class="mb-3" src="https://intelagro.mx/wp-content/uploads/2021/10/intelagro_logito.png" alt="">
            <h2 class="font-weight-bold">
                Monitoreo drenaje
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

            <!-- TIME -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold">Hora</span>
                </label>

                <!-- INPUT -->
                <div class="row">
                    <div class="col-6">
                        <select class="custom-select" v-model="hours">
                            <option selected hidden></option>
                            <option :value="idx < 10 ? '0' + idx : idx" v-for="(hour, idx) in 24" :key="idx">
                                {{ idx < 10 ? '0' + idx : idx }}
                            </option>
                        </select>
                        <div class="text-left">
                            <small> Horas </small>
                        </div>
                    </div>
                    <div class="col-6">
                        <select class="custom-select" v-model="minutes">
                            <option selected hidden></option>
                            <option :value="idx < 10 ? '0' + idx : idx" v-for="(hour, idx) in 60" :key="idx">
                                {{ idx < 10 ? '0' + idx : idx }}
                            </option>
                        </select>
                        <div class="text-left">
                            <small> Minutos </small>
                        </div>
                    </div>
                </div>
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

            <!-- INCOMING PH -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">1 / Entrada / PH*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.incomingPh"
                    ref="formIncomingPh"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- INCOMING CE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">2 / Entrada / CE*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.incomingCe"
                    ref="formIncomingCe"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- INCOMING WATER -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">3 / Entrada / Agua*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.incomingWater"
                    ref="formIncomingWater"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- OUTGOING PH -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio"> 4 / Salida / PH*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.outgoingPh"
                    ref="formOutgoingPh"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- OUTGOING CE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio"> 5 / Salida / CE*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.outgoingCe"
                    ref="formOutgoingCe"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- OUTGOING WATER -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio"> 6 / Salida / Agua*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.outgoingWater"
                    ref="formOutgoingWater"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- TEMPERATURE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio"> 7 / Temperatura*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.temperature"
                    ref="formTemperature"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- NOTES -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio"> Observaciones:</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model="formData.notes"
                    ref="formNotes"
                    errorMessage="Este campo es obligatorio."
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