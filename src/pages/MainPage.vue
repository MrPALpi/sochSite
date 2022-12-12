<template>
  <heroBlock :imgPath="require(`../assets/images/back.jpg`)">
    <heroText :heroTexts="`Juicy squad Is Here`"></heroText>
  </heroBlock>

  <heroBlock
    :imgPath="`https://www.erase.bg/static/assets/images/gradient.842ff9b.svg`"
  >
    <h3 style="font-size: 3.5em; padding: 10% 5% 10% 5%; min-height: 280px; line-height: 84px; text-align: center;">
      Королеве плевать, что говорят за ее спиной мыши
    </h3>
  </heroBlock>

  <theTeam :teamData="this.teamData" />
</template>

<script>
import heroBlock from "@/components/v-heroblock.vue";
import heroText from "@/components/v-heroText.vue";
import axios from "axios";
import theTeam from "@/components/v-users.vue";

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
        this.teamData = response["data"]["users"];
      } catch (e) {
        console.log(e);
        alert("Error");
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style></style>
