/* eslint camelcase:off */

const Twitter = require('twitter')
const querystring = require('querystring')
const chalk = require('chalk')
const config = require('./config')

const _t = (client, params) =>
  new Promise((resolve, reject) => {
    client.get('search/tweets', params, (error, results) => {
      if (error) {
        return reject(error)
      }

      if (results.length === 0) {
        return resolve([[], null])
      }

      const nextParams = results.search_metadata.next_results
        ? querystring.decode(results.search_metadata.next_results.substr(1))
        : null

      return resolve([results.statuses, nextParams])
    })
  })

const getTweets = async (client, keywords) => {
  let allTweets = []
  let params = {
    q: keywords,
    result_type: 'recent',
    count: 100,
    exclude_replies: true,
    include_rts: true
  }
  while (params) {
    let [tweets, newParams] = await _t(client, params)
    allTweets = allTweets.concat(tweets)
    params = newParams
  }

  return allTweets
}

const pickRandom = (arr, nums = 1) => {
  const numToSelect = Math.min(arr.length, nums)
  const selected = new Set()
  while (selected.size < numToSelect) {
    selected.add(Math.floor(Math.random() * arr.length))
  }

  const results = []
  for (const i of selected) {
    results.push(arr[i])
  }

  return results
}

const printTweets = tweets => {
  tweets.forEach(t => {
    console.log(
      `- @${chalk.bold(chalk.green(t.user.screen_name))}\t` +
        `${chalk.underline(
          `https://twitter.com/${t.user.screen_name}/status/${t.id_str}`
        )}\t` +
        `${chalk.grey(t.text)}`
    )
  })
}

const main = async () => {
  try {
    const keywords = '#oredev'
    const numTweets = 3

    const {
      consumer_key,
      consumer_secret,
      access_token_key,
      access_token_secret
    } = config

    const client = new Twitter({
      consumer_key,
      consumer_secret,
      access_token_key,
      access_token_secret
    })

    console.log(`\n🙋‍♀️  Searching for tweets. Please hold...`)
    const tweets = await getTweets(client, keywords)
    console.log(`👌  Found ${tweets.length} tweets. Sweet!`)

    console.log(`🙀  Extracting ${numTweets} random tweets...\n`)
    printTweets(pickRandom(tweets, numTweets))

    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
