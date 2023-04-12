<template>
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="login">
        <h4 class="text-center text-3xl font-bold"> Authenticate </h4>
        <custom-input type="text" v-focus v-model="user.username" placeholder="Username" @keyup.enter="login" />
        <custom-input type="password" v-model="user.password" placeholder="Password" @keyup.enter="login" />
        <custom-button class="mx-auto" @click="login"> Authenticate </custom-button>
    </form>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            this.loginStore(this.user)
            this.user = {
                username: '',
                password: '',
            }
            this.$emit('closeDialog')
        },
        ...mapActions({
            loginStore: 'auth/login'
        }),
    }
})
</script>