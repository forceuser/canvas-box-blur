# {{package.name}}

[![npm repository](https://img.shields.io/npm/v/{{package.name}}.svg)](https://www.npmjs.com/package/{{package.name}})
[![Build Status](https://travis-ci.org/{{repository.owner}}/{{repository.name}}.svg?branch=master)](https://travis-ci.org/{{repository.owner}}/{{repository.name}})
[![Coverage Status](https://img.shields.io/codecov/c/github/{{repository.owner}}/{{repository.name}}/master.svg)](https://codecov.io/gh/{{repository.owner}}/{{repository.name}})
[![Known Vulnerabilities](https://snyk.io/test/github/{{repository.owner}}/{{repository.name}}/badge.svg)](https://snyk.io/test/github/{{repository.owner}}/{{repository.name}})

{{package.description}}

## Installation

#### Install as npm package

```shell
npm i {{package.name}} --save
```

#### Or simply download \*.js file

[{{package.name}}.js@{{version}}](https://github.com/{{repository.owner}}/{{repository.name}}/releases/download/{{version}}/{{package.name}}.js)

[{{package.name}}.modern.js@{{version}}](https://github.com/{{repository.owner}}/{{repository.name}}/releases/download/{{version}}/{{package.name}}.modern.js) *for modern browsers only (see [.browserlistrc](https://github.com/{{repository.owner}}/{{repository.name}}/blob/master/.browserslistrc))*

#### Or just load from CDN

```html
<script src="//cdn.jsdelivr.net/npm/{{package.name}}@{{version}}/dist/{{package.name}}.js" integrity="{{#ssri}}../dist/{{package.name}}.js{{/ssri}}" crossorigin="anonymous">
</script>
```

*if you need only modern browsers then use script below:*

```html
<script src="//cdn.jsdelivr.net/npm/{{package.name}}@{{version}}/dist/{{package.name}}.modern.js" integrity="{{#ssri}}../dist/{{package.name}}.modern.js{{/ssri}}" crossorigin="anonymous">
</script>
```

And then use **{{package["va-release"].library}}** as global variable
```html
<script>
	console.log({{package["va-release"].library}});
</script>
```
