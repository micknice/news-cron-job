const getFormattedDate = (precedingDays = 1) => {
    const currentDate = new Date()

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - precedingDays)

    const year = yesterday.getFullYear()
    const month = (yesterday.getMonth() + 1).toString().padStart(2, '0')
    const day = yesterday.getDate().toString().padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
}


module.exports = {getFormattedDate}