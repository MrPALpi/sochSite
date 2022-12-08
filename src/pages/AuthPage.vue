<template>

  <MyDialog v-model:show="changeVisible">
    <h1>Пожалуйста подтвердите вход в телеграме</h1>
  </MyDialog>
  <MyDialog v-model:show="nickPlease">
    <h1>Пожалуйста введите свой ник в телеграме</h1>
  </MyDialog>
  <centerContent :img="require('../assets/images/qr_tmp.jpg')">
    <my-input
      style="
        margin: 0px;
        border-radius: 0px 0px 0px 8px;
        border: 1px solid #fff;
        outline: none;
      "
      v-model:value="nickName"
      type="text"
      placeholder="Введите ник"
    ></my-input>

    <my-button
      @click="goToMyAccount(nickName)"
      style="
        margin: 0px;
        border-radius: 0px 0px 8px 0px;
        border: 1px solid #fff;
        border-left: 0px;
      "
      >></my-button
    >
  </centerContent>
  <!-- </div> -->
</template>
  
<script>

import MyDialog from "@/components/UI/MyDialog.vue";
import { mapState, mapActions,  } from "vuex";
import centerContent from "@/components/centerContent.vue";
export default {
  data() {
    return {
      mustChangeReport: "",
      changeVisible: false,
      nickPlease: false, 
      nickName: "",

    };
  },
  components: {
    centerContent,

    MyDialog,
  },
  methods: {
    ...mapActions({
      reportTest: "report/reportTest",
      Auth: "report/Auth",
      getUser: "report/localStorageCheck",
    }),

    checkCockie(){
      if (document.cookie.get);
    },

    async goToMyAccount(nickName) {
      if (nickName){
        this.changeVisible = true;
      await this.Auth(nickName);
      this.changeVisible = false;
      this.$router.push(`/mypage/${this.globalAuthor.uuid}`);
      }
      else{
        this.nickPlease=true
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
</style>
  