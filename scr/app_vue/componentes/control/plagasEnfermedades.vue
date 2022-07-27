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
                tunnel: null,
                groove: null,
                plagueDisease: null,
                count: null,
                severityDamage: null,
                damagedArea: null,
                measurementStage: [],
                aplications: '',
                temperature: null,
                notes: '',
            },
            plagueDisease: [
                '1 / Trips',
                '2 / Mosca blanca',
                '3 / Pulgón',
                '4 / Ácaro',
                '5 / Colaspis',
                '6 / Fumagina',
                '7 / Botrytis',
                '8 / Pestalotia',
                '9 / Muerte agresiva',
                '10 / Gusano enrollador',
                '11 / Piojo harinoso',
                '12 / Roya',
                '13 / Gusano cogollero',
                '14 / Falso medidor',
                '15 / Chinche Iygus',
                '16 / Gusano de fruta',
                '17 / Drosophila',
                '18 / Peca bacteriana',
                '19 / Araña roja',
                '20 / Mayate colaspys',
                '21 / Saltamontes',
            ],
            severityDamage: [
                '1 / 1',
                '2 / 2',
                '3 / 3',
            ],
            damagedArea: [
                '1 / Hojas basales',
                '2 / Tallos',
                '3 / Raíz',
                '4 / Hojas aplicales',
                '5 / Flor',
                '6 / Fruto',
            ],
            measurementStage: [
                'Bajo observación',
                'Uso de deterrentes',
                'Control manual',
                'Control biológico'
            ],
        }),        
        computed: {
            getHour() {
                this.formData.time = this.hours +':'+ this.minutes;
            },
            watchMeasurementStage(){
                return this.formData.measurementStage;
            }
        },
        watch: {
            watchMeasurementStage(val){
                if (val.length  > 0) document.querySelector('.grid-measurement-stage').classList.remove('no-selected');
            }
        },
        methods: {
            validateInput(key, ref){
                if (this.formData[key] === null || this.formData[key] === '') {
                    this.$refs[ref].showError = true;
                    return true;
                } else return false;
            },
            validateInputGroup(key, element){
                if (this.formData[key] === null || this.formData[key] === '' || this.formData[key].length === 0) {
                    document.querySelector(element).classList.add('no-selected');
                    return true;
                } else {
                    document.querySelector(element).classList.remove('no-selected');
                    return false;
                }
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
                if (this.validateInput('tunnel', 'formTunnel')) error =  true;
                if (this.validateInput('groove', 'formGroove')) error = true;
                if (this.validateInput('plagueDisease', 'formPlagueDisease')) error = true;
                if (this.validateInput('count', 'formCount')) error = true;
                if (this.validateInput('severityDamage', 'formSeverityDamage')) error = true;
                if (this.validateInput('damagedArea', 'formDamagedArea')) error = true;
                if (this.validateInputGroup('measurementStage', '.grid-measurement-stage')) error = true;
                if (this.validateInput('temperature', 'formTemperature')) error = true;

                return error;
            },
            submitForm(){
                if (this.validateForm()) return;

                localStorage.setItem('form-manejo-integrado-plagas-enfermedades', JSON.stringify(this.formData));
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

            if (this.formData.measurementStage.length === 0) {
                
            }
        },
    }
</script>
<template>
    <div class="form py-5">
        <!-- HEADER -->
        <div class="text-center mb-4">
            <img class="mb-3" src="https://intelagro.mx/wp-content/uploads/2021/10/intelagro_logito.png" alt="">
            <h2 class="font-weight-bold">
                Manejo integrado de plagas y enfermedades
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

            <!-- TUNNEL -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Tunel*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.tunnel"
                    ref="formTunnel"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- GROOVE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Surco*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.groove"
                    ref="formGroove"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- PLAGUE OR DISEASE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Plaga o Enfermedad*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model="formData.plagueDisease"
                    ref="formPlagueDisease"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                    :optionsList="plagueDisease"
                    select
                />
            </div>

            <!-- COUNT -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Conteo*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model.number="formData.count"
                    ref="formCount"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                />
            </div>

            <!-- SEVERITY DAMAGE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Severidad del Daño*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model="formData.severityDamage"
                    ref="formSeverityDamage"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                    :optionsList="severityDamage"
                    select
                />
            </div>

            <!-- DAMAGED AREA -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Zona de la planta dañada*</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model="formData.damagedArea"
                    ref="formDamagedArea"
                    errorMessage="Este campo es obligatorio."
                    type="decimal"
                    :maxlength="255"
                    :optionsList="damagedArea"
                    select
                />
            </div>

            <!-- MEASUREMENT STAGE -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio">Etapa de medida*</span>
                </label>

                <!-- INPUT -->
                <div class="grid-answer grid-measurement-stage">
                    <div v-for="(item, idx) in measurementStage" :key="idx">
                        <label class="custom-control custom-checkbox form-control" :for="'measurementStage' + idx">
                            <input type="checkbox" class="custom-control-input" :id="'measurementStage' + idx" :value="item" v-model="formData.measurementStage">
                            <span class="custom-control-label">
                                {{ item }}
                            </span>
                        </label>
                    </div>
                </div>
                <div class="invalid-feedback text-center"> Este campo es obligatorio </div>
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
            
            <!-- APLICATIONS -->
            <div class="form-group">
                <label class="text-center w-100">
                    <span class="font-weight-bold" title="Este campo es obligatorio"> Aplicaciones:</span>
                </label>

                <!-- INPUT -->
                <input-component
                    v-model="formData.aplications"
                    ref="formAplications"
                    errorMessage="Este campo es obligatorio."
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