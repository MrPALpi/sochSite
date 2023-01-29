<template>
    <div ref="observer">
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
    </div>
</template>

<script>
import { mapActions } from "vuex";
import ReportItem from "@/components/ReportComponents/ReportItem.vue";
export default{
    components : {ReportItem},
    props:{
        reports:{
            type: Array,
            required: true
        }
    },
    methods:{
        ...mapActions({
      subscribe: "report/subscribeRun",
    }),
    },
    mounted(){
        const options = {
                rootMargin: '0px',
                threshold: 0.01
            }
            const callback = (entries) => {
                
                if (entries[0].isIntersecting ){
                    this.subscribe();
                }
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer);
    }
   
}
</script>