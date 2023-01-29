<template>
<div class="heroblock-container">
    <section  class="hero" 
    :style="`background-image:url(`+imgPath+`);`">
    <slot >
        
    </slot>
    <!-- <div class="heroText">
    {{heroText}}
    </div> -->
    
    </section>
</div>  
</template>

<script>
// :style="`background-image:url(`+imgPath+`);`"
export default {
    props:{
        imgPath:{
            type: String,
            default: "https://media.discordapp.net/attachments/860822568806383647/1005371487110320139/008334484eacb4b7.png?width=1202&height=676"
        },
        // heroText:{
        //     type: String,
        //     default: ""
        // }
        

    },
    

}
</script>

<style>
.hero {
  /* background-image: url('https://i.ibb.co/PM6cMBn/image.png'); */
  background-size: cover;
  background-position: center center;
    
    /* margin-bottom:20px;  */
    /* padding: 40px 50px 40px 50px; */
    /* width: 100%; */
    
    text-align: center;
    width: 100%;
    /* height: calc(var(--variable-height) - 50px); */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.heroblock-container{
    /* box-shadow: 10 15px 0px 2px #6BA5FA */
    min-height: 100vh;


}
/* .heroText{ */
    /* padding: 90px 50px 90px 50px; */
    /* font-family: 'Roboto';
    margin: 90px 50px 90px 50px;
    color: #fff;
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 72px;
    line-height: 84px;
    text-align: center; */
    /* font-family: Raleway; */
/* } */

</style>