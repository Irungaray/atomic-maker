const fs = require("fs")
// const cleanup = require("./cleanup")()

const mkFolder = (path, name) => {
    fs.mkdirSync(`./src/components/${path}/${name}`,
        { recursive: true },

        err => { if (err) throw err },

        console.log("Folder created")
    )
}

const mkJsx = (path, name) => {
    let str = `import './${name}.css'\n\nconst ${name} = () => {\n    return (\n        <></>\n    )\n}\n\nexport { ${name} }\n`

    fs.writeFileSync(`./src/components/${path}/${name}/${name}.jsx`,
        str,

        err => { if (err) throw err },

        console.log("Jsx created")
    )
}

const mkCss = (path, name) => {
    let str = `.root {\n\n}`

    fs.writeFileSync(`./src/components/${path}/${name}/${name}.css`,
        str,

        err => { if (err) throw err },

        console.log("Css created")
    )
}

const mkJs = (path, name) => {
    const indexStr = `export { ${name} } from './${name}.jsx'`

    fs.writeFileSync(`./src/components/${path}/${name}/${name}.js`,
        indexStr,

        err => { if (err) throw err },

        console.log("Index created")
    )
}

module.exports = { mkFolder, mkJsx, mkCss, mkJs }
