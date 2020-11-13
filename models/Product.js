function createProduct(name, price, desc, thumbnail, submitter) {
    var product = {
        _id: null, 
        name : name,
        price : Number.parseFloat(price),
        desc : desc,
        thumbnail : thumbnail,
        submitter : submitter
    }
    return product;
}

module.exports = { createProduct };