<template>
        <div class ="post">
        <div >
            <div class="imgDocument">
                <a v-bind:href="`roma/api/get_file/`+report.path"  target="_ blank">
                    <img :src="require('./picthers/file.svg')" alt="Панда" >
                </a>
            </div>
            <div><strong> Название: </strong> {{report.title}}</div>   
            <div> <strong> Предмет: </strong> {{report.subject}}</div>
            <div><strong> Тип работы: </strong> {{report.type_work}} </div> 
            <div><strong> Номер работы: </strong> {{report.number_work}} </div>
            <div><strong> Автор: </strong> {{report.author.name}} </div>         
        </div>
        <!-- $router.push(`reports/${report.doc_uuid}`)" -->
        <div class = "post_btns">

            <MyButton
            style="width: 100%; margin: 0px 0px 5px 0px;"
            @click="$router.push(`/reports/${report.doc_uuid}`)">
            Открыть
            </MyButton>  

            <MyButton
            style="width: 49%; margin: 0px 2% 5px 0px;"
            @click="$emit('OpenChangeReport', report)">
            Изменить
            </MyButton>  
       
            <MyButton
            style="width: 49%; margin-bottom:5px;"
            @click="deleteReport(report)">
            Удалить
            </MyButton>
                 
        </div>
    </div>
</template>
<!-- стиль кнопок раньше style="margin-left: 5px; margin-top:5px;" -->
<script>
import {mapActions} from 'vuex';

export default{

    data(){
        return{
            name:'',
        }
    },
    props:{
        report:{
            type: Object,
            required: true
        },
        index:{
            type: Number
        },
    },
    methods:{
        ...mapActions({
            removeReport:'report/removeReport',
            }),
        deleteReport(report){
            this.removeReport(report);
        }

    }
    


}
</script>

<style>
/* .left {
   float: left;
   padding: 0 20px 20px 0;
} */
.imgDocument{
    width: 45px;
    /* float: left; */
   /* padding: 0 20px 20px 0; */
}
</style>