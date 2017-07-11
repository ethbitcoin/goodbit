/*var web3 = require('./modules/web3');*/
var Web3  = require('Web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

module.exports = web3;
var log4js = require('log4js');

var logger = log4js.getLogger();;

logger.info(web3.eth.coinbase);


var filter = web3.eth.filter('latest');

filter.watch(function(error,blockhash){
    if(!error){
        logger.info(blockhash);
        web3.eth.getBlock(blockhash,function(error,block){
            if(error){
                logger.error(error);
            }
            logger.info(block);
        });
    }
});

