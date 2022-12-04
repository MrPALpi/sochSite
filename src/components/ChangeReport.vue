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
      style="margin: 15px 0px 0px 10px">
      <a v-bind:href="`/roma/api/get_file/` + report.path"> Скачать </a></MyButton>
  </form>
</template>

<script>
import MyInput from "./UI/MyInput.vue";
// import axios from "axios";
import _ from "lodash";

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
      // mustSentReport:{
      // },
      // names : [
      //         {value: '174ccd93-9170-497a-9ecf-3632e13e846d', name: "Даниил"}, //"174ccd93-9170-497a-9ecf-3632e13e846d"
      //         {value: "d77af4cf-0136-4cce-9873-7f11309aeceb", name: "Роман"},
      //         {value: "1501dd0f-ba3e-4716-a263-d4ba1ca018fb", name: "Александр"},
      //         {value: "cf040460-0a8b-4178-aaa7-4e9f1c7607fc", name: "Андрей"},
      //         {value: "cf040460-0ddb-4178-aaa7-4ne41c7607fc", name: "Матвей"},

      //     ]
    };
  },
  props: {
    mustChangeReport: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePost() {
     
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
          console.log(sendReport);
          this.$emit("changeReport", sendReport);
        }

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
