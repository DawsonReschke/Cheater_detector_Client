import { createApp } from 'vue'
import App from './App.vue'
// eslint-disable-next-line no-use-before-define
let path = `C:\\Users\\dawso\\workspace\\git\\cspredictor\\Cheater_detector_Client\\client\\.env`// eslint-disable-line no-use-before-define
const dotenv = require('dotenv');
dotenv.config({path:path});
console.log(path)

createApp(App).mount('#app')
