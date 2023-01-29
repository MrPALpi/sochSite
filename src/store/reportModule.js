import axios from "axios";

export const reportModule = {
  state: () => ({
    reports: [],
    subRun:false,
    stopSubRun:false,
    openedReport: {
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

    reportsByAuthorNickname: (state) => (nickname) => {
      return [...state.reports].filter((Report) =>
        Report.author.nickname.includes(nickname)
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
    setStopSubRun(state, stopRun){
      state.stopSubRun = stopRun;
    },
    setSubRun(state, run){
      state.subRun = run;
    },
    setGlobalAuthor(state, author) {
      state.globalAuthor = author;
    },
    setReports(state, reports) {
      state.reports = reports;
    },
    setReportsFromSide(state,reports){
      // state.reports = [...new Set(reports.forEach(elem => state.reports.push(elem)))];

      const ids = new Set(state.reports.map(o => o.doc_uuid)); 
      state.reports.splice(Infinity, 0,
        ...reports.filter(report => !ids.has(report.doc_uuid))
      ); 
      // state.reports.concat(reports.filter(x => state.reports.includes(x)));

      // if (state.reports.length < reports.length){
      //   state.reports = state.reports.filter((p) => p !== report);
      // }
      // state.reports = reports;
      // state.reports = [...state.reports, ...reports]
      // state.reports = state.reports.concat(reports);

    },
    setLoading(state, bool) {
      state.isReportLoading = bool;
    },
    setOpenedReport(state,openedReport) {
      state.openedReport = openedReport;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {

      state.searchQuery = searchQuery;
    },
    setTotalPages(state, totalPages) {
      state.totalPage = totalPages;
    },
    removeReport(state, report) {
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
          `/api/update_doc?doc_uuid=${changedReport.doc_uuid}`,
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
          .get(`/api/get?user.uuid=${uuid}`)
          .then(
            (response) => (
              // console.log("ЫЫЫ", response["data"]["users"][0]),
              commit("setGlobalAuthor", response["data"]["users"][0])
            )
          );
      } catch (e) {
        console.log("e");
      }
    },
    async reportsByAuthorNicknameAction({ commit, state }, nickname) {
      if (
        (typeof state.reports !== "undefined") &
        (state.reports.length !== 0)
      ) {
        console.log("очтётов есть");
        return;
      } else {
        console.log("очтётов нет, но сейчас будут");
        try {
          commit("setLoading", true);

          const response = await axios.get(
            `/api/get?doc.author.nickname=${nickname}`
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
        // console.log("Известен", state.reports);
        return;
      } else {
        // console.log("не известен");
        try {
          commit("setLoading", true);

          const response = await axios.get("/api/get?all_docs");
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
        let response = await axios.get(`/auth?nickname=${nickName}`);
        // this.$router.push('/store');
        console.log('',response["data"]["Wait"]);
        while (response["data"]["Wait"]) {
          setTimeout(1000);
          response = await axios.get(`/auth?nickname=${nickName}`);
        }
        commit("setGlobalAuthor", response["data"]["Ok"]);
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
        await axios.delete(`/api/del_doc?doc_uuid=${report.doc_uuid}`);
      } catch (e) {
        alert("Error");
      }
    },
    async fetchReports({ commit }) {
      console.log("ПОШЁЛ ЗАПУСК");
      try {
        commit("setLoading", true);
        const response = await axios.get("/api/get?all_docs");
        commit("setReports", response["data"]["docs"]);
      } catch (e) {
        console.log(e);
      } finally {
        commit("setLoading", false);
      }
    },
    clearLocalStorage({commit}){
      localStorage.clear();
      let cookies = document.cookie;
      document.cookie =  'session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      console.log(cookies);
      commit("setGlobalAuthor", '');
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
        const response = await axios.get("/api/get?all_docs", {});
        // this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
        commit("setReports", [...state.reports, ...response.data.docs]);
        // this.reports = [...this.reports, ...response.data.docs];
      } catch (e) {
        console.log(e);
      }
    },
    async subscribe({state, commit, dispatch}) {
      if (!state.stopSubRun){
        let response =  await axios.get("/api/get?all_docs");
  
        if (response.status == 502) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          await dispatch("subscribe");
        } else if (response.status != 200) {
        
          console.log(response.statusText);
        
          await new Promise((resolve) => setTimeout(resolve, 10000));
          await dispatch("subscribe");
        } else {
          // Получим и покажем сообщение
          let message = await response["data"]["docs"];
          commit("setReportsFromSide", message);
          console.log(message);
          await new Promise(resolve => setTimeout(resolve, 3000));
          await dispatch("subscribe");
        }
      }
    },
    subscribeRun({state,commit, dispatch}){
      commit("setStopSubRun", false);
      if (!state.subRun){
        dispatch("subscribe");
        commit("setSubRun", true);
    }
  },
  },
  
  
  namespaced: true,
};
