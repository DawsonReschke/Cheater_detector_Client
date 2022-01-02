<template>
    <div class="Content">
        <InputTextArea v-show="activeTextArea == true" @loading="loading = true" @got-player-data="setPlayerList" />
        <Playerlist v-show="activeTextArea == false" @reset-players="resetPlayers" @sortby="sortby" v-if="playerList.length > 0" :MAD="MAD_data" :PlayerArray="playerList" />
            <img v-if="loading" src="loading.gif">
    </div>
</template>

<script>
import InputTextArea from './steam_comps/InputTextArea.vue'
import Playerlist from './steam_comps/Playerlist.vue';
export default{
    name:"Content",
    components:{
        InputTextArea,
        Playerlist
    },
    data(){
        return{
            playerList : [], 
            MAD_data : {},
            activeTextArea: true,
            loading : false
        }
    },
    methods:{
        setPlayerList(playerList){
            this.playerList = this.ParsePlayerList(playerList); 
            this.MAD_data = this.ParseMAD(playerList); 
            this.activeTextArea = false; 
            this.loading = false; 
        },
        ParseMAD(obj){
            const keys = Object.keys(obj); 
            let MADDATA = {}
            for(let i = 0; i < keys.length; i++){
                if(keys[i] == 'Median_abs_dev'){
                MADDATA = (obj[keys[i]])
                }
            }
            return MADDATA; 
        },
        ParsePlayerList(obj){
            const keys = Object.keys(obj); 
            const arrayOfPlayers = [] 
            for(let i = 0; i < keys.length; i++){
                if(keys[i] != 'Median_abs_dev'){
                arrayOfPlayers.push(obj[keys[i]])
                }
            }
            return arrayOfPlayers; 
        },
        sortby(sortVal){
            this.playerList = this.playerList.sort(sortVal); // sortVal = compare function
        },
        resetPlayers(){
            this.playerList = []
            this.MAD_data = []
            this.activeTextArea = true; 
        }
    }
}
</script>
