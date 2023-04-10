import { SchemaTypeDefinition } from 'sanity'

import artist from './schemas/artist'
import exhibit from './schemas/exhibit'
import post from './schemas/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artist, exhibit, post],
}
