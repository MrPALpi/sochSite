<template>
  <div class="post">
    <div>
      <!-- <div class="imgDocument"> -->
        <MyButton id="download" @click="download">
          <img class="imgDocument" :src="require('./picthers/file.svg')" alt="скачать" />
        </MyButton>

        <!-- <a v-bind:href="`roma/api/get_file/`+report.path"  target="_ blank">
                    <img :src="require('./picthers/file.svg')" alt="Панда" >
                </a> -->
      <!-- </div> -->
      <div class="reportInfo">
      <div ><strong> Название: </strong> {{ report.title }}</div>
      <div ><strong> Предмет: </strong> {{ report.subject }}</div>
      <div ><strong> Тип работы: </strong> {{ report.type_work }}</div>
      <div ><strong> Номер работы: </strong> {{ report.number_work }}</div>
      <div ><strong> Автор: </strong> {{ report.author.name }}</div>
    </div>
    </div>
    <!-- $router.push(`reports/${report.doc_uuid}`)" -->
    <div class="post_btns">
      <MyButton @click="$router.push(`/reports/${report.doc_uuid}`)">
        Открыть
      </MyButton>

      <MyButton @click="canChangeReport(report)"> Изменить </MyButton>

      <MyButton @click="deleteReport(report)"> Удалить </MyButton>
    </div>
  </div>
</template>
<!-- стиль кнопок раньше style="margin-left: 5px; margin-top:5px;" -->
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
    };
  },
  props: {
    report: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    download(){
      if(this.globalAuthor){ 
      window.open(`/api/get_file/${this.report.path}`, '_blank');
      }
      else{
        alert("У вас недостаточно прав, пожалуйста авторизируйтесь")
      }
    },
    canChangeReport(report) {
      if (this.globalAuthor) {
        this.$emit("OpenChangeReport", report);
      } else {
        alert("У вас недостаточно прав, пожалуйста авторизируйтесь");
      }
    },
    ...mapActions({
      removeReport: "report/removeReport",
    }),
    deleteReport(report) {
      if (this.globalAuthor) {
        this.removeReport(report);
      } else {
        alert("У вас недостаточно прав, пожалуйста авторизируйтесь");
      }
    },
  },
  computed: {
    ...mapState({
      globalAuthor: (state) => state.report.globalAuthor,
    }),
  },
};
</script>

<style>
/* .left {
   float: left;
   padding: 0 20px 20px 0;
} */
.imgDocument {
  width: 45px;
  /* float: left; */
  /* padding: 0 20px 20px 0; */
}
</style>