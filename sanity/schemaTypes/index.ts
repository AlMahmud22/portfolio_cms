import hero from './hero'
import about from './about'
import education from './education'
import job from './job'
import projectCategory from './projectCategory'
import project from './project'
import tool from './tool'
import certification from './certification'
import contact from './contact'
import socialLink from './socialLink'
import settings from './settings'

export const schemaTypes = [
  // Core sections
  hero,
  about,
  contact,
  settings,
  
  // Supporting types
  socialLink,
  
  // Career
  education,
  job,
  
  // Projects
  projectCategory,
  project,
  
  // Tools & Certifications
  tool,
  certification,
]
