import Youtube from 'youtube-node';
const config = require('./yt-config.json');
const youtube = new Youtube();

youtube.setKey(config.key);

function searchVideoURL(message, queryText){
    return new Promise((resolve, reject) => {
        youtube.search(`Exercício em casa ${queryText}`, 2, function(error, result){
            if (!error){
                const videosIds = result.items.map((item) => item.id.videoId).filter(item=>item);
                const youtubeLinks = videosIds.map((videoId) => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
            }else{
                reject("ERRO");
        
            }
        });

    });
};

module.exports.searchVideoURL = searchVideoURL;