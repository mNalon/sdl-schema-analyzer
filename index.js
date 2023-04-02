const { parse } = require('graphql/language')

const extractDeprecationsFrom = require('./extract-deprecations-from')

class SchemaAnalyser {
  constructor(sdlPlainTextSchema) {
    this.schema = parse(sdlPlainTextSchema)
  }

  getDeprecations() {
    const { definitions } = this.schema

    return extractDeprecationsFrom(definitions)
  }
}

module.exports = SchemaAnalyser
