const axios = require('axios');
const iconv = require('iconv-lite');
const jschardet = require('jschardet');
const Cors = require('cors');
const cors = Cors({ origin: true });


const rssProxy = async (req,res) => {
    return cors(req,res, async () => {
        const proxyUrl = req.query.url;
        if (proxyUrl === null || proxyUrl === undefined) {
            console.error('need url parameter.');
            return res.status(400).send('need url parameter.');
        }
    let proxyRes;
    try {
        proxyRes = await axios.get(proxyUrl, {
            responseType: 'arraybuffer',
            transformResponse: [
                (data) => {
                    const buffer = Buffer.from(data)
                    const { encoding } = jschardet.detect(buffer)
                    return iconv.decode(Buffer.from(data), encoding)
                },
            ],
        })
    } catch (error) {
        console.error(error)
        return
    }
    return res.send(proxyRes.data);
})
}

rssProxy("https://jp.techcrunch.com/feed/")

module.exports = rssProxy;
// export { rssProxy };
