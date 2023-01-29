<template>
  <div>
    <MyDialog v-model:show="changeVisible">
      <ChangeReport
        :mustChangeReport="mustChangeReport"
        @changeReport="changeReport"
      />
    </MyDialog>
  </div>
  <div class="gridReport" v-if="this.getReportByUuid(this.$route.params.id)">
    <div class="box2">
      <ChangeReport
        
        :mustChangeReport="this.getReportByUuid(this.$route.params.id)"
        @changeReport="changeReport"
      />
    </div>
    <div class="box1">
      <MyPage :card="getReportByUuid(this.$route.params.id).author"></MyPage>
    </div>
    <div class="box3">
      <h1>Другие работы автора:</h1>
      <ReportList
        :reports="
          reportsByName(getReportByUuid(this.$route.params.id).author.uuid, this.$route.params.id)"
        @OpenChangeReport="OpenChangeReport"
      />
    </div>
  </div>
</template>

<script>
import ChangeReport from "@/components/ReportComponents/ChangeReport.vue";
import MyPage from "@/components/CosmeticLocation/MyPage.vue";
import ReportList from "@/components/ReportComponents/ReportList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      mustChangeReport: "",
      changeVisible: false,
      resultFunc:'',
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
      reportTest: "report/reportTest",
    
    }),
    ...mapMutations({
      changeReportMutations: "report/changeReport",
    }),
    OpenChangeReport(Report) {
      this.mustChangeReport = Report;
      this.changeVisible = true;
    },

    changeReport(Report) {
      // console.log("Сработало изменение");
      this.changeReportMutations(Report);
    },
  },

  created(){
    this.reportTest();
  },

  mounted(){
    this.resultFunc = this.getReportByUuid(this.$route.params.id);
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
