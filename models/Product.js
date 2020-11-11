function createProduct(name, price, desc, thumbnail) {
    var product = {
        _id: null, 
        name : name,
        price : Number.parseFloat(price),
        desc : desc,
        thumbnail : thumbnail
    }
    return product;
}

module.exports = { createProduct };