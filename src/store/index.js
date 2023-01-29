import { createStore } from "vuex";
import { reportModule } from "./reportModule";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

export default createStore({
    state: {
        reports: [],
        mustChangeReport: {
            title: "",
            path: "",
            author: "",
            subject: "",
            type_work: "",
            number_work: "",
            note: "",
            doc_uuid: "",
        },
        isReportLoading: false,
        globalAuthor: "",
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPage: 0,
        sortOptions: [
            { value: "title", name: "По названию" },
            { value: "subject", name: "По предмету" },
            { value: "type_work", name: "По типу" },
            { value: "autor.name", name: "По автору" },
        ],
    },
    modules: {
        report: reportModule,
        actions: actions,
        mutations: mutations,
        getters: getters,

    }
})