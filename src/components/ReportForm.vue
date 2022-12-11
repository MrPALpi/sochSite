<template>
    <div class="ReportFrom">
    <form @submit.prevent>
            <h4>Загрузка отчёта</h4>
            
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
            type="number"
            placeholder="Номер работы"></MyInput>



            <!-- <MySelect v-model="report.author_uuid" :options="names"> </MySelect> -->

            <MyInput 
            v-model:value="report.note"
            type="text"
            placeholder="Дополнения"></MyInput>

            <MyButton
            @click="createPost"
            style="margin-top: 15px;"
            >Создать</MyButton>

            
        </form>
    </div>
</template>

<script>
import MyInput from "./UI/MyInput.vue";
import uploadFile from '@/components/v-uploadFile.vue';
import axios from "axios";
import { mapState} from "vuex";
export default {
    data() {
        return {
    

            report:{
                title:"",
                path:"",
                author: '',
                subject:"",
                type_work:"",
                number_work: "",
                note:"",
                doc_uuid:""
            },
            file:'',
        };
    },
    methods: {
        createPost() {
            if(this.globalAuthor){

            this.sendFile(this.report,this.file);

            if (!this.report.title == "") {
                this.$emit("create", this.report);
                this.report = {
                    title:"",
                    path:"",
                    author:this.globalAuthor,
                    subject:"",
                    type_work:"",
                    number_work: "",
                    note:"",
                    doc_uuid:""
                };
 
            }
        }
        else{
            alert("У вас недостаточно прав, пожалуйста авторизируйтесь")
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
                report.author = this.globalAuthor
                const formData = new FormData();
                formData.append('file',file);
                formData.append('title',report.title);
                formData.append('file_type', file.name.slice(file.name.indexOf(".")+1,));
                formData.append('author_uuid',this.globalAuthor.uuid);
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
    computed: {
    ...mapState({
        globalAuthor: (state) => state.report.globalAuthor,
    }),
  },

    components: { MyInput,
        uploadFile,}
}

</script>