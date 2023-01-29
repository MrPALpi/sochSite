<template>
  <div class ="UserCard">
        <div v-scrolleffect class="imgCardWrap userCardHidden">
            <img class="imgCard"  v-bind:src="`/api/get_file/`+card.avatar" alt="">
        </div>
        <div v-scrolleffect class="cardInfo flying_TextY" >
            <!-- <h4 style="word-break:break-all;">Имя: {{card.name}}</h4> -->
            <h4 style="word-break:break-all;">Nick: {{card.nickname}}</h4>
            <h4 style="word-break:break-all;">Роль: {{card.role}}</h4>
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
    width: 152px;
    margin: 15px 0 0 0;
}
.imgCardWrap{
  
  border-radius: 100%;
  overflow: hidden;
  width: 132px;
  height: 132px;

  margin:auto;
}

.imgCard{
  width:100%;
  height:100%;
  object-fit: cover;
}
.cardInfo{
    font-family: 'Roboto';
    font-style: normal;
    text-align: center;
    color: #fff;
    word-break:break-all;
}
</style>