var _     = require('underscore-node');
var faker = require('faker');

module.exports = {
  people: getPeople()
};

function getPeople() {
  return [
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() }),
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() }),
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() }),
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() }),
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() }),
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() }),
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() }),
    _.extend(faker.helpers.contextualCard(), { likesYou: faker.random.boolean() })
  ];
}
