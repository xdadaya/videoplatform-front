<template>
    <select @change="changeOption">
        <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name: 'custom-select',
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            changeOption(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>