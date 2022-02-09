// "Minified" code. For a more modularized and human-readable version, checkout the development branch.
const readline = require("readline")
const fs = require("fs")

const argsv = process.argv

const dir = "./src/components"
let name
let path

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

const mkAll = (path, name) => {
    console.log(`Creating component ${name} in ${dir}/${path}/${name}`)

    mkFolder(path, name)
    mkJsx(path, name)
    mkCss(path, name)
    mkJs(path, name)

    console.log("Thank you for using atomic maker!")

    process.exit(0)
}

const capitalize = (input) => {
    return input.toLowerCase().charAt(0).toUpperCase() + input.toLowerCase().slice(1)
}

const throwErr = (output) => {
    console.error(output)
    process.exit(1)
}

// If there are arguments, it gets executed with the argsv data.
// Otherwise, it gets executed as a CLI
if (argsv.length > 2) {
    let flag = argsv[2]
    let component = argsv[3]
    let isFlag

    if (flag == "-a") isFlag = true, path = "atoms";
    if (flag == "-m") isFlag = true, path = "molecules";
    if (flag == "-o") isFlag = true, path = "organisms";

    if (!isFlag) throwErr("Flags must be inserted with a ' - ' symbol. \nAvailable flags are: -a, -m and -o for atoms, molecules and organisms respectively.")

    if (component == undefined || component.length < 3) throwErr("Component's name must be passed after the flag, and be at least 3 characters long.")

    name = capitalize(component)

    mkAll(path, name)
} else {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question(`What's the component name? `, (component) => {
        if (component == undefined || component.length < 3) throwErr("Component's name must be provided, and be at least 3 characters long.")

        rl.question("Is it an atom (1), a molecule (2) or an organism (3)? ", (type) => {
            let isType

            if (type == 1 || type == "atom") isType = true, path = "atoms"
            if (type == 2 || type == "molecule") isType = true, path = "molecules"
            if (type == 3 || type == "organism") isType = true, path = "organisms"

            if (!isType) throwErr("Valid options are: atom (1), molecule (2) or organism (3)")

            name = capitalize(component)

            rl.close()
        })
    })


    rl.on("close", () => {
        mkAll(path, name)
    })
}
