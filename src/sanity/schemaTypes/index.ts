import { type SchemaTypeDefinition } from 'sanity'
import { globalSettings } from './globalSettings'
import { testimonial } from './testimonial'
import { article } from './article'
import { stat } from './stat'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { blogPage } from './blogPage'
import { careerPage } from './careerPage'
import { contactPage } from './contactPage'
import { projectsPage } from './projectsPage'
import { partnerLogo } from './partnerLogo'
import { award } from './award'
import { teamMember } from './teamMember'
import { whyWorkFeature } from './whyWorkFeature'
import { jobRole } from './jobRole'
import { faq } from './faq'
import { focusedService } from './focusedService'
import { servicesPage } from './servicesPage'
import { serviceFeatureItem } from './serviceFeatureItem'
import { project } from './project'
import { cultureImage } from './cultureImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    globalSettings,
    testimonial,
    article,
    stat,
    homePage,
    aboutPage,
    blogPage,
    careerPage,
    contactPage,
    projectsPage,
    partnerLogo,
    award,
    teamMember,
    whyWorkFeature,
    jobRole,
    faq,
    focusedService,
    servicesPage,
    serviceFeatureItem,
    project,
    cultureImage,
  ],
}
