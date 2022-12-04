<template>
    <div class="padClass">
        
        <h1>Страница с постами</h1>
        <MyInput
        v-model:value="searchQuery"
        placeholder="Поиск...">
        </MyInput>
        
        <div class="app_btns">

        <MyButton @click="showDialog">Создать пост</MyButton>

        <MySelect v-model="selectedSort" :options="sortOptions"> </MySelect>
        </div>
        
        <MyDialog v-model:show="dialigVisible"><post-form
        @create="createPost"/></MyDialog>

        <MyDialog v-model:show="changeVisible"><change-form :mustChangePost="mustChangePost" 
        @change="changePost"/></MyDialog>


        <post-list :posts="sortedAndSearchedPosts"
        @remove="removePost"
        @change="OpenChangePost"
        v-if="!isPostLoading" />
        <div v-else>
        Идёт загрузка
    </div>
    <div ref="observer" ></div>

        <!-- <div class="page_wrapper">
        <div 
        class="page" 
        v-for="pageNumber in totalPage" :key="pageNumber"
        :class="{
            'current_page' : page === pageNumber
        }"
        @click="changePage(pageNumber)"
        >{{pageNumber}}</div>
    </div> -->
    </div>
    
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import ChangeForm from '@/components/ChangeForm.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';

import MySelect from '@/components/UI/MySelect.vue';
import axios from "axios";



// import PostList from 'components/PostList';
    export default{
        components : {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
    ChangeForm,
},
        data () {
            return {
                posts : [],
                mustChangePost:{id:"", title:"",body:""},
                dialigVisible: false,
                changeVisible: false,
                isPostLoading: false,
                selectedSort: "",
                searchQuery: "",
                page:1,
                limit:10,
                totalPage:0,
                sortOptions : [
                    {value: "title", name: "По названию"},
                    {value: "body", name: "По содержанию"},
                ]
            }
        },
        methods: {
            createPost(post){
                this.posts.push(post);
                this.dialigVisible=false;
                
            },
            inputTitle(event){
                this.title = event.target.value;
            },
            removePost(post){
                console.log(post.id);
                this.posts = this.posts.filter(p => p.id !== post.id);
                
            },
            OpenChangePost(post){
                this.mustChangePost = post;
                // console.log(this.mustChangePost)
                this.changeVisible = true;
                // console.log(this.posts[this.posts.indexOf(this.posts.find(postMass => postMass.id === post.id ))]);
            //     this.posts[this.posts.indexOf(this.posts.find(postMass => postMass.id === post.id ))] =  {
            //     id: post.id,    
            //     title: "Рыба",
            //     body: "А на языке глыба"
            // };
            // console.log(this.posts[this.posts.indexOf(this.posts.find(postMass => postMass.id === post.id ))]);
            // this.changeVisible = false;
            },
            showDialog(){
                this.dialigVisible=true;
            },
            changePost(post){
                // console.log("Здесь",this.posts[this.posts.indexOf(this.posts.find(postMass => postMass.id === post.id ))]);
                this.posts[this.posts.indexOf(this.posts.find(postMass => postMass.id === post.id ))] =  post;
                // this.changeVisible = false;
            },
            // changePage(pageNumber){
            //     this.page = pageNumber;
            //     this.fetchPosts();
            // },
            async fetchPosts(){
                try{
                    this.isPostLoading = true;
                    const response = await axios.get("https://jsonplaceholder.typicode.com/posts"
                    , {
                        params:{
                            _page: this.page,
                            _limit: this.limit

                        }
                    }
                    );
                    
                    this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
                    this.posts = response.data;

                }
                catch (e){
                    alert('Error')
                }
                finally{
                    this.isPostLoading = false;
                }
            },
            async loadMorePosts(){
                try{
                    this.page +=1;
                    const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                        params:{
                            _page: this.page,
                            _limit: this.limit

                        }
                    });

                    this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
                    this.posts = [...this.posts, ...response.data];
        
                }
                catch (e){
                    alert('Error')
                    // console.log(e);
                }
                
            },

        },
        mounted(){
            this.fetchPosts();
            console.log(this.$refs.observer);
            const options = {
                rootMargin: '0px',
                threshold: 1.0
            }
            const callback = (entries) => {
                 console.log(entries);
                if (entries[0].isIntersecting & this.page < this.totalPage){
                    this.loadMorePosts();
                }
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer);
        },
        computed:{
            sortPosts(){
                return [...this.posts].sort((post1,post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            },
            sortedAndSearchedPosts(){
                return this.sortPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
        // watch:{
        //     selectedSort(newValue){
        //         this.posts.sort((post1,post2) => {
        //             return post1[newValue]?.localeCompare(post2[newValue])
        //         })
        //     }
        // }

    }
</script>
<style>
/* *{
    margin: 0;
    padding: 0px;
    box-sizing:  border-box;
}
.post{
    margin: 15px;
    padding: 15px;
    border: 2px solid teal;
}
.input{
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
.app{
    padding: 20px;
}
.form {
    display: flex;
    flex-direction: column;
}
.btn{
    margin-top: 15px;
    align-self: flex-end;
    padding: 10px 15px;
    color: teal;
    border: 2px solid teal;
} */
</style>