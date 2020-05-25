<template>
    <div class="feed">
        <div class="feed--tab">
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
        <div class="feed--paused-article"
             v-if="isResumeOn"
        >
            <div class="feed--paused-article-desc">
                一時停止した記事のタイトル
            </div>
            <div class="feed--paused-article-item">
                <a :href="item_link">
                    {{item_content}}
                </a>
            </div>
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
            content_title: [],
            content_link: [],
            item_content: "",
            item_link: "",
            isPlayOn: true,
            isPauseOn: false,
            isResumeOn: false,
            isStopOn: false,
        }
    },
    methods: {
        fetchFeed: async function (url) {
            let self = this;
            const feed = await rssParser.parseURL(`${host}/RssProxy?url=${url}`);
            feed.items.map(function (item) {
                if (item.contentSnippet !== undefined) {
                    self.content_title.push(item.title);
                    self.content_link.push(item.link);
                    self.contents.push('タイトルはこちら。 ' + item.title + '。概要はこちら。　' + item.contentSnippet);
                } else {
                    self.contents.push('タイトルはこちら。 ' + item.title + '。詳しくはサイトをチェック。');
                }
            });
        },
        PlayVoice: async function (url) {
            let self = this;
            speechSynthesis.cancel();
            await this.fetchFeed(url);
            const uttr = new SpeechSynthesisUtterance();
            uttr.lang = 'ja-JP';
            uttr.rate = 1.0;
            uttr.voice = voices[6];
            for (var i = 0; i < this.contents.length; i++) {
                speechSynthesis.cancel();
                uttr.text = this.contents[i];
                this.item_content = this.content_title[i];
                this.item_link = this.content_link[i];
                await new Promise(function (resolve) {
                    uttr.onend = resolve;
                    speechSynthesis.speak(uttr);
                    self.isPlayOn = false;
                    self.isPauseOn = true;
                });
                if (self.isStopOn) {
                    return;
                }
            }
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
            this.isStopOn = true;
        }
    }
}
</script>

<style scoped lang="scss">
    $small-font-size: 1.2rem;
    $medium-font-size: 1.5rem;
    $large-font-size: 2rem;
    .feed {
        display: flex;
        flex-direction: column;

        &--tab {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 2rem;
        }

        &--title {
            flex-basis: 60%;
            text-align: center;
            font-size: $large-font-size;

            a {
                color: black;
            }
        }

        &--action-button {
            flex-basis: 20%;
            background: #e14500;
            border-radius: 5px;
            color: white;
            font-size: $medium-font-size;
            text-align: center;
            cursor: pointer;
            margin: 0 2rem;
        }

        &--stop-button {
            flex-basis: 20%;
            background: gray;
            border-radius: 5px;
            color: white;
            font-size: $medium-font-size;
            text-align: center;
            cursor: pointer;
        }

        &--paused-article-desc {
            background: #f0a280;
            color: white;
            font-weight: bold;
            font-size: $small-font-size;
            padding: 0.5rem;
        }

        &--paused-article-item {
            padding: 0.5rem;
        }
    }
</style>
