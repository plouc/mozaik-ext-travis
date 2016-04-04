# Mozaïk travis widgets

[![License][license-image]][license-url]
[![Travis CI][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies][gemnasium-image]][gemnasium-url]
[![Coverage Status][coveralls-image]][coveralls-url]
![widget count][widget-count-image]


## Demo

You can see a live demo of the widgets [here](http://mozaik-travis.herokuapp.com/)

## Widgets

### Travis Repository

![travis repository](https://raw.githubusercontent.com/plouc/mozaik-ext-travis/master/preview/travis.repository.png)

> Display travis repo infos

#### parameters

key          | required | description
-------------|----------|---------------
`owner`      | yes      | *repo owner*
`repository` | yes      | *repo name*

#### usage

```javascript
{
  type: 'travis.repository',
  owner: 'plouc', repository: 'mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```



### Travis Build history

![travis build history](https://raw.githubusercontent.com/plouc/mozaik-ext-travis/master/preview/travis.build_history.png)

> Display travis repo build history

#### parameters

key          | required | description
-------------|----------|---------------
`owner`      | yes      | *repo owner*
`repository` | yes      | *repo name*

#### usage

```javascript
{
  type: 'travis.build_history',
  owner: 'plouc', repository: 'mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```



### Travis Build histogram

![travis build histogram](https://raw.githubusercontent.com/plouc/mozaik-ext-travis/master/preview/travis.build_histogram.png)

> Display travis repo build histogram (duration / build number / status)

#### parameters

key          | required | description
-------------|----------|---------------
`owner`      | yes      | *repo owner*
`repository` | yes      | *repo name*

#### usage

```javascript
{
  type: 'travis.build_histogram',
  owner: 'plouc', repository: 'mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```


[license-image]: https://img.shields.io/github/license/plouc/mozaik-ext-travis.svg?style=flat-square
[license-url]: https://github.com/plouc/mozaik-ext-travis/blob/master/LICENSE.md
[travis-image]: https://img.shields.io/travis/plouc/mozaik-ext-travis.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik-ext-travis
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-travis.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-travis
[gemnasium-image]: https://img.shields.io/gemnasium/plouc/mozaik-ext-travis.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/plouc/mozaik-ext-travis
[coveralls-image]: https://img.shields.io/coveralls/plouc/mozaik-ext-travis/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/plouc/mozaik-ext-travis?branch=master
[widget-count-image]: https://img.shields.io/badge/widgets-x3-green.svg?style=flat-square