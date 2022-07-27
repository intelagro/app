<script>
    export default {
        props: {
            id: String,
            value: [ String, Number, Object ],
            placeholder: String,
            errorMessage: String,
            type: String,
            maxlength: Number,
            select: Boolean,
            optionSelectNone: Boolean,
            optionsList: Array
        },
        data: () => ({
            showError: false,
            regexpTypes: {
                decimal: /^(\d{0,10}?[.]{0,1}?\d{0,10}?)$/g,
                currency: /^((\$?\-?)|(\-?\$?))([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)?(\.[0-9]*)?$/g,
                integer: /^\d+$/g,
                letters: /^[a-zA-zÀ-ú\s]*$/g,
                email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            },
        }),
        methods: {
            handleInput(e) {
                var position = Object.keys(this.regexpTypes).indexOf(this.type);
                var approveValue = true;
                let value = e.target.value.trim();

                if ( position > -1 &&  value != '' ) {
                    approveValue = !!value.trim().match( this.regexpTypes[this.type] );
                }

                if ( !approveValue ) {
                    e.target.value = !!e.target._value ? e.target._value : '';
                    return;
                }

                e.preventDefault();
                this.resetError();

                this.$emit('input', value);
                return;
            },
            handleSelect(e) {
                let value = e.target.value;
                this.resetError();

                this.$emit('input', value);
                return;
            },
            resetError() {
                this.showError = false;
            },
        }
    }
</script>

<template>
    <div>
        <input
            class="form-control"
            :class="showError && 'is-invalid'"
            :id="id"
            :name="id"
            :value="value"
            :type="type"
            :maxlength="!!maxlength ? maxlength : 255"
            :placeholder="placeholder ? placeholder : ''"
            @input="handleInput"
            v-if="!select"
        >
        <select
            class="custom-select"
            :class="showError && 'is-invalid'"
            :id="id"
            :name="id"
            @input="handleSelect"
            v-else
        >   
            <option selected disabled hidden></option>
            <option :value="item" v-for="(item, idx) in optionsList" :key="idx">
                {{ item }}
            </option>
        </select>
        <div class="invalid-feedback text-center"> {{ errorMessage }} </div>
    </div>
</template>