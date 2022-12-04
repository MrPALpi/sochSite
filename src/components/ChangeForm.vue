<template>
    <form @submit.prevent>
            <h4>Редактирование поста</h4>
            <v-upload> </v-upload>
            <!-- <button class = "btn" @click="createPost" >Создать</button> -->

            <MyInput 
           
            v-model:value="post.title"
            type="text"
            placeholder="Название"></MyInput>
            
            <MyInput 
            v-model:value="post.body"
            type="text"
            placeholder="Описание"></MyInput>

            <MyButton
            @click="changePost"
            style="margin-top: 15px;"
            >Изменить</MyButton>
            
        </form>

</template>

<script>
// import MyInput from "./UI/MyInput.vue";

export default {
    data() {
        return {
            post: {
                id: this.mustChangePost.id,
                title: this.mustChangePost.title,
                body: this.mustChangePost.body
            }
        };
    },
    props: {
        mustChangePost:{
            type: Object,
            required: true
        },
    },
    methods: {
        changePost() {
            if (!this.post.title == "") {
                this.$emit("change", this.post);
                this.post = {
                    title: "",
                    body: ""
                };
            }
            // console.log(this.changePost);
        },
        
    },
    
    // components: { MyInput }
}

</script>