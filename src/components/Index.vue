<template>
    <div>
        <div class="description">
            RSS Feedcastでは、下記にあるニュースサイトの最新情報を耳で収集できます。
        </div>
        <div class="feed-container">
            <div class="feed-list" v-for="feed in feeds" v-bind:key="feed.id">
                <Button :feed="feed"></Button>
            </div>
        </div>
    </div>
</template>


<script>
import Button from './Button.vue';

export default {
    name: "Index",
    components: {
        Button
    },
    data: function () {
        return {
            header: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            },
            feeds: [
                {title: 'TechCrunch', rss: 'https://jp.techcrunch.com/feed/', url: 'https://jp.techcrunch.com'},
                {
                    title: 'Yahooニュース IT',
                    rss: 'https://news.yahoo.co.jp/pickup/computer/rss.xml',
                    url: 'https://news.yahoo.co.jp/categories/it'
                },
                {title: 'NHK 経済ニュース', rss: 'https://www.nhk.or.jp/rss/news/cat5.xml', url: 'https://www.nhk.or.jp/'},
            ],
        }
    },
}

</script>

<style scoped lang="scss">
    .feed-container {
        margin: 5% 10% 0 10%;
        border: solid 3px black;
    }

    .description {
        padding: 5% 0 0 10%;
        font-size: 1.5rem;

    }

    .feed-list {
        border-bottom: solid 1px gray;
        min-height: 100px;
    }

</style>
