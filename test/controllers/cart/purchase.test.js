/**
 * Cart/Purchase Test
 *
 * @description :: Testing for Cart/Purchase services
 */

var assert = require('chai').assert;
const supertest = require('supertest');

const products = [
  {
    sku: '123',
    label: 'Ram memmory 8GB',
    quantity: 10,
    price: 45.5,
  },
  {
    sku: '224',
    label: 'I5 CPU',
    quantity: 0,
    price: 99.99
  },
];

describe('CartController', () => {
  beforeEach(async () => {
    Product.destroy({});
    Product.createEach(products);
  });

  describe('#Purchase', () => {
    it('Purchase a single product in stock', async () => {
      const result = supertest(sails.hooks.http.app).post('/cart/purchase');

      assert.fail();
    });
  });
});
