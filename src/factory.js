let faker = require('faker');
let { Map, Set } = require('immutable');
let { addItem, inTheBlack, currencies, add, pouchEffectsLedger, buy } = require('merchant.js');

let HarvesterFactory = (resourceName, quantity) => ({
  type: `${resourceName}-harvester`,
  effect: (state) => Map({ [resourceName]: quantity })
});

let CompoundResourceFactory = (resourceName, subResources) => {
  let costing = Map({});

  // cost of sub resources
  for(let i = 0; i < subResources.length; i++) {
    costing.set(subResources[i], -1 * faker.random.number({min: 1, max: 10}));
  }
  // amount of new resource
  costing.set(resourceName, faker.random.number({min: 1, max: 10}));

  return {
    type: `${resourceName}-compound`,
    cost: (state) => costing
  };
};

let shuffle = (array) => {
  let shuffled = array.slice(0);
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};



class Game {
  constructor() {
    this.state = {
      items: {},
      converters: {},
      wallet: Map({}),
      effects: Map({})
    }
  }

  tick() {
    this.state.wallet = add(this.state.wallet, this.state.effects);
  }

  stats() {
    let resources = currencies(this.state.wallet);
    let stats = {};

    resources.forEach(currency => {
      stats[currency] = this.state.wallet.get(currency);
    });

    return stats;
  }

  buy(item) {
    let walletWithCostsApplied = buy(item, this.state.wallet);
    if (!inTheBlack(walletWithCostsApplied)) {
      return;
    }

    if(typeof this.state.items[item.type] === 'undefined') {
      this.state.items[item.type] = item;
    }

    let wallet = addItem(item, walletWithCostsApplied);
    let effects = pouchEffectsLedger(Object.values(this.state.items), wallet);

    Object.assign(this.state, {
      wallet,
      effects
    });
  }

  convert(conversion) {
    let walletWithCostsApplied = buy(conversion, this.state.wallet);
    if (!inTheBlack(walletWithCostsApplied)) {
      return;
    }

    Object.assign(this.state, {
      wallet
    });
  }

  save() {}
  static load(saveGame) {}
}

module.exports = {
  gameFactory: () => {
    let game = new Game();

    let numResources = faker.random.number({min: 1, max: 3});
    let resourceNames = Set(faker.lorem.words(25).split(' ')).toArray();
    let resources = [];

    for(let i = 0; i < numResources; i++){
      let resource = resourceNames.shift();
      resources.push(resource);
      let qty = faker.random.number({min: 1, max: 10});
      let harvester = HarvesterFactory(resource, qty);
      game.buy(harvester);
    }

    let complexity = 2;
    for(let i = 0; i < complexity; i++) {
      let randomResourceOrder = shuffle(resources);
      let componentCount = fake.random.number({min: 1, max: 2});
      let compoundResource = resourceNames.shift();

      let compound = CompoundResourceFactory(compoundResource, randomResourceOrder.slice(0, componentCount));
      game.state.converters[compound.type]= compound;
    }

    return game;
  }
};