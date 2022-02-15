#!/usr/bin/env node
const readline = require("readline")
const fs = require("fs")

let name
let type

let errs = {
    exists: "Component already exists. Aborted.",
    noNameOnQuestion: "Component's name must be provided, and be at least 3 characters long.",
    invalidOption: "Valid options are: atom (1), molecule (2) or organism (3)",
    noInput: "\nNo input was provided. Aborted."
}

const throwErr = (err) => {
    console.error(err)
    process.exit(1)
}

const capitalize = (input) => {
    return input.toLowerCase().charAt(0).toUpperCase() + input.toLowerCase().slice(1)
}

const make = (type, name) => {
    // Here you can modify the path and boilerplate to make it suit your needs.
    let path = `./src/components/${type}/${name}`
    let basename = `${path}/${name}`

    let files = [
        {
            filename: `${basename}.jsx`,
            content: `import './${name}.css'\n\nconst ${name} = () => {\n    return (\n        <></>\n    )\n}\n\nexport { ${name} }\n`,
        },
        {
            filename: `${basename}.css`,
            content: `.root {\n\n}`
        },
        {
            filename: `${path}/index.js`,
            content: `export { ${name} } from './${name}.jsx'`,
        },
    ]

    // If component already exists, stops the execution.
    if (fs.existsSync(path)) throwErr(errs.exists)

    fs.mkdirSync(
        `${path}`,
        { recursive: true },
        err => { if (err) throw err },
    )

    files.forEach(file => {
        fs.writeFileSync(
            file.filename,
            file.content,
            err => { if (err) throw err }
        )
    });

    console.log(`Created component ${name} in ${path}    \nThanks for using Atomic Maker!`)

    process.exit(0)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question(`What's the component name? `, (component) => {
    if (component == undefined || component.length < 3) throwErr(errs.noNameOnQuestion)

    rl.question("Is it an atom (1), a molecule (2) or an organism (3)? ", (isIt) => {
        let isType = false

        if (isIt == 1 || isIt == "atom" || isIt == "a") isType = true, type = "atoms"
        if (isIt == 2 || isIt == "molecule" || isIt == "m") isType = true, type = "molecules"
        if (isIt == 3 || isIt == "organism" || isIt == "o") isType = true, type = "organisms"

        if (!isType) throwErr(errs.invalidOption)

        name = capitalize(component)

        rl.close()
    })
})

rl.on("close", () => {
    if (type && name) make(type, name)
    else throwErr(errs.noInput)
})
