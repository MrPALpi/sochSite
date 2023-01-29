<template>
  <div id="navbar-vue" class="Navbar-vue">
    <!-- <div class="nav_img"> -->
      <img @click="$router.push('/')" class="nav_img" src="../picthers/logo.png" alt="">
    <!-- </div> -->
    <div class="navbar_btns">
      <div v-if="width > 600">
        <MyButton @click="$router.push('/')" style="margin-right: 10px;">О нас</MyButton>
        <MyButton v-if="globalAuthor" @click="$router.push(`/${globalAuthor.nickname}`)" style="margin-right: 10px;">
          Профиль
        </MyButton>
        <MyButton v-else @click="$router.push('/auth')" style="margin-right: 10px;">
          Авторизация
        </MyButton>
        <MyButton @click="$router.push('/reports')" style="margin-right: 0px;">
          Базы данных
        </MyButton>
      </div>
      <div v-else>
        <MyButton @click="showSideBar()" style="margin-right: 0px; font-size: 100; ">
          ☰
        </MyButton>
      </div>
    </div>
  </div>
  <vSideBar v-model:show="sideBarShow"></vSideBar>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import vSideBar from "@/components/NavPanel/v-sideBar.vue";
import { mapState } from "vuex";
export default {
  components: {
    MyButton,
    vSideBar,
  },
  data() {
    return {
      sideBarShow: false,
      width: 0,
      // prevScrollpos: window.pageYOffset,
      // file: '',
    };
  },
  methods: {
    updateWidth() {
      this.width = window.innerWidth;
      // console.log(this.width);
    },
    showSideBar() {
      this.sideBarShow = true;
    },
  },
  mounted() {
    let prevScrollpos = window.pageYOffset
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar-vue").style.top = "0";
      } else {
        document.getElementById("navbar-vue").style.top = "-150px";
      }
      prevScrollpos = currentScrollPos;
    };
  },
  created() {
    window.addEventListener("resize", this.updateWidth);
    this.updateWidth();
  },

  computed: {
    ...mapState({
      globalAuthor: (state) => state.report.globalAuthor,
    }),
  },
};
</script>

<style>
.nav_img{
  /* padding: 5px 12px 5px 12px; */
  width: 20%;
  min-width: 225px;
}
/* .img{
  width: 200px;
} */
</style>
