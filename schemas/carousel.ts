import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'carousel',
    title: 'Carousel',
    type: 'document',
    fields: [
        defineField({
            name: 'nombre',
            title: 'Nombre del Carousel',
            type: 'string',
            description: 'Nombre identificador del carousel (ej: "Carousel Principal")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'slide',
                    title: 'Slide',
                    fields: [
                        defineField({
                            name: 'imagenDesktop',
                            title: 'Imagen Desktop',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'imagenMobile',
                            title: 'Imagen Mobile',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'titulo',
                            title: 'Título',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitulo',
                            title: 'Subtítulo',
                            type: 'string',
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                            description: 'URL a donde redirige el slide al hacer click',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'titulo',
                            subtitle: 'subtitulo',
                            media: 'imagenDesktop',
                        },
                        prepare({ title, subtitle, media }) {
                            return {
                                title: title || 'Sin título',
                                subtitle: subtitle || 'Sin subtítulo',
                                media,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'activo',
            title: 'Activo',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'nombre',
            slides: 'slides',
        },
        prepare({ title, slides }) {
            return {
                title: title || 'Carousel',
                subtitle: `${slides?.length || 0} slides`,
            }
        },
    },
})
