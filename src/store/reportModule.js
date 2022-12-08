import axios from "axios";

export const reportModule = {
  state: () => ({
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
  }),
  getters: {
    getReportByUuid: (state) => (doc_uuid) => {
      return state.reports.find(
        (reportMass) => reportMass.doc_uuid === doc_uuid
      );
    },

    globalAuthor(state) {
      return state.globalAuthor;
    },

    sortReports(state) {
      return [...state.reports].sort((Report1, Report2) =>
        Report1[state.selectedSort]?.localeCompare(Report2[state.selectedSort])
      );
    },

    reportsByAuthorUuid: (state) => (uuid) => {
      return [...state.reports].filter((Report) =>
        Report.author.uuid.includes(uuid)
      );
    },

    reportsByName: (state) => (requiredUuid, uuid) => {
      return [...state.reports]
        .filter((Report) => Report.author.uuid.includes(requiredUuid))
        .filter((Report) => Report.doc_uuid !== uuid);
    },

    sortedAndSearchedReports(state, getters) {
      return getters.sortReports.filter((Reports) =>
        Reports.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setGlobalAuthor(state, author) {
      state.globalAuthor = author;
    },
    setReports(state, reports) {
      state.reports = reports;
    },
    setLoading(state, bool) {
      state.isReportLoading = bool;
    },
    setMustChangeReport(state, mustChangeReport) {
      state.mustChangeReport = mustChangeReport;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      console.log("должно работать");
      state.searchQuery = searchQuery;
    },
    setTotalPages(state, totalPages) {
      state.totalPage = totalPages;
    },
    removeReport(state, report) {
      console.log("BlyatSUKA");
      state.reports = state.reports.filter((p) => p !== report);
    },
    changeReport(state, report) {
      console.log(report);
      const changedReport = state.reports.find(
        (reportMass) => reportMass.doc_uuid === report.doc_uuid
      );
      delete report["doc_uuid"];
      const formData = new FormData();
      for (let key in report) {
        changedReport[key] = report[key];
        formData.append(key, report[key]);
      }
    
      try {
        axios.put(
          `/roma/api/update_doc?doc_uuid=${changedReport.doc_uuid}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        console.log(report.doc_uuid);
      }
    },
  },
  actions: {
    async getGlobalAuthorByUuid({ commit }, uuid) {
      console.log(uuid);
      try {
        await axios
          .get(`/roma/api/get?user.uuid=${uuid}`)
          .then(
            (response) => (
              console.log("ЫЫЫ", response["data"]["users"][0]),
              commit("setGlobalAuthor", response["data"]["users"][0])
            )
          );
      } catch (e) {
        console.log("e");
      }
    },
    async reportsByAuthorUuidAction({ commit, state }, uuid) {
      if (
        (typeof state.reports !== "undefined") &
        (state.reports.length !== 0)
      ) {
        console.log("Известен", state.reports);
      } else {
        console.log("не известен");
        try {
          commit("setLoading", true);

          const response = await axios.get(
            `/roma/api/get?doc.author.uuid=${uuid}`
          );
          commit("setReports", response["data"]["docs"]);
        } catch (e) {
          console.log(e);
        } finally {
          commit("setLoading", false);
        }
      }
    },
    async reportTest({ commit, state }) {
      if (
        (typeof state.reports !== "undefined") &
        (state.reports.length !== 0)
      ) {
        console.log("Известен", state.reports);
      } else {
        console.log("не известен");
        try {
          commit("setLoading", true);

          const response = await axios.get("/roma/api/get?all_docs");
          commit("setReports", response["data"]["docs"]);
        } catch (e) {
          console.log(e);
        } finally {
          commit("setLoading", false);
        }
      }
    },
    async Auth({ commit, dispatch }, nickName) {
      try {
        let response = await axios.get(`/roma/auth?nickname=${nickName}`);
        // this.$router.push('/store');
        while (response["data"]["result"] == false) {
          setTimeout(500);
          response = await axios.get(`/roma/auth?nickname=${nickName}`);
          // console.log(response['data']['user']);
        }
        commit("setGlobalAuthor", response["data"]["user"]);
        dispatch("addLocalStorage");
      } catch (e) {
        console.log(e);
      } finally {
        commit("setLoading", false);
      }
    },
    async removeReport({ commit }, report) {
      try {
        commit("removeReport", report);
        await axios.delete(`/roma/api/del_doc?doc_uuid=${report.doc_uuid}`);
      } catch (e) {
        alert("Error");
      }
    },
    async fetchReports({ commit }) {
      console.log("ПОШЁЛ ЗАПУСК");
      try {
        commit("setLoading", true);
        const response = await axios.get("/roma/api/get?all_docs");
        commit("setReports", response["data"]["docs"]);
      } catch (e) {
        console.log(e);
      } finally {
        commit("setLoading", false);
      }
    },
    addLocalStorage({ getters }) {
      localStorage.setItem("user", JSON.stringify(getters.globalAuthor));
    },
    localStorageCheck({ commit }) {
      commit("setGlobalAuthor", JSON.parse(localStorage.getItem("user")));
    },
    async loadMoreReports({ state, commit }) {
      try {
        // this.page +=1;
        const response = await axios.get("/roma/api/get?all_docs", {});
        // this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
        commit("setReports", [...state.reports, ...response.data.docs]);
        // this.reports = [...this.reports, ...response.data.docs];
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
