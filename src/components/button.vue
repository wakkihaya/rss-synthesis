<template>
    <div class="feed">
        <div class="feed--title">
            {{feed.title}}
        </div>
        <div class="feed--action-button"
             v-if="isPlayOn"
             v-on:click="PlayVoice(feed.rss)"
        >
            再生
        </div>
        <div class="feed--action-button"
             v-if="isPauseOn"
             v-on:click="PauseVoice"
        >
            一時停止
        </div>
        <div class="feed--action-button"
             v-if="isResumeOn"
             v-on:click="ResumeVoice"
        >
            再開
        </div>
        <div class="feed--stop-button"
             v-on:click="StopVoice"
        >
            停止
        </div>
    </div>
</template>

<script>
import RssParser from 'rss-parser'

const rssParser = new RssParser();
const host = 'https://us-central1-rss-synthesis.cloudfunctions.net';

export default {
    name: "button",
    props: ['feed'],
    data: function () {
        return {
            contents: [],
            isPlayOn: true,
            isPauseOn: false,
            isResumeOn: false,
        }
    },
    methods: {
        fetchFeed: async function (url) {
            let self = this;
            const feed = await rssParser.parseURL(`${host}/RssProxy?url=${url}`);
            feed.items.map(function (item) {
                self.contents.push(item.title);
            });
        },
        PlayVoice: async function (url) {
            speechSynthesis.cancel();
            await this.fetchFeed(url);
            this.contents.forEach((item) => {
                const uttr = new SpeechSynthesisUtterance(item);
                uttr.lang = 'ja-JP';
                uttr.rate = 1.0;
                speechSynthesis.speak(uttr);
            });
            this.isPlayOn = false;
            this.isPauseOn = true;
        },
        PauseVoice: function () {
            speechSynthesis.pause();
            this.isPauseOn = false;
            this.isResumeOn = true;
        },
        ResumeVoice: function () {
            speechSynthesis.resume();
            this.isPauseOn = true;
            this.isResumeOn = false;
        },
        StopVoice: function () {
            speechSynthesis.cancel();
            this.isPlayOn = true;
            this.isPauseOn = false;
            this.isResumeOn = false;
        }
    }
}
</script>

<style scoped lang="scss">
    .feed {
        display: flex;
        padding: 1rem;
        border-bottom: solid 1px gray;

        &--title {
            flex-basis: 60%;
            text-align: center;
            font-size: 2rem;
        }

        &--action-button {
            flex-basis: 20%;
            background: #e14500;
            border-radius: 5px;
            color: white;
            font-size: 1.5rem;
            text-align: center;
            cursor: pointer;
        }

        &--stop-button {
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
