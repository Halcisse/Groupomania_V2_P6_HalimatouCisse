import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import store from './store'

library.add(fas);

const app = createApp(App).use(store);

app.use(router);

app.component("iconTag", FontAwesomeIcon).mount("#app");
