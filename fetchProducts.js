const stripePackage = require('stripe');
const paginate = require('./paginate');

module.exports = async (secretKey) => {
	const stripe = stripePackage(secretKey);
	
	let products;
	try {
		console.log('Fetching product lists from Stripe...');
		const initialList = await stripe.products.list();

		if (!initialList.data.length) {
			console.log('Your Stripe product list has no products in it. Returning empty array.');
			return products = [];
		}

		products = await paginate(initialList, 'products');
		products = products.map(async (product) => {
			
			if (!product.skus.data.length) {
				return product;
			}

			product.skus = await paginate(product.skus, 'skus');
			return product;
		});

	} catch(e) {
		console.log("Error fetching Stripe products: ", e);
		process.exit(1);
	}

	return await Promise.all(products);
}



