const v = require('vorpal')();
const gameFactory = require('./src/factory').gameFactory;

let game = null;
let interval = null;

let playAction = (args, callback) => {
  // initialize game
  game = gameFactory();


  // add stats command
  v.command('stats').action((args, cb) => {
    v.ui.redraw.clear();
    console.log(game.stats());
    cb();
  });


  // add convert? command
  // add buy? command

  // add save command
  // add load command

  // add quit command
  v.command('quit').action((args, cb) => {
    // tear down game
    clearInterval(interval);
    game = null;

    v.find('stats').remove();
    v.find('quit').remove();
    // remove other stuff

    // add play command
    v.command('play').action(playAction);
    cb();
  });

  // remove play command
  v.find('play').remove();

  // start game by scheduling ticks
  interval = setInterval(game.tick.bind(game), 1000);

  // show stats!
  v.execSync('stats');
  callback();
};


v.command('play')
  .action(playAction);

v.delimiter('idleSystems$')
  .show();