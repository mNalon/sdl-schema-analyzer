An analyzer to extract info about your schema

---

## Usage

```
npm install --save sdl-schema-analyzer
```

```javascript
const SchemaAnalyzer = require('sdl-schema-analyzer')

const schema = `
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

// create the analyzer instance
const analyzer = new SchemaAnalyzer(schema)

// get the list of deprecated pieces in the schema 
analyzer.getDeprecations() 
/*
[
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
*/
```

## Tools

[Abstract syntax tree (AST)](https://astexplorer.net/#/gist/9bb73e8b0d49f11d0e91b21a1f52aadd/d0b34c79e824f29f7d9b1f1cee24256d3b6f484e) 