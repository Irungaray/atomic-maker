// "Minified" code. For a more modularized and human-readable version, checkout the development branch.
const readline = require("readline")
const fs = require("fs")

const dir = "./src/components"

const mkFolder = (path, name) => {
    fs.mkdirSync(`${dir}/${path}/${name}`,
        { recursive: true },

        err => { if (err) throw err },

        console.log("Folder created")
    )
}

const mkJsx = (path, name) => {
    let str = `import './${name}.css'\n\nconst ${name} = () => {\n    return (\n        <></>\n    )\n}\n\nexport { ${name} }\n`

    fs.writeFileSync(`${dir}/${path}/${name}/${name}.jsx`,
        str,

        err => { if (err) throw err },

        console.log("Jsx created")
    )
}

const mkCss = (path, name) => {
    let str = `.root {\n\n}`

    fs.writeFileSync(`${dir}/${path}/${name}/${name}.css`,
        str,

        err => { if (err) throw err },

        console.log("Css created")
    )
}

const mkJs = (path, name) => {
    const indexStr = `export { ${name} } from './${name}.jsx'`

    fs.writeFileSync(`${dir}/${path}/${name}/index.js`,
        indexStr,

        err => { if (err) throw err },

        console.log("Index created")
    )
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let name
let path

rl.question(`What's the component name? `, (component) => {
    rl.question("Is it an atom (1), a molecule (2) or an organism (3)? ", (type) => {
        let normalize = component.toLowerCase().charAt(0).toUpperCase() + component.toLowerCase().slice(1)
        name = normalize

        if (type == 1 || type == "atom") path = "atoms"
        if (type == 2 || type == "molecule") path = "molecules"
        if (type == 3 || type == "organism") path = "organisms"

        rl.close()
    })
})


rl.on("close", () => {
    console.log(`Creating component ${name}  in /src/components/${path}/${name}`)

    mkFolder(path, name)
    mkJsx(path, name)
    mkCss(path, name)
    mkJs(path, name)

    console.log("Thank you for using atomic maker!")
    process.exit(0)
})

module.exports = rl;