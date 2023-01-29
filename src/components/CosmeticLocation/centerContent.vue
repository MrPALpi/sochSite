<template>
    <div class="centerWrapper">

        <img class="centerImg" v-if="img" :src="img" alt="">
        <div class="centerContent">
            <slot>

            </slot>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        img: String,
    }
}
</script>

<style>

@media (max-width: 780px) {
    .centerWrapper {
        width: 100%;
        background: #242525;
    padding: 15px;
    border-radius: 15px;
    }
}

@media (min-width: 800px) {
.centerWrapper {
    background: #242525;
    padding: 15px;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 30%;
}
}
.centerImg{
    width:100%;
    border-radius: 20px 20px 0px 0px;

}
.centerContent {
    /* margin:auto;
     margin-top: 5%; */
    margin-top: -30px;
    width:100%;
    display: flex;
    justify-content: center;
    /* width: 30%; */
}
</style>