const crypto = require('crypto');
const fetchProducts = require('./fetchProducts');

exports.sourceNodes = async (
  { boundActionCreators, getNode, hasNodeChanged },
  pluginOptions,
  done
) => {

  const { createNode } = boundActionCreators;

  if (!pluginOptions.secretKey) {
    console.error('Plugin needs your Stripe secret key. Add this in gatsby-config.js.');
    done();
    return;
  }

  // Ensure local data is synced with its source and is 100% accurate.
  const products = await fetchProducts(pluginOptions.secretKey);
  
  // Create nodes with accurate media types, human meaningful types,
  // and accurate contentDigests
  if (!products.length) {
    console.error("There are no Stripe products to source!");
    done();
    return;
  }

  console.log("\nStripe products successfully fetched. Creating nodes...");

  products.forEach(product => {
    let node = {
      id: product.id,
      object: product.object,
      active: product.active,
      attributes: product.attributes,
      caption: product.caption,
      created: product.created,
      deactivate_on: product.deactivate_on,
      description: product.description,
      images: product.images,
      livemode: product.livemode,
      metadata: product.metadata,
      name: product.name,
      package_dimensions: product.package_dimensions,
      shippable: product.shippable,
      skus: product.skus,
      updated: product.updated,
      url: product.url,
      parent: null,
      children: [],
      internal: {
        type: `StripeProduct`,
        content: JSON.stringify(product),
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(product))
          .digest(`hex`),
      }
    };

    createNode(node);
  });

  // Return either a promise or use the callback to report
  // back to Gatsby when you're done sourcing nodes.
  console.log(`${products.length} Stripe product nodes created`);
  done();
}
