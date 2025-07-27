import { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Site Adı',
      type: 'text',
      required: true,
      defaultValue: 'Nexus News',
    },
    {
      name: 'siteDescription',
      label: 'Site Açıklaması',
      type: 'textarea',
      required: true,
      defaultValue: 'Güncel haberler ve analizler',
    },
    {
      name: 'siteUrl',
      label: 'Site URL',
      type: 'text',
      required: true,
      admin: {
        description: 'Site\'nin ana URL\'si (örn: https://nexusnews.com)',
      },
    },
    {
      name: 'logo',
      label: 'Site Logosu',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'theme',
      label: 'Tema Ayarları',
      type: 'group',
      fields: [
        {
          name: 'primaryColor',
          label: 'Ana Renk',
          type: 'text',
          defaultValue: '#2563eb',
          admin: {
            description: 'Ana tema rengi (hex kod)',
          },
        },
        {
          name: 'secondaryColor',
          label: 'İkincil Renk',
          type: 'text',
          defaultValue: '#64748b',
          admin: {
            description: 'İkincil tema rengi (hex kod)',
          },
        },
        {
          name: 'accentColor',
          label: 'Vurgu Rengi',
          type: 'text',
          defaultValue: '#f59e0b',
          admin: {
            description: 'Vurgu rengi (hex kod)',
          },
        },
      ],
    },
    {
      name: 'socialMedia',
      label: 'Sosyal Medya',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook',
          type: 'text',
        },
        {
          name: 'twitter',
          label: 'Twitter/X',
          type: 'text',
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
        },
        {
          name: 'youtube',
          label: 'YouTube',
          type: 'text',
        },
        {
          name: 'linkedin',
          label: 'LinkedIn',
          type: 'text',
        },
      ],
    },
    {
      name: 'contact',
      label: 'İletişim Bilgileri',
      type: 'group',
      fields: [
        {
          name: 'email',
          label: 'E-posta',
          type: 'email',
        },
        {
          name: 'phone',
          label: 'Telefon',
          type: 'text',
        },
        {
          name: 'address',
          label: 'Adres',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'seo',
      label: 'SEO Ayarları',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Başlık',
          type: 'text',
          admin: {
            description: 'Arama motorları için ana sayfa başlığı',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Açıklama',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Arama sonuçlarında gösterilecek açıklama',
          },
        },
        {
          name: 'ogImage',
          label: 'Sosyal Medya Görseli',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description: 'Sosyal medya paylaşımları için varsayılan görsel',
          },
        },
      ],
    },
    {
      name: 'dailyQuote',
      label: 'Günün Sözü',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Aktif',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'quote',
          label: 'Söz',
          type: 'textarea',
        },
        {
          name: 'author',
          label: 'Söyleyen',
          type: 'text',
        },
      ],
    },
  ],
}

export default SiteSettings
