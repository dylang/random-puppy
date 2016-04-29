import test from 'ava';
import {Observable} from 'rx-lite';
import randomPuppy from './';

const imgurRegEx = /^https?:\/\/(\w+\.)?imgur.com\/[a-zA-Z0-9]+(\.[a-zA-Z]{3})?(#[a-zA-Z]*)?$/;

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

test('all', t => {
    t.plan(10);
    const puppyEmitter = randomPuppy.all('puppies');
    const robotEmitter = randomPuppy.all('robots');

    const puppySource = Observable.fromEvent(puppyEmitter, 'data');
    const robotSource = Observable.fromEvent(robotEmitter, 'data');

    const sharedSource = Observable
        .merge(puppySource, robotSource)
        .take(10);

    sharedSource.subscribe(data => {
        t.regex(data, imgurRegEx);
        // console.log(data);
    });
    return sharedSource.toPromise();
});
