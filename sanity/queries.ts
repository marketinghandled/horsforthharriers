import { groq } from 'next-sanity'

// Global
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    clubName, tagline, logo, footerDescription
  }
`

// Page singletons
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeadline, heroSubtext, heroImage,
    welcomeHeadline, welcomeBody,
    abcHeadline, abcBody, abcButtonLabel
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    pageHeadline, articleSubtitle, articleTitle, bodyText,
    quoteText, quoteAttribution,
    photo, founded, memberCount, joinUsText
  }
`

export const sessionsPageQuery = groq`
  *[_type == "sessionsPage"][0] {
    pageHeadline,
    harrierHubLabel, harrierHubUrl, newMembersLabel,
    tuesdayLabel, tuesdayHeadline, tuesdayBody, tuesdayDetails,
    tuesdayLocationName, tuesdayLocationAddress, tuesdayMapEmbedUrl,
    thursdayLabel, thursdayHeadline,
    winterBadge, winterTitle, winterDescription, winterDetails, winterLinkText, winterLinkUrl,
    summerBadge, summerTitle, summerDescription, summerDetails, summerLinkText, summerLinkUrl
  }
`

export const racesPageQuery = groq`
  *[_type == "racesPage"][0] {
    pageHeadline, pageSubheading, events
  }
`

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    pageHeadline, pageSubheading,
    email, address, sessionTimes, mapEmbedUrl,
    contactRecipients,
    facebook, instagram, strava
  }
`

export const howToJoinPageQuery = groq`
  *[_type == "howToJoinPage"][0] {
    pageHeadline, intro, feesYear, feesPeriod,
    existingMembersBody, rejoinFeeNote,
    newMembersIntro, newMemberFees, tshirtNote, socialMembershipBody,
    memberBenefitsHeading, memberBenefitsBody,
    faqs
  }
`

export const membershipPageQuery = groq`
  *[_type == "membershipPage"][0] {
    pageHeadline, feePeriodNote, membershipOptions,
    confirmationIntro,
    bankAccountName, bankAccountNumber, bankSortCode,
    noTransferContactName, noTransferContactEmail
  }
`

export const committeePageQuery = groq`
  *[_type == "committeePage"][0] {
    pageHeadline,
    committeeMembers[] {
      name, role, email, phone, bio,
      photo { asset->{ url }, hotspot, crop }
    }
  }
`

export const coachesPageQuery = groq`
  *[_type == "coachesPage"][0] {
    pageHeadline, pageSubheading,
    coaches[] {
      name, role, email, phone, bio, qualifications,
      photo { asset->{ url }, hotspot, crop }
    }
  }
`

// Content collections
export const allEventsQuery = groq`
  *[_type == "racesPage"][0].events
`

export const sessionsQuery = groq`
  *[_type == "sessionsPage"][0].sessions
`

export const termsAndConditionsPageQuery = groq`
  *[_type == "termsAndConditionsPage"][0] {
    pageHeadline, bodyText
  }
`

export const healthAndSafetyPageQuery = groq`
  *[_type == "healthAndSafetyPage"][0] {
    pageHeadline, bodyText
  }
`

export const privacyPolicyPageQuery = groq`
  *[_type == "privacyPolicyPage"][0] {
    pageHeadline, bodyText
  }
`

export const constitutionPageQuery = groq`
  *[_type == "constitutionPage"][0] {
    pageHeadline,
    sections[] { title, body }
  }
`

export const kitPageQuery = groq`
  *[_type == "kitPage"][0] {
    committeeContactName, committeeContactPhone, committeeContactEmail,
    vestDescription, tshirtDescription,
    shopUrl, shopIntro,
    shopItems[] { name, price },
    vatNote, collectionAddress, sizingNote
  }
`

export const ballotPageQuery = groq`
  *[_type == "ballotPage"][0] {
    pageHeadline, contactEmail,
    qualifySection { heading, bullets },
    londonSection { heading, bullets },
    notesSection { heading, bullets },
    successSection { heading, bullets }
  }
`

export const trainingMatrixPageQuery = groq`
  *[_type == "trainingMatrixPage"][0] {
    pageHeadline, introText, footerNote,
    pacingGroups[] { group, subGroup, paceRange, typicalDistance }
  }
`

export const clubRecordsPageQuery = groq`
  *[_type == "clubRecordsPage"][0] {
    pageHeadline, pageSubheading,
    records[] {
      distance,
      men { name, time, event, date, evidenceLink },
      women { name, time, event, date, evidenceLink }
    }
  }
`

export const couchTo5kPageQuery = groq`
  *[_type == "couchTo5kPage"][0] {
    introParagraph1, introParagraph2,
    highlights,
    contactEmail,
    nextCourseStart, nextCourseGraduation,
    meetingName, meetingAddress, meetingTime
  }
`

export const clubChampionshipsPageQuery = groq`
  *[_type == "clubChampionshipsPage"][0] {
    pageHeadline, pageSubheading,
    heroImage { asset->{ url }, hotspot, crop },
    bodyText, keyPoints,
    races[] { raceName, date, location, url }
  }
`

export const pecoPageQuery = groq`
  *[_type == "pecoPage"][0] {
    pageHeadline, pageSubheading,
    heroImage { asset->{ url }, hotspot, crop },
    bodyText, details[] { value },
    websiteUrl, sidebarText
  }
`

export const relaysPageQuery = groq`
  *[_type == "relaysPage"][0] {
    pageHeadline, pageSubheading,
    heroImage { asset->{ url }, hotspot, crop },
    bodyText, relayEvents[] { title, description, url }
  }
`

export const yorkshireVetsPageQuery = groq`
  *[_type == "yorkshireVetsPage"][0] {
    pageHeadline, pageSubheading,
    heroImage { asset->{ url }, hotspot, crop },
    bodyText, details[] { value },
    websiteUrl
  }
`

export const clubDocumentsPageQuery = groq`
  *[_type == "clubDocumentsPage"][0] {
    pageHeadline,
    documents[] {
      title, description,
      "fileUrl": file.asset->url,
      url
    }
  }
`

export const abcPageQuery = groq`
  *[_type == "abcPage"][0] {
    pageHeadline, pageSubheading,
    heroImage { asset->{ url }, hotspot, crop },
    bodyText, contactEmail, entryUrl,
    details[] { label, value },
    volunteerHeading, volunteerText, volunteerLinkLabel, volunteerLinkUrl
  }
`
