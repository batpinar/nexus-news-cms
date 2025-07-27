import { CollectionConfig } from 'payload'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'author', 'category', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Başlık',
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
        description: 'URL-friendly versiyon (örn: haberimin-basligi)',
      },
    },
    {
      name: 'author',
      label: 'Yazar',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'content',
      label: 'İçerik',
      type: 'richText',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Özet',
      type: 'textarea',
      admin: {
        description: 'Kısa açıklama/özet (liste sayfalarında gösterilir)',
      },
    },
    {
      name: 'featuredImage',
      label: 'Öne Çıkan Görsel',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'status',
      label: 'Durum',
      type: 'select',
      defaultValue: 'draft',
      options: [
        {
          label: 'Taslak',
          value: 'draft',
        },
        {
          label: 'Yayında',
          value: 'published',
        },
        {
          label: 'Arşiv',
          value: 'archived',
        },
      ],
    },
    {
      name: 'publishedDate',
      label: 'Yayın Tarihi',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'tags',
      label: 'Etiketler',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Virgülle ayırarak etiket ekleyin',
      },
    },
    {
      name: 'meta',
      label: 'SEO Meta Bilgileri',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Meta Başlık',
          type: 'text',
          admin: {
            description: 'Arama motorları için özel başlık (boşsa normal başlık kullanılır)',
          },
        },
        {
          name: 'description',
          label: 'Meta Açıklama',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Arama sonuçlarında gösterilecek açıklama (max 160 karakter)',
          },
        },
        {
          name: 'keywords',
          label: 'Anahtar Kelimeler',
          type: 'text',
          admin: {
            description: 'Virgülle ayırarak anahtar kelimeler ekleyin',
          },
        },
        {
          name: 'ogImage',
          label: 'Sosyal Medya Görseli',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description: 'Facebook, Twitter vb. paylaşımlar için görsel',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Eğer slug yoksa title'dan otomatik oluştur
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}

export default Posts
