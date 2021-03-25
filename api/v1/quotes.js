"use strict";

const axios = require("axios");

module.exports = async (req, res) => {


  const url = `https://api.coinranking.com/v1/public/coin/1/history/30d`
    
  const query_quotes = await axios.get( url )
  .catch( error => res.status(500).json( {status:"error", error} ) );

  console.log( (query_quotes.data))
  
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  res.status(200).json( {quotes: query_quotes.data.data.history} );
};



