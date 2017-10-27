module.exports = async (list, listType) => {
  let hasMore = list.has_more;
  let lastListItemId = (list.data[list.data.length - 1]).id;

  if (!hasMore) {
    return list.data;
  }

  while (hasMore) {
    let additionalList = await stripe[listType].list({ starting_after: lastListItemId });
    list.data.push(...additionalList.data);

    lastListItemId = (additionalList.data[additionalList.data.length - 1]).id;
    hasMore = additionalList.has_more;
  }

  console.log(`Successfully fetched ${initialList.data.length} Stripe products.`);
  return list.data;
};