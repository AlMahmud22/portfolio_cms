import hero from './hero'
import about from './about'
import education from './education'
import job from './job'
import projectCategory from './projectCategory'
import project from './project'
import skill from './skill'
import tool from './tool'
import certification from './certification'
import contact from './contact'
import socialLink from './socialLink'
import settings from './settings'
import blog from './blog'
import comment from './comment'
import fileAsset from './fileAsset'

export const schemaTypes = [
  // Core sections
  hero,
  about,
  contact,
  settings,
  fileAsset,
  
  // Supporting types
  socialLink,
  
  // Career
  education,
  job,
  
  // Projects
  projectCategory,
  project,
  skill,
  
  // Tools & Certifications
  tool,
  certification,

  // Blog
  blog,
  comment,
]
