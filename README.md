# Mozaïk travis widgets

[![Travis CI](https://img.shields.io/travis/plouc/mozaik-ext-travis.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-travis)
[![NPM version](https://img.shields.io/npm/v/mozaik-ext-travis.svg?style=flat-square)](https://www.npmjs.com/package/mozaik-ext-travis)


## Travis Repository

![travis repository](https://raw.githubusercontent.com/plouc/mozaik-ext-travis/master/preview/travis.repository.png)

> Display travis repo infos

### parameters

key          | required | description
-------------|----------|---------------
`owner`      | yes      | *repo owner*
`repository` | yes      | *repo name*

### usage

```javascript
{
  type: 'travis.repository',
  owner: 'plouc', repository: 'mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Travis Build history

![travis build history](https://raw.githubusercontent.com/plouc/mozaik-ext-travis/master/preview/travis.build_history.png)

> Display travis repo build history

### parameters

key          | required | description
-------------|----------|---------------
`owner`      | yes      | *repo owner*
`repository` | yes      | *repo name*

### usage

```javascript
{
  type: 'travis.build_history',
  owner: 'plouc', repository: 'mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Travis Build histogram

![travis build histogram](https://raw.githubusercontent.com/plouc/mozaik-ext-travis/master/preview/travis.build_histogram.png)

> Display travis repo build histogram (duration / build number / status)

### parameters

key          | required | description
-------------|----------|---------------
`owner`      | yes      | *repo owner*
`repository` | yes      | *repo name*

### usage

```javascript
{
  type: 'travis.build_histogram',
  owner: 'plouc', repository: 'mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```
