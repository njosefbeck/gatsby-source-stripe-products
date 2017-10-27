const stripePackage = require('stripe');

module.exports = async ({ secretKey }) {
	console.time('Fetch Stripe products data');
	console.log('Starting to fetch products data from Stripe...');
	const stripe = stripePackage(secretKey);
	
	let products;
	try {
		console.log('Fetching initial product list...');
		const initialList = await stripe.products.list();
		console.log('Successfully fetched initial product list.');

		// Paginate through Stripe product results if initial list has more products
		// Add additional products to initial list
		console.log('Checking for additional products not in initial list...');
		let hasMore = initialList.has_more;
		let lastListItemId = (initialList.data[initialList.data.length - 1]).id;

		while (hasMore) {
			let additionalList = await stripe.products.list({ starting_after: lastListItemId });
			initialList.data.push(...additionalList.data);

			lastListItemId = (additionalList.data[additionalList.data.length - 1]).id;
			hasMore = additionalList.has_more;
		}

		// Once while loop ends, no more products are available,
		// so set initial list to has_more = false and add
		// products data to productList variable
		console.log(`Successfully fetched ${initialList.data.length} Stripe products.`)
		initialList.has_more = false;
		products = initialList.data;

	} catch(e) {
		console.log("Fetching your Stripe products failed. Here's the error: ", e);
		process.exit(1);
	}

	return products;
}



