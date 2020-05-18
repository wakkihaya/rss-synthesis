<template>
    <div class="container">
        <div class="feed">
            <div class="feed-title">
                Tech Crunch
            </div>
            <div class="play-button" v-on:click="SpeakVoice('https://jp.techcrunch.com/feed/')">
                再生
            </div>
        </div>
    </div>
</template>

<script>
import RssParser from 'rss-parser';
const rssParser = new RssParser();

export default {
    name: "index",
    methods: {
        RssToJson : async function(url){
            const feed = await rssParser.parseURL(url);
            return feed;
        },
        SpeakVoice : async function(url){
            const feed = await this.RssToJson(url);
            feed.items.map(function(item){
                console.log(item)
                const uttr = new SpeechSynthesisUtterance(item.title);
                speechSynthesis.speak(uttr);
            })
        }
    }
}


//ここを開く->  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C://Chrome dev session
</script>

<style scoped>

</style>
