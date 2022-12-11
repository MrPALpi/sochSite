<template>
  <form @submit.prevent>
    <h4>Редактирование отчёта</h4>

    <MyInput
      v-model:value="report.title"
      type="text"
      placeholder="Название"
    ></MyInput>

    <MyInput
      v-model:value="report.subject"
      type="text"
      placeholder="Предмет"
    ></MyInput>

    <MyInput
      v-model:value="report.type_work"
      type="text"
      placeholder="Тип работы"
    ></MyInput>

    <MyInput
      v-model:value="report.number_work"
      type="text"
      placeholder="Номер работы"
    ></MyInput>

    <!-- <MySelect v-model="author_uuid" :options="names"> </MySelect> -->

    <MyInput
      v-model:value="report.note"
      type="text"
      placeholder="Дополнения"
    ></MyInput>

    <MyButton @click="changePost(report)" style="margin-top: 15px"
      >Изменить</MyButton
    >

    <MyButton
      style="margin: 15px 0px 0px 10px"
      @click="download">
      Скачать
      <!-- <a v-bind:href="`/roma/api/get_file/` + report.path"> Скачать </a> -->
    </MyButton>
  </form>
</template>

<script>
import MyInput from "./UI/MyInput.vue";
// import axios from "axios";
import _ from "lodash";
import { mapState} from "vuex";

export default {
  data() {
    return {
      file: "",
      author_uuid: "",
      report: {
        title: this.mustChangeReport.title,
        path: this.mustChangeReport.path,
        author: this.mustChangeReport.author,
        subject: this.mustChangeReport.subject,
        type_work: this.mustChangeReport.type_work,
        number_work: this.mustChangeReport.number_work,
        note: this.mustChangeReport.note,
        doc_uuid: this.mustChangeReport.doc_uuid,
      },

    };
  },
  props: {
    mustChangeReport: {
      type: Object,
      required: true,
    },
  },
  methods: {
    download(){
      if(this.globalAuthor){ 
      window.open(`/roma/api/get_file/${this.report.path}`, '_blank');
      }
      else{
        alert("У вас недостаточно прав, пожалуйста авторизируйтесь")
      }
    },
    changePost() {
      if(this.globalAuthor){ 
      if (!this.report.title == "") {
        if (_.isEqual(this.report, this.mustChangeReport)) {

          return;
          
        } else {
          let sendReport = {};
          for (let key in this.mustChangeReport) {
           
            if (
              (this.report[key] !== this.mustChangeReport[key]) |
              (key === "doc_uuid")
            ) {
              // delete this.report[key];
              sendReport[key]=this.report[key];
            }
            
          }
          // console.log(sendReport);
          this.$emit("changeReport", sendReport);
        }

      }
    }
    else{
            alert("У вас недостаточно прав, пожалуйста авторизируйтесь")
        }
    },
    handleFileUpload() {
      this.file = event.target.files[0];
    },
    // async getUser(report, user) {
    //   try {
    //     await axios
    //       .get(`roma/api/get?user.uuid=${user}`)
    //       .then((response) => (report.author = response["data"]["users"][0]));

    //   } catch (e) {
    //     alert("Error");
    //   }
    // },
  },
  computed: {
    ...mapState({
        globalAuthor: (state) => state.report.globalAuthor,
    }),
  },
  watch: {
    mustChangeReport: function (data) {
      console.log("ватч работает", data);
      this.report = this.mustChangeReport;
      this.report = data;
    },
  },
  //     watch: {
  //     // эта функция запускается при любом изменении вопроса
  //     question: (newQuestion, oldQuestion)=> {
  //         report = newQuestion;
  //     }
  // },
  components: { MyInput },
};
</script>
