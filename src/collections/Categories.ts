import { CollectionConfig } from 'payload'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Kategori Adı',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly versiyon (örn: teknoloji)',
      },
    },
    {
      name: 'description',
      label: 'Açıklama',
      type: 'textarea',
      admin: {
        description: 'Kategori hakkında kısa açıklama',
      },
    },
    {
      name: 'color',
      label: 'Renk',
      type: 'text',
      admin: {
        description: 'Kategori rengi (hex kod: #FF5733)',
      },
    },
    {
      name: 'image',
      label: 'Kategori Görseli',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Eğer slug yoksa name'den otomatik oluştur
        if (!data.slug && data.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}

export default Categories
