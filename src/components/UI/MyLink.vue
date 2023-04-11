<template>
    <span class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 md:hover:text-blue-700 md:cursor-pointer"
        :class="{'md:text-blue-700 bg-blue-700': isSelected}">
        <slot></slot>
    </span>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        props: {
            isSelected: {
                type: Boolean,
                default: false
            }
        },
        name: 'my-link',
    })
</script>