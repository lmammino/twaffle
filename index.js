#!/usr/bin/env node

/* eslint camelcase:off */

const Twitter = require('twitter')
const chalk = require('chalk')
const yargs = require('yargs')
const banner = require('./banner')
const { getTweets, pickRandom, printTweets } = require('./lib')

// print the lovely tool banner
console.log(chalk.magenta(banner.ascii))
console.log(chalk.grey(banner.subtitle))

const args = yargs
  .usage('$0 [options]')
  .option('consumer-key', {
    alias: 'ck',
    describe:
      'Your twitter API consumer key (can be specified also throung environment variable TWITTER_CONSUMER_KEY)',
    default: process.env.TWITTER_CONSUMER_KEY
  })
  .option('consumer-secret', {
    alias: 'cs',
    describe:
      'Your twitter API consumer secret (can be specified also throung environment variable TWITTER_CONSUMER_SECRET)',
    default: process.env.TWITTER_CONSUMER_SECRET
  })
  .option('access-token-key', {
    alias: 'atk',
    describe:
      'Your twitter API access token key (can be specified also throung environment variable TWITTER_ACCESS_TOKEN_KEY)',
    default: process.env.TWITTER_ACCESS_TOKEN_KEY
  })
  .option('access-token-secret', {
    alias: 'ats',
    describe:
      'Your twitter API access token secret (can be specified also throung environment variable TWITTER_ACCESS_TOKEN_SECRET)',
    default: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })
  .option('keywords', {
    alias: 'k',
    describe: 'The keywords to use to search for tweets',
    default: '#twaffle'
  })
  .option('winners', {
    alias: 'w',
    describe: 'The number of winners',
    default: 1
  })
  .demandOption(
    [
      'consumer-key',
      'consumer-secret',
      'access-token-key',
      'access-token-secret'
    ],
    'Please provide all mandatory arguments to work with this tool'
  ).argv

const main = async () => {
  try {
    const keywords = args.keywords
    const numTweets = args.winners

    const {
      consumerKey,
      consumerSecret,
      accessTokenKey,
      accessTokenSecret
    } = args

    const client = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret
    })

    console.log(
      `\n🙋‍♀️  Searching for tweets with "${chalk.green(
        keywords
      )}". Please hold...`
    )
    const tweets = await getTweets(client, keywords)
    console.log(`👌  Found ${tweets.length} tweets. Sweet!`)

    console.log(`🙀  Extracting ${chalk.green(numTweets)} random tweets...\n`)
    printTweets(pickRandom(tweets, numTweets))

    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
