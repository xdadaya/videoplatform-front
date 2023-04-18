<template>
    
    <div role="status" class="mx-auto space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center my-10">
        <div class="w-12 flex justify-center items-center flex-row md:flex-col gap-2">
            <span class="cursor-pointer">
                <v-icon name="md-thumbupalt-outlined" fill="gray"/>
            </span>
            <span class="font-bold"> X </span>
            <span class="cursor-pointer">
                <v-icon name="md-thumbdownalt-outlined" fill="gray"/>
            </span>
        </div>
        <div class="w-full">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[420px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span class="sr-only">Loading...</span>
    </div>

</template>

<script>
    export default {
        
    }
</script>