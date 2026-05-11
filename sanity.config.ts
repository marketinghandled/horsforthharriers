import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'howToJoinPage',
  'membershipPage',
  'committeePage',
  'clubDocumentsPage',
  'termsAndConditionsPage',
  'healthAndSafetyPage',
  'privacyPolicyPage',
  'constitutionPage',
  'kitPage',
  'clubRecordsPage',
  'ballotPage',
  'sessionsPage',
  'trainingMatrixPage',
  'coachesPage',
  'racesPage',
  'clubChampionshipsPage',
  'pecoPage',
  'relaysPage',
  'yorkshireVetsPage',
  'abcPage',
  'couchTo5kPage',
  'contactPage',
])

const singleton = (S: any, schemaType: string, title: string) =>
  S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType))

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Horsforth Harriers',
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Horsforth Harriers')
          .items([
            singleton(S, 'homePage', 'Home'),
            S.divider(),
            S.listItem()
              .title('About')
              .id('about-group')
              .child(
                S.list()
                  .title('About')
                  .items([
                    singleton(S, 'aboutPage', 'About the Club'),
                    singleton(S, 'howToJoinPage', 'How to Join'),
                    singleton(S, 'membershipPage', 'Membership Application'),
                    singleton(S, 'committeePage', 'Committee'),
                    singleton(S, 'clubDocumentsPage', 'Club Documents'),
                    singleton(S, 'constitutionPage', 'Club Constitution'),
                    singleton(S, 'termsAndConditionsPage', 'Terms & Conditions'),
                    singleton(S, 'healthAndSafetyPage', 'Health & Safety'),
                    singleton(S, 'privacyPolicyPage', 'Privacy Policy'),
                    singleton(S, 'kitPage', 'Club Kit'),
                    singleton(S, 'clubRecordsPage', 'Club Records'),
                    singleton(S, 'ballotPage', 'Club Ballot'),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Sessions')
              .id('sessions-group')
              .child(
                S.list()
                  .title('Sessions')
                  .items([
                    singleton(S, 'sessionsPage', 'Sessions'),
                    singleton(S, 'trainingMatrixPage', 'Training Matrix'),
                    singleton(S, 'coachesPage', 'Coaches'),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Races')
              .id('races-group')
              .child(
                S.list()
                  .title('Races')
                  .items([
                    singleton(S, 'clubChampionshipsPage', 'Club Championships'),
                    singleton(S, 'pecoPage', 'PECO Cross Country'),
                    singleton(S, 'relaysPage', 'Relays'),
                    singleton(S, 'yorkshireVetsPage', 'Yorkshire Vets'),
                    singleton(S, 'abcPage', 'Apperley Bridge Canter (ABC)'),
                  ])
              ),
            S.divider(),
            singleton(S, 'couchTo5kPage', 'Couch to 5K'),
            S.divider(),
            singleton(S, 'contactPage', 'Contact'),
            S.divider(),
            singleton(S, 'siteSettings', 'Site Settings'),
          ]),
    }),
    visionTool(),
  ],
})
