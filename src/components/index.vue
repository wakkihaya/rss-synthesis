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
            console.log("RSS TO JSON")
            const feed = await rssParser.parseURL(url);
            console.log(feed.title);
        },
        SpeakVoice : async function(url){
            const text = await this.RssToJson(url);
            console.log("text",text);
            const uttr = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(uttr);
        }
    }
}
</script>

<style scoped>

</style>
