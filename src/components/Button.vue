<template>
    <div class="feed">
        <div class="feed--title">
            <a :href="feed.url">
                {{feed.title}}
            </a>
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
const voices = window.speechSynthesis.getVoices();


export default {
    name: "Button",
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
                if (item.contentSnippet !== undefined) {
                    self.contents.push('タイトルはこちら。 ' + item.title + '。 　　　概要はこちら。　' + item.contentSnippet);
                } else {
                    self.contents.push('タイトルはこちら。 ' + item.title + '。　　　　詳しくはサイトをチェック。');
                }
            });
        },
        PlayVoice: async function (url) {
            speechSynthesis.cancel();
            await this.fetchFeed(url);
            this.contents.map(function (item) {
                const uttr = new SpeechSynthesisUtterance(item);
                uttr.lang = 'ja-JP';
                uttr.rate = 1.0;
                uttr.voice = voices[6];
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
        align-items: center;
        height: 100%;

        &--title {
            flex-basis: 60%;
            text-align: center;
            font-size: 2rem;

            a {
                color: black;
            }
        }

        &--action-button {
            flex-basis: 20%;
            background: #e14500;
            border-radius: 5px;
            color: white;
            font-size: 1.5rem;
            text-align: center;
            cursor: pointer;
            margin: 0 2rem;
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
