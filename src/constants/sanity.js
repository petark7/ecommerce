import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId: 'z49d3dsl',
	dataset: 'production',
	useCdn: true, // Set to `false` to bypass the edge cache
	apiVersion: '2023-05-03' // Use current date (YYYY-MM-DD) to target the latest API version
	// token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);

export async function fetchProducts() {
	const products = await client.fetch(`*[_type == "product"] {
		_id,
		_createdAt,
		name,
		images,
		price,
		description,
		categories,
		slug
	}`);
	return products;
}
