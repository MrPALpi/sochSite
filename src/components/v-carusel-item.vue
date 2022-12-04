<template>
<div class="v-carusel-item" style="min-width:700px;">
    <div class="slide">
        <img class="imgCrsl" :src=" require('../assets/images/'  + itemData.img)" alt="{{itemData.name}}">
    </div>
</div>  
</template>

<script>
export default {
    name:"v-carusel-item",
    props: {
        itemData:{
            type: Object,
            default: () => {}
        }

    }
}

</script>

<style>
/* img{
    max-width: 700px;
    max-height: 400px;

    scroll-snap-stop: auto;
    flex-shrink: 0;
    margin: 0;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

} */
.v-carusel-item{
    max-width: 400px;
    max-height: 400px;
    display:flex;
    justify-content: center; 
    align-items: center; 
}

.slide{
    display: flex;
    justify-content: center;
    align-items: center;
}
.imgCrsl{
    border-radius: 20px;
    max-width: 700px;
    max-height: 400px;

    scroll-snap-stop: auto;
    flex-shrink: 0;
    margin: 0;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
}


</style>