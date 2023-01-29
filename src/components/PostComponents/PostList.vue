<template>
    <div class="PostList">
     <div v-if="posts.length>0">
        <h3>Список пользователей</h3>
        <transition-group name="post-list">
      <PostItem v-for="post in posts" :key="post.id"
      :post="post"
      @remove="$emit('remove', post)"
      @change="$emit('change', post)"/>
     </transition-group>
        </div>
        <div v-else style="color: blue; margin-top: 50px;">
            <h2>Список постов пуст</h2>
        </div>
    </div>
</template>

<script>
import PostItem from "@/components/PostComponents/PostItem.vue";
export default{
    components : {PostItem},
    props:{
        posts:{
            type: Array,
            required: true
        }
    },

}
</script>