<template>
    <div class="container">
      <div class="large-12 medium-12 small-12 cell">
        <label>
          <MyInput  type="file" id="file" ref="file" @change="$emit('handleFileUpload')"/>
        </label>
       
      </div>
    </div>
  </template>

  <script>
// import axios from 'axios'; 
    export default {
      // data(){
      //   return {
      //     file:""
      //   }
      // },
      methods: {
        // async sendFile(){
        //   // console.log("TYTA", this.file.name.slice(this.file.name.indexOf("."),));
        //   const formData = new FormData();
        //   formData.append('file',this.file,);
        //   formData.append('title',this.file.name);
        //   formData.append('file_type', this.file.name.slice(this.file.name.indexOf(".")+1,));
        //   formData.append('author_uuid','1501dd0f-ba3e-4716-a263-d4ba1ca018fb');
        //   formData.append('subject','TMO');
        //   formData.append('type_work','RGR');
        //   formData.append('number_work',4);
        //   formData.append('note','');


        //   try{
        //     await axios.post('roma/api/add_doc',
        //     formData,

        //     {
        // headers: {
        //   'Content-Type': 'application/json'
        // }})
        //     .then(response => console.log(response))
            
        //   }catch(err){
        //     console.log("AAA",err.code);
        //   }
          
        // },
        // handleFileUpload(event){
        //   this.file = event.target.files[0];
        // }
      }
    }
  </script>