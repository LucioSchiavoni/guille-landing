import { createClient } from '@sanity/client';
import productosData from '../data/productos-data.json' with { type: 'json' };
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('ERROR: Faltan variables de entorno');
  console.error('Verifica que .env.local contenga:');
  console.error('- NEXT_PUBLIC_SANITY_PROJECT_ID');
  console.error('- NEXT_PUBLIC_SANITY_DATASET');
  console.error('- SANITY_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .trim();
}

interface ProductoData {
  categoria: string;
  material: string;
  subcategoria: string;
  productos: string[];
}

async function importData() {
  console.log('Iniciando importación a Sanity...\n');

  const categoriasMap = new Map<string, string>();
  const subcategoriasMap = new Map<string, string>();
  let productosCreados = 0;

  for (const item of productosData as ProductoData[]) {
    const catSlug = createSlug(item.categoria);
    const catId = `category-${catSlug}`;

    if (!categoriasMap.has(item.categoria)) {
      try {
        await client.createOrReplace({
          _type: 'category',
          _id: catId,
          name: item.categoria,
          slug: { _type: 'slug', current: catSlug },
          active: true,
          order: 0,
        });
        categoriasMap.set(item.categoria, catId);
        console.log(`OK - Categoría: ${item.categoria}`);
      } catch (error: any) {
        console.error(`ERROR creando categoría ${item.categoria}:`, error.message);
      }
    }

    const subKey = `${item.material}-${item.subcategoria}`;
    const subSlug = createSlug(subKey);
    const subId = `subcategory-${subSlug}`;

    if (!subcategoriasMap.has(subKey)) {
      try {
        await client.createOrReplace({
          _type: 'subcategory',
          _id: subId,
          name: item.subcategoria,
          material: item.material,
          slug: { _type: 'slug', current: subSlug },
          category: { _type: 'reference', _ref: catId },
          active: true,
          order: 0,
        });
        subcategoriasMap.set(subKey, subId);
        console.log(`  OK - Subcategoría: ${item.material} - ${item.subcategoria}`);
      } catch (error: any) {
        console.error(`  ERROR creando subcategoría:`, error.message);
      }
    }

    for (const producto of item.productos) {
      const prodSlug = createSlug(`${item.categoria}-${subKey}-${producto}`);
      const prodId = `product-${prodSlug}`;

      try {
        await client.createOrReplace({
          _type: 'product',
          _id: prodId,
          name: producto,
          slug: { _type: 'slug', current: prodSlug },
          category: { _type: 'reference', _ref: catId },
          subcategory: { _type: 'reference', _ref: subId },
          active: true,
          order: 0,
        });
        productosCreados++;
      } catch (error: any) {
        console.error(`    ERROR creando producto ${producto}:`, error.message);
      }
    }
  }

  console.log('\nImportación completada');
  console.log(`Resumen:`);
  console.log(`   - ${categoriasMap.size} categorías`);
  console.log(`   - ${subcategoriasMap.size} subcategorías`);
  console.log(`   - ${productosCreados} productos`);
}

importData().catch(console.error);