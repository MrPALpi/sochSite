import axios from 'axios';
// import state from 'index.js';

export const mutations = {
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
    namespaced: true,   
}