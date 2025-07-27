import { CollectionConfig } from 'payload'

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
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
      label: 'Yazar Adı',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'E-posta',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'avatar',
      label: 'Profil Fotoğrafı',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'bio',
      label: 'Biyografi',
      type: 'textarea',
      admin: {
        description: 'Yazar hakkında kısa bilgi',
      },
    },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      defaultValue: 'writer',
      options: [
        {
          label: 'Yazar',
          value: 'writer',
        },
        {
          label: 'Editör',
          value: 'editor',
        },
        {
          label: 'Muhabir',
          value: 'reporter',
        },
        {
          label: 'Köşe Yazarı',
          value: 'columnist',
        },
      ],
    },
    {
      name: 'socialMedia',
      label: 'Sosyal Medya',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          label: 'Twitter',
          type: 'text',
        },
        {
          name: 'linkedin',
          label: 'LinkedIn',
          type: 'text',
        },
        {
          name: 'website',
          label: 'Website',
          type: 'text',
        },
      ],
    },
    {
      name: 'isActive',
      label: 'Aktif',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Yazarın aktif olup olmadığını belirtir',
      },
    },
  ],
}

export default Authors
