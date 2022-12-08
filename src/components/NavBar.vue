<template>
  <div id="navbar" class="Navbar">
    <div class="navbar_btns">
      <MyButton @click="$router.push('/reports')"> Базы данных </MyButton>
      <MyButton @click="$router.push('/')" style="margin-left: 20px">
        О нас
      </MyButton>
      <MyButton v-if="globalAuthor" @click="$router.push(`/mypage/${globalAuthor.uuid}`)" style="margin-left: 20px"> Профиль </MyButton>
      <MyButton v-else @click="$router.push('/account')" style="margin-left: 20px"> Авторизация </MyButton>
      <MyButton @click="$router.push('/store')" style="margin-left: 20px"> Store </MyButton>
    </div>
  </div>
  <div class="Navbar">
    <div class="navbar_btns">
      <MyButton @click="$router.push('/reports')"> Базы данных </MyButton>
      <MyButton @click="$router.push('/')" style="margin-left: 20px">
        О нас
      </MyButton>
      <MyButton v-if="globalAuthor" @click="$router.push(`/mypage/${globalAuthor.uuid}`)" style="margin-left: 20px"> Профиль </MyButton>
      <MyButton v-else @click="$router.push('/account')" style="margin-left: 20px"> Авторизация </MyButton>
      <MyButton @click="$router.push('/store')" style="margin-left: 20px"> Store </MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import {mapState} from "vuex";
export default {
  components: {
    MyButton,
  },
  mounted() {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 150 ||
        document.documentElement.scrollTop > 150
      ) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-150px";
      }
    }
  },
  computed: {
    ...mapState({
      globalAuthor: (state) => state.report.globalAuthor,
    })
  }
};
</script>

<style>
</style>