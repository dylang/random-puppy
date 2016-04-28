import test from 'ava';
import randomPuppy from './';

const imgurRegEx = /^https?:\/\/(\w+\.)?imgur.com\/[a-zA-Z0-9]+(\.[a-zA-Z]{3})?$/;

test('get random', async t => {
    const result = await randomPuppy();
    t.regex(result, imgurRegEx);
});

test.cb('use callback', t => {
    t.plan(2);
    randomPuppy((err, result) => {
        t.falsy(err);
        t.regex(result, imgurRegEx);
        t.end();
    });
});

test.cb('use callback and different subreddit', t => {
    t.plan(2);
    randomPuppy('aww', (err, result) => {
        t.falsy(err);
        t.regex(result, imgurRegEx);
        t.end();
    });
});

test('get more random', async t => {
    const result1 = await randomPuppy();
    t.regex(result1, imgurRegEx);
    const result2 = await randomPuppy();
    t.regex(result2, imgurRegEx);
    const result3 = await randomPuppy();
    t.regex(result3, imgurRegEx);
    const result4 = await randomPuppy();
    t.regex(result4, imgurRegEx);
});

test('different subreddit', async t => {
    const result1 = await randomPuppy('aww');
    t.regex(result1, imgurRegEx);
    const result2 = await randomPuppy('aww');
    t.regex(result2, imgurRegEx);
    const result3 = await randomPuppy('aww');
    t.regex(result3, imgurRegEx);
    const result4 = await randomPuppy('aww');
    t.regex(result4, imgurRegEx);
});

test('invalid subreddit', async t => {
    const result1 = await randomPuppy('23rkljr2klj3');
    t.falsy(result1);
    const result2 = await randomPuppy('');
    t.regex(result2, imgurRegEx);
    const result3 = await randomPuppy({});
    t.regex(result3, imgurRegEx);
    const result4 = await randomPuppy(false);
    t.regex(result4, imgurRegEx);
});
