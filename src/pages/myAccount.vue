<template>
  <div v-if="globalAuthor">
    <div>
      <MyDialog v-model:show="changeVisible">
        <ChangeReport
          :mustChangeReport="mustChangeReport"
          @changeReport="changeReport"
        />
      </MyDialog>
    </div>
    <div class="gridReport">
     
      <div class="box4">
        <MyPage :card="globalAuthor"></MyPage>
      </div>
      <div class="box3">
        <h1>Мои работы:</h1>
        <ReportList
          :reports="
            reportsByAuthorNickname(this.$route.params.id)"
          @OpenChangeReport="OpenChangeReport"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <h1 style="color:#fff;"> Идёт подтверждение пользователя </h1>
  </div>
  </template>
  
  <script>
  import ChangeReport from "@/components/ReportComponents/ChangeReport.vue";
  import MyPage from "@/components/CosmeticLocation/MyPage.vue";
  import ReportList from "@/components/ReportComponents/ReportList.vue";
  import MyDialog from "@/components/UI/MyDialog.vue";
  import { mapState, mapGetters, mapActions,mapMutations} from "vuex";
  
  export default {
    data() {
      return {
        mustChangeReport: "",
        changeVisible: false,
        // file: '',
      };
    },
    components: {
      ChangeReport,
      MyPage,
      ReportList,
      MyDialog,
    },
    methods: {
      ...mapActions({
        reportsByAuthorNicknameAction: "report/reportsByAuthorNicknameAction",
        getGlobalAuthorByUuid: "report/getGlobalAuthorByUuid", 
      }),
      ...mapMutations({
        changeReportMutations: "report/changeReport",
      }),
      OpenChangeReport(Report) {
        console.log("Матвей хочет видеть логи", Report);
        this.mustChangeReport = Report;
        this.changeVisible = true;
      },
  
      changeReport(Report) {
        console.log("Сработало изменение");
        this.changeVisible = false;
        this.changeReportMutations(Report);
      },
    },
    beforeMount() {
      this.reportsByAuthorNicknameAction(this.$route.params.id);
    },
  
    computed: {
    ...mapState({
        globalAuthor: (state) => state.report.globalAuthor
        }),
      ...mapGetters({
        getReportByUuid: "report/getReportByUuid",
        reportsByAuthorNickname: "report/reportsByAuthorNickname",
      }),
    },
  };

  </script>
