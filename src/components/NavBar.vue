<template>
  <div id="navbar-vue" class="Navbar-vue">
    <div class="navbar_btns">
      <!-- <MyButton @click="$router.push('/reports')"> Базы данных </MyButton> -->
      <MyButton @click="$router.push('/')" style="margin-right: 10px">
        О нас
      </MyButton>
      <MyButton v-if="globalAuthor" @click="$router.push(`/mypage/${globalAuthor.uuid}`)" style="margin-right: 10px"> Профиль </MyButton>
      <MyButton v-else @click="$router.push('/account')" style="margin-right: 10px"> Авторизация </MyButton>
      <MyButton @click="$router.push('/reports')" style="margin-right: 0px"> Базы данных </MyButton>
    </div>
  </div>
  <div class="Navbar-vue">
    <div class="navbar_btns">
      <!-- <MyButton @click="$router.push('/reports')"> Базы данных </MyButton> -->
      <MyButton @click="$router.push('/')" style="margin-right: 10px">
        О нас
      </MyButton>
      <MyButton v-if="globalAuthor" @click="$router.push(`/mypage/${globalAuthor.uuid}`)" style="margin-right: 10px"> Профиль </MyButton>
      <MyButton v-else @click="$router.push('/account')" style="margin-right: 10px"> Авторизация </MyButton>
      <MyButton @click="$router.push('/reports')" style="margin-right: 0px"> Базы данных </MyButton>
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
        document.getElementById("navbar-vue").style.top = "0";
      } else {
        document.getElementById("navbar-vue").style.top = "-150px";
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