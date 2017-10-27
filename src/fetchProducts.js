const stripePackage = require('stripe');

async function fetchProducts(secretKey) {
	const stripe = stripePackage(secretKey);
	
	let productList;
	try {
		const initialList = await stripe.products.list({ limit: 1 });

		let additionalLists = [];
		let hasMore = initialList.has_more;

		/*
		while (hasMore) {

		}
		*/

	} catch(e) {
		console.error(e);
	}

	console.log('productList: ', productList);
	console.log('productList has more: ', productList.has_more);
}

fetchProducts("sk_test_dMdNxzvk7hDai1qugSdddXx6")
	.then(() => console.log("I'm done running fetchProducts!"))
	.catch(err => console.error(err));

