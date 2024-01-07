const axios = require('axios')
const {getFormattedDate} = require('./utils')

const key = '54ffbbb2-5120-45e0-936a-4853d5fccc08'
const topicArr = ['football', 'games', 'government-computing-networks', 'jobsadvice', 'news', 'science', 'technology']



const getFilteredResults = async (page= 1, topic= 'news') => {
    const dateStr = getFormattedDate()
    const queryStr = `?q=science&api-key=${key}`
    // axios.get(`https://content.guardianapis.com/search?q=science&from=${dateStr}&api-key=${key}`)
    const res = await axios.get(`https://content.guardianapis.com/search?page=${page}&from=${dateStr}&api-key=${key}`)
            const results = res.data.response.results
            const filteredResults = results.filter(x => x.type === 'article')
                .filter(x => 
                    x.sectionId === `${topic}` || 
                    x.sectionId === 'games' || 
                    x.sectionId === 'government-computing-networks' || 
                    x.sectionId === 'jobsadvice' || 
                    x.sectionId === 'news' || 
                    x.sectionId === 'science' || 
                    x.sectionId === 'technology'
                    )
        return filteredResults
}
const getResultsByTopic = async (page= 1, topic= 'news', precedingDays=1) => {
    const dateStr = getFormattedDate(precedingDays)
    const queryStr = `?q=science&api-key=${key}`
    // axios.get(`https://content.guardianapis.com/search?q=science&from=${dateStr}&api-key=${key}`)
    const res = await axios.get(`https://content.guardianapis.com/search?section=${topic}&page=${page}&from=${dateStr}&api-key=${key}`)
        const results = res.data.response.results
        const filteredResults = results.filter(x => x.type === 'article')
            .filter(x => x.sectionId === `${topic}`)
        return filteredResults
}

const getTenArticles = async() => {
    let articlesArr = []
    for (let i =1; i < 50; i++) {
        if(articlesArr.length > 50) {
            return articlesArr
        } else {
            const results = await getFilteredResults(i)
            articlesArr = articlesArr.concat(results)
        }
    }
    return articlesArr
    
}
const getGuardianArticlesByTopic = async(topic) => {
    let articlesArr = []
    for (let i =1; i < 100; i++) {
        if(articlesArr.length > 100) {
            return articlesArr
        } else {
            const results = await getResultsByTopic(i, topic, 90)
            articlesArr = articlesArr.concat(results)
        }
    }
    return articlesArr
    
}

getArticlesByTopic('science')



module.exports = {getFilteredResults, getTenArticles, getGuardianArticlesByTopic}