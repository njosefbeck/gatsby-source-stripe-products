# gatsby-source-stripe-products

Source plugin for pulling in products data from Stripe. Autopaginates so you should get all of your products and their SKUs. The fields that are returned are the same as found in the [Stripe Product API](https://stripe.com/docs/api#product_object).

## Install

`npm install gatsby-source-contentful`

or

`yarn add gatsby-source-contentful`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-stripe-products`,
    options: {
      secretKey: 'stripe_secret_key_here'
    }
  }
]
```

## How to query

You can query all of your Stripe products like the following:

```graphql
{
  allStripeProduct {
    edges {
      node {
        id,
        active,
        attributes,
        skus {
          id
        }
      }
    }
  }
}
```

You can also query for a specific product like this:

```graphql
{
  StripeProduct(id: { eq: "product_id_here" }) {
    id,
    name
  }
}
```