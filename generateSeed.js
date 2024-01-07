const {getFilteredResults, getTenArticles, getArticlesByTopic} = require('./guardianApi')
const {scrapeArticleBody} = require('./scrapeArticle')
const {getQueryResponse} = require('./openAIApi')
const {getImgs} = require('./pexelsApi')
const {postNewArticle} = require('./tardigradeApi')
const fs = require('fs')

const topicArr = ['games', 'news', 'science', 'technology']

const topicLookup = {
    'football': 'soccer', 
    'games': 'gaming', 
    'government-computing-networks': 'coding', 
    'jobsadvice': 'job', 
    'news': 'news', 
    'science': 'science', 
    'technology': 'technology'

}

const generateSeed = async() => {
    const articlesArrAllTopics = []
    for (const topic of topicArr) {
        const articlesArr = await getArticlesByTopic(topic)
        articlesArrAllTopics.push(articlesArr)

    }
    const flattenedArr = articlesArrAllTopics.flat()

    const reworkedArticleObjArr = []
    
    for (const article of flattenedArr) {
        const scrapedArticleBodyArray = await scrapeArticleBody(article.webUrl)
        const joinedString = scrapedArticleBodyArray.join()
        if (joinedString.length < 4000) {
            const queryStr = `Re-word the following article without taking liberties with the facts as presented: ${joinedString}`
            const gptQueryResponse = await getQueryResponse(queryStr)
            const imgArr = await getImgs(topicLookup[article.sectionId])
            const randomNumber = Math.floor(Math.random() * 80);
            const randomImg = imgArr.photos[randomNumber]
            const articleWithGptBodyAndPexelsImg = {
                title: article.webTitle,
                topic: article.sectionId,
                author: randomImg.photographer,
                body: gptQueryResponse,
                createdAt: article.webPublicationDate,
                votes: 0,
                article_img_url: randomImg.src.original
            }
            reworkedArticleObjArr.push(articleWithGptBodyAndPexelsImg)
        }
    }
    console.log(reworkedArticleObjArr.length)
    fs.writeFileSync("./reworkedArticles.json", JSON.stringify(reworkedArticleObjArr));
        console.log("Articles written to JSON successfully");
}


generateSeed()