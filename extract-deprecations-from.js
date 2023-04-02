const {
  info
} = require('./logger')

const DefinitionType = {
  ENUM: 'EnumTypeDefinition',
  OBJECT: 'ObjectTypeDefinition',
  FIELD: 'FieldDefinition'
}

const isDeprecatedDirective = (directive) => directive.name.value === 'deprecated'

const extractReason = (directive) => {
  const reasonArgument = directive.arguments[0]

  return reasonArgument ? reasonArgument.value.value : 'Undefined'
}

const createDeprecationDescriptor = (definitionType, label, deprecatedDirective) => ({
  definitionType,
  label,
  reason: extractReason(deprecatedDirective)
})

const findDeprecatedDirective = (definition) => definition.directives.find(isDeprecatedDirective)

const extractDeprecationsFrom = (definition) => {
  const deprecations = []

  if (definition.kind === DefinitionType.ENUM) {
    const label = `${definition.name.value}`
    const deprecatedDirective = findDeprecatedDirective(definition)
    if (deprecatedDirective) {
      deprecations.push(
        createDeprecationDescriptor(DefinitionType.ENUM, label, deprecatedDirective)
      )
    }
  }

  if (definition.kind === DefinitionType.OBJECT) {
    definition.fields.forEach((fieldDefinition) => {
      const label = `${definition.name.value}.${fieldDefinition.name.value}`
      const deprecatedDirective = findDeprecatedDirective(fieldDefinition)
      if (deprecatedDirective) {
        deprecations.push(
          createDeprecationDescriptor(DefinitionType.FIELD, label, deprecatedDirective)
        )
      }
    })
  }

  return deprecations
}

module.exports = (definitions) => definitions
  .reduce((deprecations, definition, index) => {
    info(`[extract-deprecations-from] Analyzing definition at index: ${index}`)
    const deprecationsFromDefinition = extractDeprecationsFrom(definition)
    return [...deprecations, ...deprecationsFromDefinition]
  }, [])
