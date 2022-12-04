<template>
    <NavBar></NavBar>

    <div class="app">
        
        <router-view></router-view>
    </div>
   
    
</template>

<script>
import NavBar from '@/components/NavBar.vue'

// import NavBar from './components/NavBar.vue'
    export default{
    components: { NavBar }
}     
</script>
<style>
@import '/public/styles.css';
</style>