const {getFilteredResults, getTenArticles, getGuardianArticlesByTopic} = require('./guardianApi')
const {scrapeArticleBody} = require('./scrapeArticle')
const {getQueryResponse} = require('./openAIApi')
const {getImgs} = require('./pexelsApi')
const {postNewArticle, getArticlesByTopic} = require('./tardigradeApi')

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

const updateArticlesDatabase = async() => {
    console.log('updating articles')
    // for (const topic of topicArr) {
    //     const articlesArr = await getGuardianArticlesByTopic(topic)
    //     const dbArticlesArr = await getArticlesByTopic(topic)
    //     const dbArticleTitles = dbArticlesArr.map(x => x.title)
    //     const newArticlesArr = []
    //     for (const article of articlesArr) {
    //         if (!dbArticleTitles.includes(article.webTitle)) {
    //             newArticlesArr.push(article)
    //         }
    //     }
    //     for (const article of newArticlesArr) {
    //         const scrapedArticleBodyArray = await scrapeArticleBody(article.webUrl)
    //         const joinedString = scrapedArticleBodyArray.join()
    //         if (joinedString.length < 4000) {
    //             const queryStr = `Re-word the following article without taking liberties with the facts as presented: ${joinedString}`
    //             const gptQueryResponse = await getQueryResponse(queryStr)
    //             const imgArr = await getImgs(topicLookup[article.sectionId])
    //             const randomNumber = Math.floor(Math.random() * 80);
    //             const randomImg = imgArr.photos[randomNumber]
    //             const articleWithGptBodyAndPexelsImg = {
    //                 title: article.webTitle,
    //                 topic: article.sectionId,
    //                 author: randomImg.photographer,
    //                 body: gptQueryResponse,
    //                 createdAt: article.webPublicationDate,
    //                 votes: 0,
    //                 article_img_url: randomImg.src.original
    //             }
    //             try {
    //                 const postResponse = await postNewArticle(articleWithGptBodyAndPexelsImg)
    //                 console.log('SUCCESSFUL POST RESPONSE:', postResponse)
    //             } catch (e) {
    //                 console.log('POST REQUEST ERROR:', e)
    //             }
    //         }
    //     }
    // }
}





updateArticlesDatabase()