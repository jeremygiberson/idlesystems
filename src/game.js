let { add } = require('merchant.js');
let { Map } = require('immutable');
let faker = require('faker');

for(let i =0; i < 100;i++) {
  console.log(faker.lorem.word())
}

class Resource {
  constructor(currency, rate) {
    this.currency = currency;
    this.rate = rate;
  }

  tick(wallet) {
    let ledger = Map({[this.currency]: this.rate});
    return add(wallet, ledger);
  }
}

class Guage {
  constructor(currency) {
    this.currency = currency;
  }
}

class Game {
  constructor() {
    this.state = {
      wallet: Map({})
    };
  }

  tick() {

  }
}