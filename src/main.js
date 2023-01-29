
import { createApp } from 'vue'
import App from './App'
import router from './router/router';
import components from "./components/UI"
import store from '@/store';
import VScrollEffect from '@/directives/VScrollEffect';

const app = createApp(App);
components.forEach(component => {
    app.component(component.name, component)
});
app.directive('scrolleffect',VScrollEffect);
app
    .use(router)
    .use(store)
    .mount('#app')
