<template>
    <div class="Content">
        <InputTextArea @got-player-data="log" />
    </div>
</template>

<script>
import InputTextArea from './steam_comps/InputTextArea.vue'
export default{
    name:"Content",
    components:{
        InputTextArea
    },
    data(){
        return{
            
        }
    },
    methods:{
        log: function(value){
            console.log(value)
        }
    }
}
</script>
