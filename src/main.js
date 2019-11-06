import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueCircleSlider from 'vue-circle-slider';
import VTooltip from 'v-tooltip';
import DropdownMenu from '@innologica/vue-dropdown-menu';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook, faFacebookSquare, faInstagram, faReddit, faTwitter, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faCogs, faFacebook, faFacebookSquare, faInstagram, faReddit, faTwitter, faYoutube);

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);
Vue.component('v-select', vSelect);

Vue.use(VueCircleSlider);
Vue.use(VTooltip);
Vue.use(DropdownMenu);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
