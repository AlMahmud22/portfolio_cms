import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = ['hero', 'about', 'contact', 'settings']
const singletonActions = (input: any, context: any) =>
  singletonTypes.includes(context.schemaType)
    ? input.filter(({ action }: any) => action !== 'duplicate' && action !== 'unpublish')
    : input

export default defineConfig({
  name: 'default',
  title: 'portfolio_mahmud_cms',

  projectId: '7d6vxzye',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // SINGLETONS — appear as direct menu items, not lists
            S.listItem()
              .title('Hero Section')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero-singleton')
              ),
            S.listItem()
              .title('About Me')
              .id('about')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about-singleton')
              ),
            S.listItem()
              .title('Contact')
              .id('contact')
              .child(
                S.document()
                  .schemaType('contact')
                  .documentId('contact-singleton')
              ),
            S.listItem()
              .title('Site Settings')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings-singleton')
              ),
            S.divider(),
            // LISTS — Education, Jobs, Projects, Tools, Certs, Blog
            ...S.documentTypeListItems().filter(
              (listItem: any) => !singletonTypes.includes(listItem.getId() ?? '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  document: {
    actions: singletonActions,
  },
})
