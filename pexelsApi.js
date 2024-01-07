const axios = require('axios')
const apiKey = 'rwFgTnyh2RYbhBm2c6dvVthyZSoAS74CXqpsfNPAaoQR46f2ONrsF4nP'

const getImgs = async(topic) => {
    const imgArr = await axios.get(`https://api.pexels.com/v1/search?query=${topic}&orientation=landscape&size=medium&per_page=80`, {headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": `${apiKey}`
        }   
    })
    return imgArr.data
}

module.exports = {getImgs}