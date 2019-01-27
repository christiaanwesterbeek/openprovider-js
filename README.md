# OpenProvider CLI and API for Node.js
![Code Climate](https://img.shields.io/codeclimate/github/christiaanwesterbeek/openprovider-js.svg) ![Dependencies](https://img.shields.io/david/christiaanwesterbeek/openprovider-js.svg)
[![Js Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![Version](https://img.shields.io/npm/v/openprovider.svg) ![License](https://img.shields.io/npm/l/openprovider.svg)

Forked from the archived repo https://github.com/timneutkens/openprovider-js .
This fork adds CLI support through yarn/npm run scripts. See CLI Usage.

## Setup

First install:  `yarn add @devotis/openprovider`

Then in your app's `package.json` file add a `op` command in the `scripts` section.

```
{
  ...
  "scripts": {
    "op": "node ./node_modules/@devotis/openprovider/run"
  },
  ...
}
```

Finally add a `.env` file similar to `.env.example` and enter username, password and/or hash.

## Usage

### CLI Usage

`yarn op searchDomainRequest --domainNamePattern %mydomain%`

`yarn op modifyDomainRequest --isPrivateWhoisEnabled 1 --domain.name mydomain --domain.extension com`

This is following the pattern:
`yarn op <api command> --arg1 <arg1_value> --arg2 <arg2_value> --argn <argn_value>`

For all available api commands, see: https://doc.openprovider.eu/index.php/Main_Page

### Usage in code

[Example request code here (examples/example.js)](examples/example.js)

## FAQ

### I get Error: Authentication/Authorization Failed (196)
Create a `.env` file similar to `.env.example` and enter username, password and/or hash.
