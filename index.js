#!/usr/bin/env node

'use strict';

const woofwoof = require('woofwoof');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const read = require('./read');
const cli = woofwoof(`
    Usage
    $ typelize <input>

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


function hello(input, flags) {
    const target_path = input;
    read(input, (err, ok)=>{
        if(err){
            console.log(chalk.red('typelize failed, report this issue at: https://github.com/opendidx/typelize/issues . Thank you so much!'))
        }
        if(ok){
            console.log(`${chalk.green('new file ./typelize-result.json is created')}`)
            console.logfiglet.textSync('typelize done!', {horizontalLayout: 'full'});
        }
    })
}

hello(cli.input[0], cli.flags);