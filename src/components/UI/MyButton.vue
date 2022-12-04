<template>
    <button class = "btn">
        <slot>
            
        </slot>
    </button>
</template>

<script>
export default{
    name: "MyButton",
    props:{
        post:{
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>