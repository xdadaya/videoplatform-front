<template>
  <Navbar />
  <div class="container mx-auto"><router-view></router-view></div>
  <!-- <Footer /> -->
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    Footer,
  },
  methods:{
    getCookie(name) {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
          return cookie[1];
        }
      }
      return null;
    },
    ...mapActions({
      refresh: 'auth/refresh',
    }),
  },
  created(){
    const refreshToken = this.getCookie('refreshToken')
    if(refreshToken) this.refresh(refreshToken)
  }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>