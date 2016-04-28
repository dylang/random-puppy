'use strict';

const got = require('got');
const uniqueRandomArray = require('unique-random-array');

const randomCache = {};

function formatResult(getRandomImage) {
    const imageData = getRandomImage();
    if (!imageData) {
        return;
    }
    return `http://imgur.com/${imageData.hash}${imageData.ext.replace(/\?.*/, '')}`;
}

function storeResults(images, subreddit) {
    const getRandomImage = uniqueRandomArray(images);

    randomCache[subreddit] = getRandomImage;
    return getRandomImage;
}

function randomPuppy(subreddit) {
    subreddit = (typeof subreddit === 'string' && subreddit.length !== 0) ? subreddit : 'puppies';

    if (randomCache[subreddit]) {
        return Promise.resolve(formatResult(randomCache[subreddit]));
    }

    return got(`https://imgur.com/r/${subreddit}/hot.json`, {json: true})
        .then(response => storeResults(response.body.data, subreddit))
        .then(getRandomImage => formatResult(getRandomImage));
}

function callback(subreddit, cb) {
    randomPuppy(subreddit)
        .then(url => cb(null, url))
        .catch(err => cb(err));
}

// subreddit is optional
// callback support is provided for a training exercise
module.exports = (subreddit, cb) => {
    if (typeof cb === 'function') {
        callback(subreddit, cb);
    } else if (typeof subreddit === 'function') {
        callback(null, subreddit);
    } else {
        return randomPuppy(subreddit);
    }
};
