export const getters = {
    getters : {
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
    namespaced:true,
}