#!/usr/bin/env node

'use strict';

const woofwoof = require('woofwoof');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const read = require('./read');
const cli = woofwoof(`
    Usage
    $ typify <input>

    Options
    --name, -n  Who should I greet

`, {
    alias: {
        n: 'name'
    },
    default: {
        name: "World!"
    }
});

console.log(chalk.yellow(figlet.textSync('typify done!', {horizontalLayout: 'full'})));

function hello(input, flags) {
    const target_path = input;
    console.log('target_path', target_path);
    read(input);
}

hello(cli.input[0], cli.flags);