import type { NextConfig } from "next";
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    try {
      // Fetch all categories and subcategories to create redirects
      const categoriesQuery = `*[_type == "category" && active == true] { _id, "slug": slug.current }`;
      const subcategoriesQuery = `*[_type == "subcategory" && active == true] { _id, "slug": slug.current }`;

      const [categories, subcategories] = await Promise.all([
        client.fetch<Array<{ _id: string; slug: string }>>(categoriesQuery),
        client.fetch<Array<{ _id: string; slug: string }>>(subcategoriesQuery),
      ]);

      const categoryRedirects = categories.map((cat) => ({
        source: '/productos',
        has: [
          {
            type: 'query' as const,
            key: 'categoria',
            value: cat._id,
          },
        ],
        destination: `/categoria/${cat.slug}`,
        permanent: true,
      }));

      const subcategoryRedirects = subcategories.map((sub) => ({
        source: '/productos',
        has: [
          {
            type: 'query' as const,
            key: 'subcategoria',
            value: sub._id,
          },
        ],
        destination: `/subcategoria/${sub.slug}`,
        permanent: true,
      }));

      return [...categoryRedirects, ...subcategoryRedirects];
    } catch (error) {
      console.error('Error fetching redirects:', error);
      return [];
    }
  },
};

export default nextConfig;
