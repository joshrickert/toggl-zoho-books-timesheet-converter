#!/usr/bin/env node
'use strict';

const moment = require('moment');
const csv = require('fast-csv');

const inputFile = process.argv[2];

function reformatTime(val) {
  return moment(val, 'HH:mm:ss').format('HH:mm');
}

csv
  .fromPath(inputFile, { headers: true })
  .transform(row => {
    row.Billable = 'Yes' === row.Billable ? 'Billable' : 'Non Billable';
    row['Start time'] = reformatTime(row['Start time']);
    row['End time'] = reformatTime(row['End time']);
    row.Duration = reformatTime(row.Duration);
    return row;
  })
  .pipe(csv.createWriteStream({headers: true}))
  .pipe(process.stdout);