import type { PageInfo } from '../pagination/pageInfo'
import type { Character } from './character'

type AllCharacters = {
  info: PageInfo
  results: Character[]
}

export type { AllCharacters }
