<template>
    <transition-group name="v-sidebar">
<div class="sidebar" @click.stop="hideSideBar" v-if="show">
    
    <div @click.stop class="menu">
        <div class="menuItem">
            <!-- <div @click="$router.push('/')" class="item">asd</div> -->
            <MyButton @click="hideSideBar" style="font-size: 55px; font-weight: 100; position:absolute; width:5px; right:10px; margin: 5px 20px 20px 50px;">X</MyButton>
            <MyButton style="margin-top: 55px;" @click="pushAndClose('/')">О нас</MyButton>
            <MyButton v-if="globalAuthor" @click="pushAndClose(`/${globalAuthor.nickname}`)"> Профиль </MyButton>
            <MyButton v-else @click="pushAndClose('/auth')" > Авторизация </MyButton>
            <MyButton @click="pushAndClose('/reports')"> Базы данных </MyButton>
        </div>
    </div>
</div>  
</transition-group>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "my-sidebar",
    props:{
        show : {
            type : Boolean,
            default: false
        }
    },
    methods:{
        pushAndClose(push){
            this.hideSideBar();
            this.$router.push(push);
        },
        hideSideBar(){
            this.$emit('update:show',false)
        }

    },
    computed: {
    ...mapState({
      globalAuthor: (state) => state.report.globalAuthor,
    })
  }
}
</script>

<style>
.sidebar{
    position: fixed;
    height: 100vh;
    /* background: rgba(0,0,0,0.5); */
    width:100%;
    top:0;

    /* position: fixed; */
    display: flex;
    z-index: 999;
    justify-content: right;
    
}
.menu{
    background-color: rgb(16, 17, 18, 0.97);
   width:65%;

}
.menuItem{
    display:inline;
    width:100%;
}
.item{
    width:100%;
    height: 55px;
    background-color: aqua;
}
</style>