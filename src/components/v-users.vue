<template>
<div class="users-content">
    <h2  class="text-team">Наша команда:</h2>
<div class="v-users">
    <UserCard v-for="card in teamData" :key="card.tg_id" :card="card"/>
  </div>
</div>
</template>

<script>

import UserCard from "@/components/UserCard.vue";
export default{
    components : {  UserCard },
    props:{
        teamData:{
            type: Object,
            required: true
        }
    },

}
</script>

<style>
.text-team{
    font-family: 'Roboto';
    font-style: normal;
    font-size: 56px;
    text-align: center;
    color: #fff;
}
.users-content{
    margin: 60px 50px 60px 50px;
    text-align: center;
    background-color: #242525;
    /* background: linear-gradient(120.55deg,#FF4040 18.56%,#A20BD8 98.01%); */
    padding: 20px 0 40px 0;
}
.v-users{
    
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
    grid-gap: 1rem; */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  
    padding: 0;
    margin: 0;
    list-style: none;

    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem; */
    margin: 70px 20% 0px 20%;
    
}



</style>