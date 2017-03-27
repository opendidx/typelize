#!/usr/bin/env node

'use strict';

const woofwoof = require('woofwoof');
var chalk = require('chalk');
var figlet = require('figlet');
var fs = require('fs');

const cli = woofwoof(`
    Usage
    $ jsongoose <input>

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

console.log(chalk.yellow(figlet.textSync('jsongoose!', {horizontalLayout: 'full'})));

function hello(input, flags) {
    const target_path = input;
    console.log('target_path', target_path);
    fs.readFile(target_path, (err, file)=>{
        let read_file = JSON.parse(file);
        console.log(read_file._id)
    })
}

hello(cli.input[0], cli.flags);