const axios = require('axios').default;
const dayjs = require('dayjs');

const INVESTMENT = 35_000;  

const getProfit = async (req, res)=> {
    let record = [];
    let promises = [];
    const fiveYearsBefore = dayjs().subtract(5, 'year');
    for(let i =0; i< 5; i++){
        const resp =axios.get(
            `http://api.nbp.pl/api/cenyzlota/${fiveYearsBefore.add(i, 'year').format('YYYY-MM-DD ')}/${fiveYearsBefore.add(i+1, "year").format('YYYY-MM-DD ')}/`);
        promises.push(resp);
    }
    await Promise.all(promises).then(responses => {
        responses.forEach(resp => {
            record = [...record, ...resp.data];
        } );
    });
    
    // find the min value and delete previous values to avoid max value in past time  
    const min = Math.min(...record.map(item => item.cena));
    const indexMin = record.findIndex(item => item.cena === min);
    const recordSinceMin = record.slice(indexMin);
    const max = Math.max(...recordSinceMin.map(item => item.cena));
    const indexMax = recordSinceMin.findIndex(item => item.cena === max);
    
    // Get the value of the dollar on max and min dates 
   const responseMin = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/usd/${record[indexMin].data}/?format=json`)
   const responseMax = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/usd/${record[indexMax].data}/?format=json`)
    
   // Get the total to invest on local currency
   const InvestmentInBNP = responseMin.data.rates[0].ask * INVESTMENT;
    //    Get the min and max price in USD
    const minPriceUSD = (record[indexMin].cena / responseMin.data.rates[0].ask).toFixed(2);
    const maxPriceUSD = (recordSinceMin[indexMax].cena / responseMax.data.rates[0].ask).toFixed(2)

    // amount of gold 
   const amountOfGold =  (InvestmentInBNP / record[indexMin].cena).toFixed(2);
    
   const totalBuy =  (amountOfGold * minPriceUSD).toFixed(2);
   const totalSell =  (amountOfGold * maxPriceUSD).toFixed(2);
    
    res.json({
        bestBuy: { 
            date: record[indexMin].data, 
            amountOfGold: `${amountOfGold}g`,
            price: `${minPriceUSD}$`,
            totalBuy: `${Number(totalBuy).toLocaleString()}$`
        },
        bestSell: {
            date: record[indexMax].data, 
            amountOfGold: `${amountOfGold}g`,
            price: `${maxPriceUSD}$`,
            earn:`${Number(totalSell).toLocaleString()}$`,
        },
        profit: `${(totalSell - totalBuy).toLocaleString()}$`
    });
} 

module.exports = {
    getProfit
}