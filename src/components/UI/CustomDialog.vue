<template>
    <div v-if="isVisible" class="inset-0 z-20 bg-black/50 fixed flex" @click.stop="hideDialog">
        <div @click.stop class="m-auto bg-white rounded-lg p-3 w-full max-w-lg">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'custom-dialog',
        props: {
        isVisible: {
            type: Boolean,
            default: false
        }
        },
        methods: {
            hideDialog() {
                this.$emit('update:isVisible', false)
            }
        },
    }
</script>