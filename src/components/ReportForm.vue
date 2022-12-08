<template>
    <div class="ReportFrom">
    <form @submit.prevent>
            <h4>Загрузка отчёта</h4>
            
            <!-- <button class = "btn" @click="createPost" >Создать</button> -->
            <uploadFile ref="file"
            @handleFileUpload="handleFileUpload">

            </uploadFile>

            <MyInput 
            v-model:value="report.title"
            type="text"
            placeholder="Название"></MyInput>

            <MyInput 
            v-model:value="report.subject"
            type="text"
            placeholder="Предмет"></MyInput>
            
            <MyInput 
            v-model:value="report.type_work"
            type="text"
            placeholder="Тип работы"></MyInput>

            <MyInput 
            v-model:value="report.number_work"
            type="text"
            placeholder="Номер работы"></MyInput>

            <!-- <MyInput 
            v-model:value="report.author"
            type="text"
            placeholder="Автор"></MyInput> -->

            <MySelect v-model="report.author_uuid" :options="names"> </MySelect>

            <MyInput 
            v-model:value="report.note"
            type="text"
            placeholder="Дополнения"></MyInput>

            <MyButton
            @click="createPost"
            style="margin-top: 15px;"
            >Создать</MyButton>
            <!-- <MyButton
            @click="fileText"
            style="margin-top: 15px;"
            >вывести файл</MyButton> -->
            
        </form>
    </div>
</template>

<script>
import MyInput from "./UI/MyInput.vue";
import uploadFile from '@/components/v-uploadFile.vue';
import axios from "axios";
export default {
    data() {
        return {
    

            report:{
                title:"",
                path:"",
                author:"",
                author_uuid:"174ccd93-9170-497a-9ecf-3632e13e846d",
                subject:"",
                type_work:"",
                number_work: "",
                note:"",
                doc_uuid:""
            },
            file:'',
            names : [
                    {value: "174ccd93-9170-497a-9ecf-3632e13e846d", name: "Даниил"},
                    {value: "d77af4cf-0136-4cce-9873-7f11309aeceb", name: "Роман"},
                    {value: "1501dd0f-ba3e-4716-a263-d4ba1ca018fb", name: "Александр"},
                    {value: "cf040460-0a8b-4178-aaa7-4e9f1c7607fc", name: "Андрей"},
                    {value: "cf040460-0ddb-4178-aaa7-4ne41c7607fc", name: "Матвей"},

                ]
            // nameFields:[
            // "Название",
            // "Предмет",
            // "Тип работы",
            // "Номер работы",
            // "Автор",
            // "Дополнения",
            // ]
        };
    },
    methods: {
        createPost() {
            console.log("Автор до",this.report.author);
            this.sendFile(this.report,this.file);
            this.getUser(this.report,this.report.author_uuid);
            // console.log("Смотри сюда ущерб",this.filePath)
            console.log("Автор после",this.report.author);
            if (!this.report.title == "") {
                this.$emit("create", this.report);
                this.report = {
                    title:"",
                    path:"",
                    author:"",
                    author_uuid:"174ccd93-9170-497a-9ecf-3632e13e846d",
                    subject:"",
                    type_work:"",
                    number_work: "",
                    note:"",
                    doc_uuid:""
                };
                
                // this.$emit('sendFile');
            }
        },
        handleFileUpload(){
          this.file = event.target.files[0];
          this.report.title = this.nameSlice('title');
          this.report.subject = this.nameSlice('subject');
          this.report.type_work = this.nameSlice('type_work');
          this.report.number_work = this.nameSlice('number_work');
        },
        
            
        async sendFile(report, file){
                console.log(report);
                const formData = new FormData();
                // console.log("ЗДЕСЬ",typeof formData);
                formData.append('file',file);
                formData.append('title',report.title);
                formData.append('file_type', file.name.slice(file.name.indexOf(".")+1,));
                formData.append('author_uuid',report.author_uuid);
                formData.append('subject',report.subject);
                formData.append('type_work',report.type_work);
                formData.append('number_work',report.number_work);
                formData.append('note','');
              
                try{
                    const response = await axios.post('roma/api/add_doc',
                    formData,
                    {
                headers: {
                'Content-Type': 'application/json'
                }
                })
                // .then(response => this.report.path=this.filePath+response)
                    report.path = response['data'];
                    report.doc_uuid = response['data'].slice(0,response['data'].indexOf("."));
                }catch(err){
                    console.log("AAA",err.code);
                }
                
        },
        async getUser(report,user){
                try{
                    await axios.get(`roma/api/get?user.uuid=${user}`)
                    .then(response => report.author=response['data']['users'][0]);
                    console.log("ТУЧЕ", report.author);
                    // this.report.author = response['data']['users'][0];
                    
                }
                catch (e){
                    alert('Error')
                }
        },
        nameSlice(atribut){
            let s=''
            switch(atribut){
            case "title":
                s = this.file.name.slice(0,this.file.name.indexOf("."));
                break;
            case "subject":
                s = this.file.name.slice(this.file.name.indexOf("_",7)+1,this.file.name.lastIndexOf("_"));   
                break; 
            case "type_work":
            s = this.file.name.slice(this.file.name.lastIndexOf("_")+1,this.file.name.lastIndexOf("_")+3);   
                break;
            case "number_work":
            s = this.file.name.slice(this.file.name.lastIndexOf("_")+3,this.file.name.indexOf("."));   
                break;
            }
            return s;
            
                
            
        }
    },

    components: { MyInput,
        uploadFile,}
}

</script>