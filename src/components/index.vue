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
                {title: 'techcrunch', rss: 'https://jp.techcrunch.com/feed/'},
                {title: '東京都', rss: 'https://www.metro.tokyo.lg.jp/rss/index.rdf'}
            ],
        }
    },
}


//ここを開く->  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C://Chrome dev session
</script>

<style scoped lang="scss">
    .container {
        margin: 5% 10% 0 10%;
        border: solid 3px black;
    }

</style>
