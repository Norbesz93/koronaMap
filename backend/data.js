const axios = require('axios')
const { parse } = require('csv-parse')
const { promisify } = require('util')
const parseAsync = promisify(parse)


const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/0322689cc2927d068f21906776a06463e7584ebb/csse_covid_19_data/csse_covid_19_daily_reports/05-22-2022.csv'


const download = async () => {
    const date = new Date()
    date.setDate(date.getDate()-2)
    const month = date.getMonth()+1
    const monthPadded = month < 10 ? `0${month}` : month
    const day = date.getDate()
    const dayPadded = day < 10 ? `0${day}` : day
    const yesterday = `${monthPadded}-${dayPadded}-${date.getFullYear()}`
    const yesterdayUrl = url.replace('_DATE_',yesterday)
    const res = await axios.get(yesterdayUrl)
    return res.data
}

const csvToJson = async (data) => {
    const records = await parseAsync(data, { from_line: 2 })

    const locations = records.map(rec => {
        const [fips, admin2, state, country, lastUpdated, latitude, longitude, confirmed, deaths, recovered, active, combinedKey] = rec;

        return {
            state,
            country,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            confirmed: parseInt(confirmed),
            deaths: parseInt(deaths),
            recovered: parseInt(recovered),
            combinedKey
        }
    });
    return locations;
}

const downloadAndParse = async () =>{
    const data = await download();
    const locations = await csvToJson(data);
    return locations
};

module.exports = {
    download,
    csvToJson,
    downloadAndParse
}