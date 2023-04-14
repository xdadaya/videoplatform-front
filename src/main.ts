import { createApp } from 'vue'
import App from '@/App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import components from '@/components/UI'
import directives from '@/directives'
import router from '@/router/router'
import store from '@/store'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdThumbupaltOutlined, MdThumbupaltRound, MdThumbdownaltOutlined, MdThumbdownaltRound } from "oh-vue-icons/icons"

const app = createApp(App)

addIcons(MdThumbupaltOutlined, MdThumbupaltRound, MdThumbdownaltOutlined, MdThumbdownaltRound)


components.forEach(component => app.component(component.name, component))
directives.forEach(directive => app.directive(directive.name, directive))

app.use(router).use(store).use(Toast).component("v-icon", OhVueIcon).mount('#app')
