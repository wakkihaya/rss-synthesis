<template>
    <div class="container">
        <div v-for="feed in feeds" v-bind:key="feed.id">
            <Button :feed="feed"></Button>
        </div>
    </div>
</template>


<script>
import Button from './button.vue';

export default {
    name: "index",
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
                {title: 'TechCrunch', rss: 'https://jp.techcrunch.com/feed/'},
                {title: 'Yahooニュース IT',rss: 'https://news.yahoo.co.jp/pickup/computer/rss.xml'},
                {title: 'NHK 経済ニュース',rss: 'https://www.nhk.or.jp/rss/news/cat5.xml' },
            ],
        }
    },
}

</script>

<style scoped lang="scss">
    .container {
        margin: 5% 10% 0 10%;
        border: solid 3px black;
    }

</style>
