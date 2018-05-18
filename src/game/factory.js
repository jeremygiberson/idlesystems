let faker = require('faker');
let { Map, Set } = require('immutable');
let { addItem, inTheBlack, currencies, add, pouchEffectsLedger, buy } = require('merchant.js');

let ItemFactory = (name, currency, baseCost, costRate, exchangeCurrency, productionBase) => {
  return {
    type: name,
    cost: (state) => {
      let owned = state.wallet.get(name);
      return Map({ [currency]: - (baseCost * Math.pow(costRate, owned)) });
    },
    effect: (state) => {
      let owned = state.wallet.get(name);
      return Map({ [exchangeCurrency]: productionBase * owned });
    }
  };
};

let ClickGeneratorFactory = (name, currency, productionBase) => {
  return {
    type: name,
    cost: (state) => {
      let level = state[name + '_level'] || 1;
      return Map({ [currency]: Math.floor(productionBase * level) });
    }
  };
};

let AutoGeneratorFactory = (name, currency, baseCost, costRate, exchangeCurrency, productionBase) => {
  return {
    type: name,
    cost: (state) => {
      let owned = state.wallet.get(name);
      return Map({ [currency]: - Math.ceil(baseCost * Math.pow(costRate, owned)) });
    },
    effect: (state) => {
      let owned = state.wallet.get(name);
      return Map({ [exchangeCurrency]: Math.floor(productionBase * owned) });
    }
  };
};



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
    this.primaryCurrency = 'GOLD';
    this.pouch = {};
    this.state = {
      wallet: Map({}),
      effects: Map({})
    }
  }

  setPrimaryCurrency(currency) {
    this.primaryCurrency = currency;
    this.state.wallet = add(this.state.wallet, Map({[currency]: 0}));
  }
  getPrimaryCurrencyName() {
    return this.primaryCurrency;
  }
  getPrimaryCurrencyValue(){
    return this.state.wallet.get(this.primaryCurrency);
  }

  addItem(item){
    this.pouch[item.type] = item;
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

    let wallet = addItem(item, walletWithCostsApplied);
    let effects = pouchEffectsLedger(Object.values(this.state.pouch), wallet);

    Object.assign(this.state, {
      wallet,
      effects
    });
  }
}

module.exports = {
  gameFactory: () => {
    let game = new Game();
    let currencyNames = Set(faker.lorem.words(25).split(' ')).toArray();
    let currencies = [];
    let primaryCurrency = currencyNames.pop();

    game.setPrimaryCurrency(primaryCurrency);

    let clickExchange = ClickGeneratorFactory(currencyNames.pop(), primaryCurrency, faker.random.number({min:1, max:5})/2);

    game.addItem(clickExchange);

    let autoExchange = AutoGeneratorFactory(currencyNames.pop(), primaryCurrency,
      3 + (faker.random.number({min: 1, max: 99})/100),
      1 + (faker.random.number({min: 1, max: 99})/100),
      primaryCurrency,
      5 + (faker.random.number({min: 1, max: 99})/100),
      );
  /*
    let numCurrencies = faker.random.number({min: 1, max: 3});

    for(let i = 0; i < numCurrencies; i++){
      let currency = currencyNames.shift();
      currencies.push(currency);
      let qty = faker.random.number({min: 1, max: 10});
      let harvester = HarvesterFactory(currency, qty);
      // game.buy(harvester);
    }

    let complexity = 2;
    for(let i = 0; i < complexity; i++) {
      let randomResourceOrder = shuffle(currencies);
      let componentCount = faker.random.number({min: 1, max: 2});
      let compoundResource = currencyNames.shift();

      let compound = CompoundResourceFactory(compoundResource, randomResourceOrder.slice(0, componentCount));
      // game.state.converters[compound.type]= compound;
    }
    */

    return game;
  }
};