import type { CliOptions } from '@dynatrace/dt-app';

const config: CliOptions = {
  environmentUrl: 'https://bwm98081.apps.dynatrace.com/',
  app: {
    name: 'Biz Event Impact',
    version: '0.0.0',
    description: 'A starting project with routing, fetching Grail™ data, and charting',
    id: 'my.biz.event.impact',
    scopes: [{ name: 'storage:metrics:read', comment: 'default template' }]
  },
};

module.exports = config;