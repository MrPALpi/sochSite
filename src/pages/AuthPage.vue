<template>
    <img src="" alt="">
    <!-- <div class="auth"> -->
      <centerContent :img="require('../assets/images/qr_tmp.jpg')">
      <my-input
      style=" margin:0px; border-radius: 0px 0px 0px 8px; border: 1px solid #fff; outline:none;"
      type="text"
      placeholder="Введите ник"></my-input>

      <my-button style="margin:0px; border-radius: 0px 0px 8px 0px;  border: 1px solid #fff; border-left: 0px;">></my-button>
    </centerContent>
    <!-- </div> -->
  </template>
  
  <script>
  // import ChangeReport from "@/components/ChangeReport.vue";
  // import MyPage from "@/components/MyPage.vue";
  // import ReportList from "@/components/ReportList.vue";
  // import MyDialog from "@/components/UI/MyDialog.vue";
  import { mapGetters, mapActions,mapMutations} from "vuex";
  import centerContent from "@/components/centerContent.vue";
  export default {
    data() {
      return {
        mustChangeReport: "",
        changeVisible: false,
        // file: '',
      };
    },
    components: {
      centerContent
      // ChangeReport,
      // MyPage,
      // ReportList,
      // MyDialog,
    },
    methods: {
      ...mapActions({
        reportTest: "report/reportTest",
        // changeReportMutations: "report/changeReport",
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
        // this.changeVisible = false;
        this.changeReportMutations(Report);
      },
    },
    beforeMount() {
      this.reportTest();
    },
  
    computed: {
      ...mapGetters({
        getReportByUuid: "report/getReportByUuid",
        reportsByName: "report/reportsByName",
      }),
    },
  };
  </script>
  
  <style></style>
  