<template>
  <div class="ProfileRedesign">
    <div class="ProfileCover">
      <my-button @click="clearStorage()" id="exit">выйти</my-button>
    </div>
    <div v-scrolleffect class="Avatar userCardHidden">
        <img class="imgCard"  v-bind:src="`/api/get_file/`+card.avatar" alt="">
    </div>
    <div class="info">
        <h1 v-scrolleffect class="flying_TextY">Имя: {{card.name}}</h1>
        <h1 class="flying_TextY">nickname: {{card.nickname}}</h1>
        <h1 class="flying_TextY">Роль: {{card.role}}</h1>
    </div>
  </div>
</template>

<script>
import { mapActions} from "vuex";
export default {
    props:{
        card:{
            type: Object,
            required: true
        },
        
    },
    methods: {
          clearStorage(){
            this.clearLocalStorage();
            this.$router.push('/auth');
          },
          ...mapActions({
      clearLocalStorage: "report/clearLocalStorage",
    }),

        },
};
</script>

<style>
.ProfileRedesign {
}
.ProfileCover {
    z-index: 8;
    /* background-image: url('https://i.slow.pics/HP5Jkzao.png'); */
    /* border-radius: 17px; */
    border-radius: 20px 20px 0px 0px;
    background: radial-gradient(100% 100%at 49.87% 100%, rgb(255,10,17,.3), rgb(255,94,20), rgb(241,102,253,.3) 0%,transparent 100%), url('https://i.slow.pics/HP5Jkzao.png');
    /* background: linear-gradient(0.25turn, rgb(255,10,17,.2), rgb(255,94,20), rgb(241,102,253,.2)); */
    /* background:   radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c); */
  height: 150px;
  width: 100%;
  background-repeat: no-repeat;
  
}
.Avatar {
    /* animation: neon1 1s ease-in-out infinite alternate; */
    z-index: 10;
  border-radius: 50%;
  border: 5px solid #242525;
  overflow: hidden;
  width: 200px;
  height: 200px;
  margin: auto;
  margin-top: -107px;
  margin-bottom: 7px;
}
.info{
    z-index: 9;
    margin-top: -117px;
    padding: 125px 0px 15px 0px;
    background-color: #242525;
    border-radius: 20px;
    text-align: center;
  /* height: 180px; */
  width: 100%;
}
#exit{

  float: right;
  font-family: "ProximaNova", Arial, sans-serif;
  font-weight: bold;
  font-size: 1.05em;
  /* padding: 0px; */
  background: transparent;
  border:none;
  /* border: 2px solid rgb(105, 46, 110); */
  color: rgb(105, 46, 110);
  text-shadow: none;
  transition: 1s;
}
#exit:hover{
  /* background-color: rgb(96, 29, 102); */
  /* border: 2px solid white; */
  color: rgb(231, 22, 22);
  text-shadow: none;
  
}
</style>