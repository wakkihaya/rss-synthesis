<template>
    <div class="container">
        <div class="feed" v-for="feed in feeds" v-bind:key="feed.id">
            <div class="feed--title">
                {{feed.title}}
            </div>
            <div class="feed--play-button"
                 v-on:click="fetchFeed(feed.rss)"
            >
                再生
            </div>
            <div class="feed--stop-button"
                 v-on:click="StopVoice"
            >
                停止
            </div>
        </div>
    </div>
</template>


<script>
// import firebase from 'firebase';
import RssParser from 'rss-parser'
const rssParser = new RssParser();
const host = 'https://us-central1-rss-synthesis.cloudfunctions.net';


export default {
    name: "index",
    data: function(){
        return{
            header: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            },
            feeds: [
                {title: 'techcrunch', rss: 'https://jp.techcrunch.com/feed/'},
                {title: '東京都', rss: 'https://www.metro.tokyo.lg.jp/rss/index.rdf'}
            ]
        }
    },

    methods: {
        fetchFeed : async function(url){
            const feed = await rssParser.parseURL(`${host}/RssProxy?url=${url}`);
            feed.items.map(function(item){
                const uttr = new SpeechSynthesisUtterance(item.title);
                speechSynthesis.speak(uttr);
            })
        },
        StopVoice : function(){
            speechSynthesis.cancel();
        }
    }
}


//ここを開く->  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C://Chrome dev session
</script>

<style scoped lang="scss">
.container{
    margin: 5% 10% 0 10%;
    border: solid 3px black;
}

.feed{
    display: flex;
    padding: 1rem;
    border-bottom: solid 1px gray;
    &--title{
        flex-basis: 60%;
        text-align: center;
        font-size: 2rem;
    }
    &--play-button{
        flex-basis: 20%;
        background: #e14500;
        border-radius: 5px;
        color: white;
        font-size: 1.5rem;
        text-align: center;
        cursor: pointer;
    }
    &--stop-button{
        flex-basis: 20%;
        background: gray;
        border-radius: 5px;
        color: white;
        font-size: 1.5rem;
        text-align: center;
        cursor: pointer;
    }

}

</style>
