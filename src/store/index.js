import {createStore } from "vuex";
import { reportModule } from "./reportModule";

export default createStore({
    modules:{
        report:reportModule
    }
})