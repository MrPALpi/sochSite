<template>

  <div class="wrapper">
    
    <div  class="v-carusel"  :style="{'margin-left': '-' + (100*this.currentSlideIndex) + '%'}">
        <!-- <div ref="carusel" class="v-carusel" > -->
    <vCaruselItem
    v-for="item in carusel_data"
    :key="item.id"
    :itemData="item"/>
  </div>
  <MyButton id="prev" class="carousel__prev"
  @click="prevSlide">
        {{"<"}}
    </MyButton>

  <MyButton id="next" class="carousel__next"
    @click="nextSlide">
        {{">"}}
    </MyButton>
  </div>
</template>

<script>
import vCaruselItem from '@/components/v-carusel-item';
import MyButton from '@/components/UI/MyButton.vue';
export default {
    name: "v-carusel",
    components:{
        vCaruselItem,
        MyButton
    },
    props:{
        carusel_data:{
            type: Array,
            default: () => []
        },

    },
    data(){
        return{
            currentSlideIndex:0,
        }
    },
    methods:{
        prevSlide(){
            if(this.currentSlideIndex > 0){
                this.currentSlideIndex--;
            }
            else{
                this.currentSlideIndex=this.carusel_data.length-1;
            }
        },
        nextSlide(){
            if(this.currentSlideIndex >= this.carusel_data.length-1){
            this.currentSlideIndex=0;
            }
            else{
                this.currentSlideIndex++;
                // this.$refs.carusel.style.margin = `-${this.currentSlideIndex}*${this.$refs.carusel.clientWidth})px,0,0`;
            }
        }
    },
    computed: {},
    
}
</script>

<style>
.wrapper{

    display:flex;
    width: 700px;
    overflow: hidden;

    position: relative;
    

}
.v-carusel{
    display: flex;
    transition: all ease .4s;
}



.carousel__prev,
.carousel__next {
    border-radius: 40px;
    position: absolute;
    top: 0%;
    bottom: 0;
    margin:  auto;
    width: 40px;
    height: 40px;
    padding: 0;
    cursor: pointer;
    opacity: 50%;

}

.carousel__prev {
  left: 22%;
  transform: translate(-50%, -50%);
  
}

.carousel__next {
  right: 22%;
  transform: translate(50%, -50%);
}

</style>
