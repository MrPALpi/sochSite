<template>
  <div class="padClass">
    <h1>Отчёты</h1>
    <MyInput
      ПОИСК
      :value="searchQuery"
      @update:value="setSearchQuery"
      placeholder="Поиск..."
    >
      <!-- $store.commit('setSearchQuery',searchQuery) -->
    </MyInput>

    <div class="app_btns">
      <MyButton @click="showDialog">Создать отчёт</MyButton>

      <MySelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      >
      </MySelect>
    </div>

    <MyDialog v-model:show="dialigVisible">
      <ReportForm @create="createReport" />
    </MyDialog>

    <MyDialog v-model:show="changeVisible">
      <ChangeReport
        :mustChangeReport="mustChangeReport"
        @changeReport="changeReport"
      />
    </MyDialog>

    <ReportList 
      :reports="sortedAndSearchedReports"
      @OpenChangeReport="OpenChangeReport"
      v-if="!isReportLoading"
    />
    <div v-else>Идёт загрузка</div>
    <div ref="observer"></div>
  </div>
</template>

<script>
import ReportForm from "@/components/ReportComponents/ReportForm.vue";
import ReportList from "@/components/ReportComponents/ReportList.vue";
import ChangeReport from "@/components/ReportComponents/ChangeReport.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
// import axios from "axios";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    ReportForm,
    ReportList,
    MyDialog,
    MyButton,
    MySelect,
    ChangeReport,
  },
  data() {
    return {
      dialigVisible: false,
      changeVisible: false,
      subRun:false,
      // file: '',
    };
  },
  methods: {
    ...mapMutations({
      changeReportMutations: "report/changeReport",
      setPage: "report/setPage",
      setSearchQuery: "report/setSearchQuery",
      setSelectedSort: "report/setSelectedSort",
      // setMustChangeReport: "report/setMustChangeReport",
    }),
    ...mapActions({
      loadMoreReports: "report/loadMoreReports",
      fetchReports: "report/fetchReports",
      // changeReportAPI: "report/changeReportAPI"
      subscribe: "report/subscribeRun",
    }),

    createReport(Report) {
      this.reports.push(Report);
      this.dialigVisible = false;
    },
    inputTitle(event) {
      this.title = event.target.value;
    },

    OpenChangeReport(Report) {
      console.log("Матвей хочет видеть логи", Report);
      this.mustChangeReport = Report;
      this.changeVisible = true;
    },
    showDialog() {
      this.dialigVisible = true;
    },
    changeReport(Report) {
      this.changeVisible = false;
      this.changeReportMutations(Report);
    },
  },
  mounted() {
    this.fetchReports();
    // this.subscribe();
    // this.subscribeRun();
  },
  
  
  computed: {
    ...mapState({
      reports: (state) => state.report.reports,
      // mustChangeReport: (state) => state.report.mustChangeReport,
      isReportLoading: (state) => state.report.isReportLoading,
      selectedSort: (state) => state.report.selectedSort,
      searchQuery: (state) => state.report.searchQuery,
      page: (state) => state.report.page,
      limit: (state) => state.report.limit,
      totalPage: (state) => state.report.totalPage,
      sortOptions: (state) => state.report.sortOptions,
    }),
    ...mapGetters({
      sortReports: "report/sortReports",
      sortedAndSearchedReports: "report/sortedAndSearchedReports",
    }),
  },
};
</script>
<style></style>
