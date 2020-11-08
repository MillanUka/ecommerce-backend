function createProduct(name, price, desc) {
    var product = {
        _id: null, 
        name : name,
        price : Number.parseFloat(price),
        desc : desc
    }
    return product;
}

module.exports = { createProduct };