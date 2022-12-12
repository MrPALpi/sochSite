<template>
  <div class ="UserCard">
        <div  class="imgCardWrap">
            <img class="imgCard"  v-bind:src="`/api/get_file/`+card.avatar" alt="">
        </div>
        <div class="cardInfo" >
            <h4>{{card.name}}</h4>
            <h4>Роль: {{card.role}}</h4>
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
    },


}

</script>

<style>

.UserCard{
    
    /* flex-basis: 25%; */
    /* position: relative; */
    /* justify-content:space-between; */
    /* --width: 13%;
    width: var(--width);
    height: auto; */
    
    
}
.imgCardWrap{
  
  border-radius: 100%;
  overflow: hidden;
  width: 132px;
  height: 132px;
  /* width: 100%; */
  /* height: 62.4%; */
  margin:auto;
}

.imgCard{
    
  /* width: auto;
  height: 100%;
  margin: 0 auto; */

  width:100%;
  height:100%;
  object-fit: cover;
}
.cardInfo{
    font-family: 'Roboto';
    font-style: normal;
    text-align: center;
    color: #fff;
}
</style>