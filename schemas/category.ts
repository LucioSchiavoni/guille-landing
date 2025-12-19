import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'category',
    title: 'Categoría',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rubro',
            title: 'Rubros',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'rubro' }] }],
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
