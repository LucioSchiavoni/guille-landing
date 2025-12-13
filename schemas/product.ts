import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Producto',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subcategory',
            title: 'Subcategoría',
            type: 'reference',
            to: [{ type: 'subcategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Galería de Imágenes',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'price',
            title: 'Precio',
            type: 'number',
        }),
        defineField({
            name: 'order',
            title: 'Orden',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'active',
            title: 'Activo',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'oferta',
            title: 'En Oferta',
            type: 'boolean',
            initialValue: false,
            description: 'Marcar si el producto está en oferta',
        }),
        defineField({
            name: 'descuento',
            title: 'Porcentaje de Descuento',
            type: 'number',
            description: 'Porcentaje de descuento (ej: 20 para 20%)',
            validation: (Rule) => Rule.min(0).max(100),
        }),
    ],
})
