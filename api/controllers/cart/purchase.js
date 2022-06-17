

module.exports = {


  friendlyName: 'Purchase',


  description: 'Purchase cart.',


  inputs: {
    cart: {
      type: 'ref' ,
      required: true
    }
  },


  fn: async function ({cart}) {
    const uniqueSkuList = cart.map(item => {
      return item.sku;
    });

    let products = await Product.find({sku: uniqueSkuList});
    products = _keyBy(products, 'sku');

    let totalPrice = 0;
    let purchased = [];
    for (const item of cart) {
      // Check if there is available stock.
      if (products[item.sku].quantity < item.quantity) {
        return {
          success: false,
          totalPrice: 0,
          purchased: [],
          missingItems: [{
            sku: item.sku,
            quantity: item.quantity
          }]
        };
      }

      totalPrice += item.quantity * products[item.sku].price;
      purchased.push({sku: item.sku, quantity: item.quantity});
    }

    for (const item of purchased) {
      const newQuantity = products[item.sku].quantity - item.quantity;
      await Product.update({sku: item.sku}).set({quantity: newQuantity});
    }

    // All done.
    return {
      success: true,
      totalPrice: totalPrice,
      purchased: purchased,
      missingItems: []
    };
  }

};

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_keyBy
function _keyBy(array, key) {
  return (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});
}
