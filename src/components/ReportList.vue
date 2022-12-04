<template>
    
     <div v-if="reports.length>0">
        <div>
        <!-- <h3>Отчёты</h3> -->
        <transition-group name="post-list">
      <ReportItem v-for="(report, index) in reports" :key="report"
      :report="report"
      :index="index"
    
      @OpenChangeReport="$emit('OpenChangeReport', report)"/>
     </transition-group>
        </div>
    </div>
        <div v-else style="color: #fff; font-family: 'Roboto'; margin-top: 50px;">
            <h2>Отчётов пока нет</h2>
        </div>
    
</template>

<script>

import ReportItem from "@/components/ReportItem.vue";
export default{
    components : {ReportItem},
    props:{
        reports:{
            type: Array,
            required: true
        }
    },
    mounted() {
},
}
</script>