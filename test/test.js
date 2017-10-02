const Spacecraft = require('spacecraft');
const SpacecraftWS = require('../');
const WSEvent = require('../wsevent');
const spacecraft = new Spacecraft();

let ws = new SpacecraftWS();
ws.mount('test', () => {
  console.log('trigger test event');
  return {result: true}
}).mount('test2', () => {
  console.log('trigger test event 2');
  return {result: false}
});

spacecraft
  .mount(ws)
  .run();
