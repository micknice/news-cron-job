const axios = require('axios')
// const endpoint = `https://nice-news.onrender.com/api/articles`
const endpoint = `https://nice-news.onrender.com/api/articles`


const postNewArticle = async(articleObj) => {

    const article = {
        title: articleObj.title, 
        topic: articleObj.topic, 
        author: articleObj.author, 
        body: articleObj.body, 
        createdAt: articleObj.createdAt, 
        votes: 0, 
        article_img_url: articleObj.article_img_url
    }

    const res = await axios.post(`${endpoint}`, article, {
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            }
    })

    return res
}

const getArticlesByTopic = async (topic) => {
    const topicStr = topic.toLowerCase()
    // const { data } = await niceNewsApi.get(`/articles?topic=${topicStr}`);
    const { data } = await axios.get(`${endpoint}?topic=${topicStr}`, {
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            }
    });
    return data.articles;
}

module.exports = {postNewArticle, getArticlesByTopic}