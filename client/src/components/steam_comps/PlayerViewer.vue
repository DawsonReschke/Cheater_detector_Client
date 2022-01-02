<template>
    <div style="border:1px solid black" class="player_viewer">
        <div class="left">
            <img v-bind:class="{low : cheatingProb < 1, medium : cheatingProb >= 1, high : cheatingProb >= 3, extreem : cheatingProb >= 4 }" :src="Player['user_data']['avatar']">
            <a rel="noopener noreferrer" target="_blank" :href="Player['user_data'].profileurl">{{Player['user_data'].personaname}}</a>
        </div>
        <div v-if="getPlayerStats() != ''" class="player-stats">
            |{{restrict(getPlayerStats()['Win_ratio'])}} | {{restrict(getPlayerStats()['HS_Ratio'])}} | {{restrict(getPlayerStats()['KD_Ratio'])}} | {{restrict(getPlayerStats()['accuracy'])}} | {{restrict(getPlayerStats()['MVP_ratio'])}}|
        </div>
    </div>
</template>

<script>
export default {
    name:"PlayerViewer",
    data(){
        return{
            cheatingProb: this.getPlayerProfileScore()
        }
    },
    props:{
        Player:Object,
        Median_Absolute_Deviation_Data: Object,
    },
    methods:{
        getPlayerStats: function() {
            if(this.Player['user_game_stats']){
                if(this.Player['user_game_stats']['general_stats']){
                return this.Player['user_game_stats']['general_stats']
                }
            }
            return ''
        },
        getPlayerMADzScore: function(){
            const playerStats = this.getPlayerStats(); 
            if(typeof playerStats == 'string') return 0.5 // the players game stats are set to private:
            const data = this.Median_Absolute_Deviation_Data['data']
            const keys = Object.keys(data)
            const zScores = []; 
            for(let i = 0; i < keys.length; i++){
                zScores.push((playerStats[keys[i]]['normalized'] - data[keys[i]]['MED']) / data[keys[i]]['MAD'])
            }
            return zScores.reduce((prev,current)=> prev + current>0 ? current: 0); 
        },
        getPlayerProfileScore: function(){
            const profileData = this.Player['user_data']; 
            let total = 0; 
            if(profileData['communityvisibilitystate'] == 1){
                total += 3;
            }else{
                total += this.Player[ "owned_game_data"]['play_time'] /60 < 100 ? 2 : 0
            }
            total += this.getPlayerMADzScore(); 
            total += this.timeSince().includes('months') ? Number(this.timeSince().replace('months','')) / 4:0
            total += this.Player['steam_level'] <= 1 ? 1 : 0
            return total; 
        },
        timeSince:function() {
            let date = this.Player['user_data']['timecreated'] * 1000
            if (typeof date !== 'object') {
                date = new Date(date);
            }

            var seconds = Math.floor((new Date() - date) / 1000);
            var intervalType;

            var interval = Math.floor(seconds / 31536000);
            if (interval >= 1) {
                intervalType = 'year';
            } else {
                interval = Math.floor(seconds / 2592000);
                if (interval >= 1) {
                intervalType = 'month';
                } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    intervalType = 'day';
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                    intervalType = "hour";
                    } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                    }
                }
                }
            }

            if (interval > 1 || interval === 0) {
                intervalType += 's';
            }

            return interval + ' ' + intervalType;
            },
            restrict: function(val){
                return ` ${String(val).slice(0,5)} `; 
            }
    }
}
</script>

<style scoped>
.player_viewer{
    width: 45vw;
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
a{
    text-decoration: none;
    color: purple;
}
.left{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left a{
    padding-left: 20px;
}

.low{
    border: 2px solid rgba(160, 255, 17);
}
.medium{
    border: 2px solid rgba(251, 255, 17);
}
.high{
    border: 2px solid rgba(255, 164, 17);
}
.extreem{
    border: 2px solid rgb(255, 30, 0);
}


</style>