<template>
    
     <div class ="post">
        <div>
            <div><strong> Название: </strong> {{post.title}}</div>   
            <div><strong> Описание: </strong> {{post.body}}</div>          
        </div>
        <div class = "post_btns">
            <MyButton
            style="margin-left: 5px; margin-top:5px;"
            @click="$emit('remove', post)">
                Удалить
                </MyButton>
            <MyButton
            style="margin-left: 5px; margin-top:5px;"
            @click="$emit('OpenChangeReport', post)">
                Изменить
                </MyButton>    
                
        </div>
        
    </div>
</template>

<script>
export default{
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