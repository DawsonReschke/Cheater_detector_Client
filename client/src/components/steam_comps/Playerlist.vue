<template>
    <div class="playerlist">
        <div class="list">
            <ul>
                <a style="float:right;">| W/L% | HS% | K/D% | ACC | MVP% | </a>
                <li style="list-style-type: none;" v-for="player in PlayerArray" :key="player.id">
                    <PlayerViewer v-if="player.user_data" :Median_Absolute_Deviation_Data="MAD" :Player="player"/>
                </li>
            </ul>
        </div>
        <button @click="$emit('reset-players')">Reset</button>
    </div>
</template>

<script>
import PlayerViewer from './PlayerViewer.vue'
export default {
    name:"Playerlist",
    data(){
        return{
            
        }
    },
    components:{
        PlayerViewer,
    },
    props:{
        PlayerArray:Array,
        MAD:Object,
    },
    methods:{
        
    }
}
</script>

<style scoped>
.list{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>