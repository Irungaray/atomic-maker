const fs = require("fs")
// const cleanup = require("./cleanup")()

const component = "Item"

const jsxStr = `const ${component} = () => {\n    return (\n        <></>\n    )\n}\n\nexport { ${component} }\n`
const cssStr = `.root {}`
const indexStr = `export { ${component} } from './${component}.jsx'`

fs.mkdirSync(`./${component}`,
    { recursive: true },

    (err) => {
        if (err) throw err
    },
    console.log("Folder created")
)

fs.writeFileSync(`./${component}/${component}.jsx`,
    jsxStr,

    (err) => {
        if (err) throw err
    },
    console.log("Jsx created")
)

fs.writeFileSync(`./${component}/${component}.css`,
    cssStr,

    (err) => {
        if (err) throw err
    },
    console.log("Css created")
)

fs.writeFileSync(`./${component}/index.js`,
    indexStr,

    (err) => {
        if (err) throw err
    },
    console.log("Index created")
)
