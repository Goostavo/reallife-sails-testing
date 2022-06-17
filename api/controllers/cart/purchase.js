module.exports = {


  friendlyName: 'Purchase',


  description: 'Purchase cart.',


  inputs: {
    cart: {
      type: 'ref' ,
      required: true
    }
  },


  fn: async function (inputs) {

    // All done.
    return {'success': false};
  }

};
