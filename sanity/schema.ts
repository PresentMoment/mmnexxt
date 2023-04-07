import { SchemaTypeDefinition } from 'sanity'

import artist from './schemas/artist'
import exhibit from './schemas/exhibit'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artist, exhibit],
}
