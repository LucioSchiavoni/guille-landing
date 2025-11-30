import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'subcategory',
    title: 'Subcategoría',
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
            name: 'category',
            title: 'Categoría',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
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
    ],
})
