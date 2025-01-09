const serviceModel = require("../models/service.model");


module.exports.createService = async ({
    provider,
    serviceType,
    price,
    description
}) => {
    if (!provider || !serviceType || !price) {
        throw new Error('Missing required fields! please fill all fields');
    }
   const service = await serviceModel.create({
        provider,
        serviceType,
        price,
        description
    })
    return service
}