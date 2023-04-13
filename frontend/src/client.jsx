import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-4-13',
  useCdn: true,
  token: process.env.VITE_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);