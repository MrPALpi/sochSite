<template>
    <div class="heroText">
        {{heroTexts}}
    </div>
</template>
    
    <script>
    // :style="`background-image:url(`+imgPath+`);`"
    export default {
        props:{
            heroTexts:{
                type: String,
                default: ""
            }
        },
    }
    </script>
    
    <style>
    .heroText{
        /* padding: 90px 50px 90px 50px; */
        font-family: 'Roboto';
        margin: 90px 50px 90px 50px;
        color: #fff;
        text-align: center;
        font-style: normal;
        font-weight: 500;
        font-size: 72px;
        line-height: 84px;
        text-align: center;
        -webkit-text-stroke: 0.5px transparent;
        text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 40px #ff00de, 0 0 80px #ff00de, 0 0 90px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
        /* -webkit-text-fill-color: transparent; */
        /* animation: neon2 1s ease-in-out infinite alternate; */
        /* font-family: Raleway; */
    }
    </style>