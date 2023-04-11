<template>
    <div v-if="isVisible" class="inset-0 bg-black/50 fixed flex" @click.stop="hideDialog">
        <div @click.stop class="m-auto bg-white rounded-lg p-3 w-full max-w-lg">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'my-dialog',
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