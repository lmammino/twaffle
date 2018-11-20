# Twaffle

```
 _                  __  __ _
| |                / _|/ _| |
| |___      ____ _| |_| |_| | ___
| __\ \ /\ / / _' |  _|  _| |/ _ \
| |_ \ V  V / (_| | | | | | |  __/
 \__| \_/\_/ \__,_|_| |_| |_|\___|
```

A TWitter rAFFLE script.

[![CircleCI](https://circleci.com/gh/lmammino/twaffle.svg?style=shield)](https://circleci.com/gh/lmammino/twaffle) [![npm version](https://badge.fury.io/js/twaffle.svg)](http://badge.fury.io/js/twaffle)

Twaffle allows you to extract random tweets for a set of keywords. It's ideal to do raffles over tweeter: get some people to tweet some specific keywords and then extract an arbitrary number of random winners!

## Install

```bash
npm install --global twaffle
```

Or you can use it with `npx` (see [usage](#usage)), so in such case you don't have to install it at all.

Finally, you can also use the [compiled binaries](https://github.com/lmammino/twaffle/releases) distributed for the major operative systems.

## Usage

To use Twaffle you would need to access to the [Twitter developer platform](https://developer.twitter.com) and have obtained keys for an app.

Once you got your keys, make sure that they are exported as environment variables in the local shell:

```bash
export TWITTER_CONSUMER_KEY="..."
export TWITTER_CONSUMER_SECRET="..."
export TWITTER_ACCESS_TOKEN_KEY="..."
export TWITTER_ACCESS_TOKEN_SECRET="..."
```

**Note**: Twitter keys can also be passed as arguments, see `twaffle --help` for more details.

At this point you can run twaffle as in the following example:

```bash
twaffle --keywords '#oredev again' --winners=3
```

this will extract `3` random tweets that have the keywords `#oredev` and `again`.

If you didn't install twaffle and you have a recent version of NPM you can simply run twaffle through `npx`:

```bash
npx twaffle --keywords '#oredev again' --winners=3
```

## Bugs and improvements

If you find a bug or have an idea about how to improve Twaffle you can [open an issue](https://github.com/lmammino/twaffle/issues) or [submit a pull request](https://github.com/lmammino/twaffle/pulls), it will definitely make you a better person! 😇

## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
