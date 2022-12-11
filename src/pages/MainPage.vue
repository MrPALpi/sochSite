<template>
<!-- 
<heroBlock


:imgPath="`https://catherineasquithgallery.com/uploads/posts/2021-02/1612168049_164-p-fon-dlya-rabochego-stola-fioletovii-neon-238.jpg`"/> -->
<!-- :imgPath="`https://catherineasquithgallery.com/uploads/posts/2021-02/1612168049_164-p-fon-dlya-rabochego-stola-fioletovii-neon-238.jpg`" -->
<heroBlock
:imgPath="require(`../assets/images/back.jpg`)"
>

<heroText :heroTexts="`Juicy squad Is Here`"></heroText>
</heroBlock>

<heroBlock
:imgPath="`https://www.erase.bg/static/assets/images/gradient.842ff9b.svg`"
>

<div class="inline_bloks">
    <!-- <div class="text_padding"> -->

<!-- <h3>Настолько пафосны, насколько и нелепые/глупые
Королеве плевать, что говорят за ее спиной мыши
Мн плевать, что вы обо мне думаете, я о вас не думаю вообще
Если я вас напрягаю или раздражаю, то вы всегда можете забиться в углу и поплакать.
Если я тебе не нравлюсь - застрелись, я не исправлюсь
Меня трудно найти, легко потерять и невозможно забыть
Моя вина лишь в том, что я красива, слегка распущена, ранима и вольна...Но никого лучше не найдешь меня
Татуировок у меня нет, потому что нормальному человеку и в голову не придет лепить наклейки на Роллс-Ройс.
Пока ты с подружками обсуждаешь , какая я развратная и пошлая, твой парень дрочит на моё фото...
Короче, все в стиле "я два дня за вами бежала, чтобы сказать, как мне пофиг"</h3> -->

<!-- </div> -->
<myCarusel :carusel_data="sliderItems"></myCarusel>
</div>
</heroBlock>



<!-- <div class="inline_bloks">
    <div class="text_padding">

        
<h3>Настолько пафосны, насколько и нелепые/глупые
Королеве плевать, что говорят за ее спиной мыши
Мн плевать, что вы обо мне думаете, я о вас не думаю вообще
Если я вас напрягаю или раздражаю, то вы всегда можете забиться в углу и поплакать.
Если я тебе не нравлюсь - застрелись, я не исправлюсь
Меня трудно найти, легко потерять и невозможно забыть
Моя вина лишь в том, что я красива, слегка распущена, ранима и вольна...Но никого лучше не найдешь меня
Татуировок у меня нет, потому что нормальному человеку и в голову не придет лепить наклейки на Роллс-Ройс.
Пока ты с подружками обсуждаешь , какая я развратная и пошлая, твой парень дрочит на моё фото...
Короче, все в стиле "я два дня за вами бежала, чтобы сказать, как мне пофиг"</h3>

</div>
<myCarusel :carusel_data="sliderItems"></myCarusel>
</div> -->




<theTeam
:teamData="this.teamData" />

</template>

<script>
import myCarusel from '@/components/v-carusel.vue';
import heroBlock from '@/components/v-heroblock.vue';
import heroText from '@/components/v-heroText.vue';
import axios from "axios";
import theTeam from '@/components/v-users.vue';

export default{
    name: 'MainPage',
    components:{
    myCarusel,
    heroBlock,
    theTeam,
    heroText
},
    data(){
        return{
            sliderItems:[
                {id:1, name: "img1", img : "1.jpg"},
                {id:2, name: "img2", img : "2.jpg"},
                {id:3, name: "img3", img : "3.jpg"},
                {id:4, name: "img4", img : "4.jpg"},
                {id:5, name: "img5", img : "5.jpg"},
                {id:6, name: "img6", img : "6.jpg"},
                {id:7, name: "img7", img : "7.jpg"}
            ],
            teamData:[]
        }
        
    },
    methods:{
        async fetchUsers(){
                try{
                    const response = await axios.get("roma/api/get?all_users");
                    // console.log("ёпта",typeof response['data']);
                    this.teamData = response['data']['users'];
                    console.log("fuck ",response['data']);
                    // this.teamData = [{"name":"Roman","nickname":"Rev1le","avatar":"https://сочный.xyz/api/get_photo?name=ava_roma.jpg","role":"Backend","admin":true,"tg_id":452352252,"uuid":"fwh4v242nv2ln2"},{"name":"Sanya","nickname":"Saskee","avatar":"https://сочный.xyz/api/get_photo?name=sanya_ava.jpg","role":"Frontend","admin":true,"tg_id":63635363,"uuid":"tbwknyrtqwbyirotlw"},{"name":"Danya","nickname":"ДА-НЯЯЯЯ!!!","avatar":"https://сочный.xyz/api/get_photo?name=danya_ava.jpg","role":"Math","admin":false,"tg_id":6362634574,"uuid":"rvnyriryvwer"},{"name":"Andrey","nickname":"Tox","avatar":"https://сочный.xyz/api/get_photo?name=andrey_ava.jpg","role":"Отсутсвует","admin":false,"tg_id":7643524524,"uuid":"ghrehreherwet"}];
                }
                catch (e){
                    console.log(e);
                    alert('Error')
                    // pass
                }
        }
    },
    mounted(){
        this.fetchUsers();
    }

}


</script>

<style>

</style>