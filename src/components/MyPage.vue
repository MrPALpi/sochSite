<template>
  <div class="ProfileRedesign">
    <div class="ProfileCover"></div>
    <div class="Avatar">
        <img class="imgCard"  v-bind:src="`/api/get_file/`+card.avatar" alt="">
    </div>
    <div class="info">
        <h1>Имя: {{card.name}}</h1>
        <h1>nickname: {{card.nickname}}</h1>
        <h1>Роль: {{card.role}}</h1>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        card:{
            type: Object,
            required: true
        },
    }
};
</script>

<style>
.ProfileRedesign {
}
.ProfileCover {
    z-index: 8;
    background:  radial-gradient(100% 100%at 49.87% 100%,rgba(135, 89, 92,.56) 0%,transparent 100%);

  border-radius: 20px, 20px, 0px, 0px;
  height: 150px;
  width: 100%;
  background-repeat: no-repeat;
  
}
.Avatar {
    animation: neon1 1s ease-in-out infinite alternate;
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
</style>