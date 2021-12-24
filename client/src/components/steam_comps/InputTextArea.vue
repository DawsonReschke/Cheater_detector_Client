<template>
    <div class="user_inputs">
        <textarea v-model="innerText"></textarea>
        <input @click.prevent="sendData(innerText,emmitingCallBack)" type="button">
    </div>
</template>

<script>
export default {
    name:"InputTextArea",
    data(){
        return{
            innerText : "",
            BackEndServer:""
        }
    },
    methods:{
        sendData: function(data,callback){
            const ServerPostRequest = new XMLHttpRequest()
            ServerPostRequest.open('post',`${process.env.VUE_APP_ENV_URL}/?ids=${this.parseSteamIdsFromInnerText(data)}`); 
            ServerPostRequest.onload = function (){
                callback(ServerPostRequest.response); 
            } 
            ServerPostRequest.send(); 
        },
        parseSteamIdsFromInnerText: function (s){
        let str = s.replace('"',' ')
        console.log(`string to parse: ${str}`)
        const splitBySpace = str.split(' '); 
        const steamIDs = splitBySpace.filter(val=>{
                 return (val.includes('STEAM'))
             })
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