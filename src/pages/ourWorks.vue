<template>
    <div class="padClass"> 
        <h1>Отчёты</h1>      
        <MyInput ПОИСК
        v-model:value="searchQuery"
        placeholder="Поиск...">
        </MyInput>
        
        <div class="app_btns">

        <MyButton @click="showDialog">Создать пост</MyButton>

        <MySelect v-model="selectedSort" :options="sortOptions"> </MySelect>
        </div>
        
        <MyDialog v-model:show="dialigVisible"><ReportForm
        @create="createReport"
        
        
        /></MyDialog>

        <MyDialog v-model:show="changeVisible"><ChangeReport :mustChangeReport="mustChangeReport" 
        @changeReport="changeReport"/></MyDialog>


        <ReportList :reports="sortedAndSearchedReports"
        @remove="removeReport"
        @OpenChangeReport="OpenChangeReport"
        v-if="!isReportLoading" />
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
import ReportForm from '@/components/ReportForm.vue';
import ReportList from '@/components/ReportList.vue';
import ChangeReport from '@/components/ChangeReport.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MySelect from '@/components/UI/MySelect.vue';
import axios from "axios";


    export default{
        components : {
    ReportForm,
    ReportList,
    MyDialog,
    MyButton,
    MySelect,
    ChangeReport,

},
        data () {
            return {
                reports : [],
                mustChangeReport:{
                    title:'',
                    path:'',
                    author:'',
                    subject:'',
                    type_work:'',
                    number_work: '',
                    note:'',
                    doc_uuid:''
                },
                dialigVisible: false,
                changeVisible: false,
                isReportLoading: false,
                selectedSort: "",
                searchQuery: "",
                page:1,
                limit:10,
                totalPage:0,
                sortOptions : [
                    {value: "title", name: "По названию"},
                    {value: "subject", name: "По предмету"},
                    {value: "type_work", name: "По типу"},
                    {value: "autor.name", name: "По автору"},
                    // {value: "autor.тг", name: "По номеру"},
                    // {value: "number_work", name: "По номеру"},
                ],
                // file: '',
            }
        },
        methods: {
            createReport(Report){
                this.reports.push(Report);
                // console.log(Report);
                // this.loadMoreReports()
                // console.log("Зырь сюда ",!(typeof Report.author === 'string'));
                this.dialigVisible=false;
                
            },
            // inputTitle(event){
            //     this.title = event.target.value;
            // },
            async removeReport(report){
                // console.log(index);
                
                try{
                    this.reports = this.reports.filter(p => p!==report);
                    await axios.delete(`roma/api/del_doc?doc_uuid=${report.doc_uuid}`);
                    // console.log("Э",`${report.doc_uuid}`)
                }
                catch (e){
                    alert('Error')
                }
                
            },
            OpenChangeReport(Report){
                this.mustChangeReport = Report;
    
                this.changeVisible = true;

            },
            showDialog(){
                this.dialigVisible=true;
            },
            changeReport(Report){
            //     console.log(file,Report);
            //    if(file){
            //     console.log("нада изменять файл");
            //    }
               
                const changedReport  = this.reports[this.reports.indexOf(this.reports.find(reportMass => reportMass.doc_uuid === Report.doc_uuid ))];
                // console.log(Report);
                // Object.keys(Object.keys(Report)).forEach(key => rp.setAttribute(key, Object.keys(Report)[key]));
                delete Report['doc_uuid'];
                const formData = new FormData();
                for (let key in Report){
                    changedReport[key] = Report[key];
                    formData.append(key,Report[key]);
                }
                // this.reports[this.reports.indexOf(this.reports.find(ReportMass => ReportMass.id === Report.id))] =  Report;
                // this.reports[this.reports.indexOf(this.reports.find(reportMass => reportMass.doc_uuid === Report.doc_uuid ))] =  Report;
                this.changeVisible = false;
                try{
                    // delete Report['doc_uuid'];
                    axios.put(`roma/api/update_doc?doc_uuid=${changedReport.doc_uuid}`,
                    formData,{
                headers: {
                'Content-Type': 'application/json'
                }
                });
                                
                }catch(e){
                    console.log(e);
                }

            },
            
        
            // async getUser(user){
            //     try{
            //         return await axios.get(`roma/api/get?user.name=${user}`);
                     
            //     }
            //     catch (e){
            //         alert('Error')
            //     }
            // },
            async fetchReports(){
                try{
                    this.isReportLoading = true;
                    const response = await axios.get("roma/api/get?all_docs");
                    
                    // this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
                    this.reports = response['data']['docs'];
                    // console.log("блять",this.reports);
                 
                }
                catch (e){
                    alert('Error')
                }
                finally{
                    this.isReportLoading = false;
                }
            },
            async loadMoreReports(){
                try{
                    // this.page +=1;
                    const response = await axios.get("roma/api/get?all_docs", {

                    });

                    // this.totalPage = Math.ceil(response.headers['x-total-count']/this.limit);
                    this.reports = [...this.reports, ...response.data.docs];
        
                }
                catch (e){
                    alert('Error')
                    
                }
                
            },

        },
        mounted(){
            this.fetchReports();
            
            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // }
            // const callback = (entries) => {
                
            //     if (entries[0].isIntersecting & this.page < this.totalPage){
            //         this.loadMoreReports();
            //     }
            // };
            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer);
        },
        computed:{
            sortReports(){
                // console.log(this.reports[0][this.selectedSort]);
                // let r = [...this.reports].sort((Report1,Report2) =>  Report1[this.selectedSort]?.localeCompare(Report2[this.selectedSort]));
            
                return [...this.reports].sort((Report1,Report2) =>  Report1[this.selectedSort]?.localeCompare(Report2[this.selectedSort]));
                
            },
            sortedAndSearchedReports(){
                return this.sortReports.filter(Reports => Reports.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
                
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