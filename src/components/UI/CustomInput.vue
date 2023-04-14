<template>
    <input :value="modelValue" @input="updateInput" class="w-full rounded-lg border-2 px-2 py-2 my-3" type="text">
</template>

<script>
    export default {
        name: 'custom-input',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>
