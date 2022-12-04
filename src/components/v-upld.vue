<template>
    <input ref="file" v-on:change="handleFileUpload()"  type="file">
    <my-button @click="sendFile">Отправить файл уже</my-button>
</template>
<script>

import { ref} from "vue"
import axios from 'axios'; 
import MyButton from './UI/MyButton.vue';
export default{
  components: { MyButton },

  setup() {
      const file = ref(null)

      const handleFileUpload = async() => {
         // debugger;
        //   console.log("selected file",file.value.files)
          return file.value.files
          //Upload to server
      }
      const sendFile = async() => {
            await axios.post(`http://localhost:5000/hi`, {
            name: handleFileUpload(),
        });
      }
      return {
        handleFileUpload,
        file,
        sendFile
     }
  }
}

</script>