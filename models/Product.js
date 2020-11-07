function createProduct(id, name, price, desc) {
    var product = {
        id : id, 
        name : name,
        price : price,
        desc : desc
    }
    return product;
}

module.exports = { createProduct };