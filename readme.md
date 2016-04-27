# random-puppy [![Build Status](https://travis-ci.org/dylang/random-puppy.svg?branch=master)](https://travis-ci.org/dylang/random-puppy)

> Get a random puppy image url.

<img src="http://i.imgur.com/0zZ8m6B.jpg" width="300px">

## Install

```
$ npm install --save random-puppy
```


## Usage

```js
const randomPuppy = require('random-puppy');

randomPuppy()
    .then(url => {
        console.log(url);
    })

//=> 'http://imgur.com/IoI8uS5'
```


## API

### randomPuppy()

Returns a random puppy image from http://imgur.com/ from https://www.reddit.com/r/puppy

### randomPuppy(subreddit)

Returns a random image from the selected subreddit. Warning: We cannot promise it will be a puppy.

## License

MIT © [Dylan Greene](https://github.com/dylang)
