<template>
    <div class="user_inputs">
        <input placeholder="paste console output here" v-model="innerText"/>
        <button @click.prevent="sendData(innerText,emmitingCallBack); $emit('loading'); innerText = ''">Get User Data</button>
    </div>
</template>

<script>
export default {
    name:"InputTextArea",
    data(){
        return{
            innerText : "",
        }
    },
    methods:{
        sendData: function(data,callback){
            if(this.parseSteamIdsFromInnerText(data) == null) {return false} 
            const ServerPostRequest = new XMLHttpRequest()
            ServerPostRequest.responseType = 'json';
            ServerPostRequest.open('post',`${process.env.VUE_APP_ENV_URL}/?ids=${this.parseSteamIdsFromInnerText(data)}`); 
            ServerPostRequest.onload = function (){
                callback(ServerPostRequest.response); 
            } 
            ServerPostRequest.send(); 
        },
        parseSteamIdsFromInnerText: function (s){
        let str = s.replace('"',' ')
        const splitBySpace = str.split(' '); 
        const steamIDs = splitBySpace.filter(val=>{
                 return (val.includes('STEAM'))
             })
        if(Object.keys(steamIDs).length == 0) return null; 
        return steamIDs.map((val)=>{
                 return this.steamIDtosteam64(val);
        }); 
        },
         steamIDtosteam64: function(steamid){
            const parsed = steamid.split(':'); 
            const x = parsed[1]; 
            const y = parsed[2]; 
            return (BigInt(y) * 2n) + BigInt(x) + 76561197960265728n;
        },
        emmitingCallBack: function(val){
            this.$emit('got-player-data',val)
        }
    }
}
</script>