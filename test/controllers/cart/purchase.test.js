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
    await Product.destroy({});
    await Product.createEach(products);
  });

  describe('#Purchase', () => {
    it('Purchase a single product in stock', async () => {
      // Fixtures
      const cart = {
        cart: [
          {
            sku: '123',
            quantity: 4
          }
        ]
      };

      // Expected Result
      const expectedResult = {
        success: true,
        totalPrice: 182,
        purchased: [
          {
            sku: '123',
            quantity: 4
          }
        ],
        missingItems: []
      };

      // Run test
      const result = await await supertest(sails.hooks.http.app).post('/cart/purchase').send(cart);

      // Assert Results
      assert.deepEqual(result.body, expectedResult);

      let productStock = await Product.findOne({sku: '123'});
      assert.equal(productStock.quantity, 6);
    });

    it('Purchase a single out of stock product', async () => {
      // Fixtures
      const cart = {
        cart: [
          {
            sku: '224',
            quantity: 1
          }
        ]
      };

      // Expected Result
      const expectedResult = {
        success: false,
        totalPrice: 0,
        purchased: [],
        missingItems: [
          {
            sku: '224',
            quantity: 1
          }
        ]
      };

      // Run test
      const result = await await supertest(sails.hooks.http.app).post('/cart/purchase').send(cart);

      // Assert Results
      assert.deepEqual(result.body, expectedResult);
    });
  });
});
