import type { CliOptions } from '@dynatrace/dt-app';

const config: CliOptions = {
  environmentUrl: 'https://guu84124.apps.dynatrace.com/',
  app: {
    name: 'Biz Event Impact',
    version: '0.1.2',
    description: 'A starting project with routing, fetching Grail™ data, and charting',
    id: 'dtse.noramnn.biz.event.impact',
    scopes:[
    {name: 'storage:metrics:read', comment: 'default template'}, 
    {name: 'storage:bizevents:read', comment: 'Read bizevents from Grail'},
    {name: 'storage:buckets:read', comment: 'Read buckets from Grail'}]
  },
  icon: '<Your-Icon-Path>',
};

module.exports = config;