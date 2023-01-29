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
        text-align: calc(center -320px);
        font-style: normal;
        font-weight: 500;
        font-size: 72px;
        line-height: 84px;
        -webkit-text-stroke: 0.5px transparent;
        text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 40px #ff00de, 0 0 80px #ff00de, 0 0 90px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
    }
    @media (max-width: 500px) {
        .heroText{
            text-shadow: none;
        }
    }
    </style>