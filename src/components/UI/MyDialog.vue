<template>
    <transition-group name="v-dialog">
    <div class="dialog" @click.stop="hideDialog" v-if="show">
        <div @click.stop class="dialog-content">
            <slot>

            </slot>
        </div>
    </div>
    </transition-group>
</template>

<script>


export default{
    name: "my-dialog",
    props:{
        show : {
            type : Boolean,
            default: false
        }
    },
    methods:{
        hideDialog(){
            this.$emit('update:show',false)
        }

    }
}
</script>

<style>
.dialog{
    z-index: 10;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    /* transition: background-color 0.5s ease; */
    position: fixed;
    display: flex;
}
.dialog-content{
    margin:auto;
    
    /* background: white; */
    /* background: #101112; */
    background:#101112 url('https://www.erase.bg/static/assets/images/gradient.842ff9b.svg');
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    max-width: 40%;
    padding: 20px;
}
</style>