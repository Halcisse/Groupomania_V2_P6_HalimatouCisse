import { createApp } from "vue";
import App from "../src/App.vue";
import router from "./router";
import store from "./store";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const app = createApp(App);
app.component("iconTag", FontAwesomeIcon);

app.use(router).use(store).mount("#app");
