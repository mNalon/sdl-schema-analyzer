const SchemaAnalyser = require('./index')

const schemaFake = `
  type Query {
    test1: Test1
    test2: Test2 @deprecated(reason: "Field deprecated")
    test3: Test2
  }

  type Test1 {
    field1: String
    field2: Test2 @deprecated(reason: "Use test3 root query")
  }

  type Test2 {
    field3: Int
    field4: Boolean @deprecated(reason: "Any")
  }

  enum DeprecatedEnum @deprecated(reason: "Deprecated Enum") { 
    ONE, 
    TWO
  }

  enum NotDeprecateEnum {
    THREE, 
    FOR
  }
`

const deprecatedExpectation = [
  {
    definitionType: 'FieldDefinition',
    label: 'Query.test2',
    reason: 'Field deprecated'
  },
  {
    definitionType: 'FieldDefinition',
    label: 'Test1.field2',
    reason: 'Use test3 root query'
  },
  {
    definitionType: 'FieldDefinition',
    label: 'Test2.field4',
    reason: 'Any'
  },
  {
    definitionType: 'EnumTypeDefinition',
    label: 'DeprecatedEnum',
    reason: 'Deprecated Enum'
  }
]

describe('SchemaAnalyser', () => {
  describe('when it is instantiated with a SDL plain text schema', () => {
    describe('and the getDeprecatedDefinitions is called', () => {
      it('should return a list of the deprecated definitions in the schema', () => {
        const schemaAnalyser = new SchemaAnalyser(schemaFake)

        expect(schemaAnalyser.getDeprecations()).toStrictEqual(deprecatedExpectation)
      })
    })
  })
})
