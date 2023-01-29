import axios from "axios";
export const actions = {
    actions: {
        async getGlobalAuthorByUuid({ commit }, uuid) {
            console.log(uuid);
            try {
              await axios
                .get(`/api/get?user.uuid=${uuid}`)
                .then(
                  (response) => (
                    console.log("ЫЫЫ", response["data"]["users"][0]),
                    commit("setGlobalAuthor", response["data"]["users"][0])
                  )
                );
            } catch (e) {
              console.log(e);
            }
          },
          async reportsByAuthorNicknameAction({ commit, state }, nickname) {
            if (
              (typeof state.reports !== "undefined") &
              (state.reports.length !== 0)
            ) {
              return;
            } else {
            
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
              while (response["data"]["result"] == false) {
                setTimeout(500);
                response = await axios.get(`/auth?nickname=${nickName}`);
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
    },
    namespaced: true,   
}