<template>
  <div class="paralax">
    <heroBlock class="paralax-body" :imgPath="require(`../assets/images/back.jpg`)">
      <heroText v-scrolleffect class="flying_TextY" :heroTexts="`Juicy Squad Is Here`"></heroText>
    </heroBlock>
  </div>
  <div class="content ">
    <heroBlock class="block_center" :imgPath="`https://www.erase.bg/static/assets/images/gradient.842ff9b.svg`">
      <div style="width:100%;" class="mainParagrah">
        <h3 v-scrolleffect class="flying_TextX">Сладкие, как попка огурца</h3>
        <h3 class="flying_TextX">Яркие, как ч/б фильтр в Инсте</h3>
        <h3 class="flying_TextX">Смачные, как вторичок насвая</h3>
        <h3 class="flying_TextX">Звучные, как в Доте игроки</h3>
        <h3 class="flying_TextX">Экспрессивные, как... экспрессионисты?</h3>
        <h3 class="flying_TextX">Но если одним словом - СОЧНЫЕ</h3>
      </div>
    </heroBlock>
  </div>

  <theTeam class="content" :teamData="this.teamData" />

</template>

<script>

import heroBlock from "@/components/CosmeticLocation/v-heroblock.vue";
import heroText from "@/components/CosmeticLocation/v-heroText.vue";
import axios from "axios";
import theTeam from "@/components/CosmeticLocation/v-users.vue";
import {mapMutations } from "vuex";
export default {
  name: "MainPage",
  components: {
    heroBlock,
    theTeam,
    heroText,
  },
  data() {
    return {
      teamData: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("/api/get?all_users");
        this.teamData = response["data"]["users"].filter((user) => user.role !== "No_Role");
        // console.log(response["data"]["users"]);
      } catch (e) {
        console.log(e);
        alert("Error");
      }
    },
    ...mapMutations({
      setStopSubRun: "report/setStopSubRun",
      setSubRun: "report/setSubRun"
      
    }),
  },
  mounted() {
    this.fetchUsers();
    this.setStopSubRun(true);
    this.setSubRun(false);
  },

};
</script>