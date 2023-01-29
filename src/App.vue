<template>
    <NavBar></NavBar>

    <div class="app">
        
        <router-view></router-view>
    </div>
   
    
</template>

<script>
import NavBar from '@/components/NavPanel/NavBar.vue'
import {  mapActions,  } from "vuex";
// import NavBar from './components/NavBar.vue'
    export default{
    components: { NavBar },
    beforeMount() {
        console.log('моунтед работает');
        this.getUser();    
    },
    methods: {
    ...mapActions({
      getUser: "report/localStorageCheck",
    }),
}
}     
</script>
<style>
@import '/public/styles.css';
</style>