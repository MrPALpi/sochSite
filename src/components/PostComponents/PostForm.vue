<template>
    <form @submit.prevent>
            <h4>Создание поста</h4>
            
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
            @click="createPost"
            style="margin-top: 15px;"
            >Создать</MyButton>
            
        </form>

</template>

<script>
import MyInput from "../UI/MyInput.vue";

export default {
    data() {
        return {
            post: {
                title: "",
                body: ""
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            if (!this.post.title == "") {
                this.$emit("create", this.post);
                this.post = {
                    title: "",
                    body: ""
                };
            }
        }
    },
    components: { MyInput }
}

</script>