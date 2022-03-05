const PORT = 8000
// initialise express, axios, cheerio
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const val_f =  []

// scrap the first page
app.get('/', (req,res) => {
    res.json('wecome to my api')
})
// get ur content from other webpages
app.get('/try', (req, res) => {
    axios.get('https://www.midi-madagasikara.mg/')
        .then((response) => {
            const val = response.data
            const $ = cheerio.load(val)

            $('a:contains("halatra")', val).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                val_f.push({
                    title,
                    url
                })
            })
            res.json(val_f)
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => (console.log(`server runing on ${PORT}`)))