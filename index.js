const readline = require("readline")
const fs = require("fs")

const argsv = process.argv

let name
let type

let errors = {
    noFlag: "Flags must be inserted with a ' - ' symbol. \nAvailable flags are: -a, -m and -o for atoms, molecules and organisms respectively.",
    noNameAfterFlag: "Component's name must be passed after the flag, and be at least 3 characters long.",
    noNameOnQuestion: "Component's name must be provided, and be at least 3 characters long.",
    invalidOption: "Valid options are: atom (1), molecule (2) or organism (3)"
}

const make = (type, name) => {
    let strings = {
        jsxStr: `import './${name}.css'\n\nconst ${name} = () => {\n    return (\n        <></>\n    )\n}\n\nexport { ${name} }\n`,
        cssStr: `.root {\n\n}`,
        indexStr: `export { ${name} } from './${name}.jsx'`
    }

    let dir = `./src/components/${type}/${name}`
    let filename = `${dir}/${name}`

    console.log(`Creating component ${name} in ${dir}`)

    fs.mkdirSync(
        `${dir}`,
        { recursive: true },
        err => { if (err) throw err },
    )

    fs.writeFileSync(
        `${filename}.jsx`,
        strings.jsxStr,
        err => { if (err) throw err },
    )

    fs.writeFileSync(
        `${filename}.css`,
        strings.cssStr,
        err => { if (err) throw err },
    )

    fs.writeFileSync(
        `${dir}/index.js`,
        strings.indexStr,
        err => { if (err) throw err },
    )

    console.log("Thank you for using atomic maker!")

    process.exit(0)
}

const capitalize = (input) => {
    return input.toLowerCase().charAt(0).toUpperCase() + input.toLowerCase().slice(1)
}

const throwErr = (err) => {
    console.error(err)
    process.exit(1)
}

// If there are arguments, it gets executed with the argsv data.
// Otherwise, it gets executed as a CLI
if (argsv.length > 2) {
    let flag = argsv[2]
    let component = argsv[3]
    let isFlag

    if (flag == "-a") isFlag = true, type = "atoms"
    if (flag == "-m") isFlag = true, type = "molecules"
    if (flag == "-o") isFlag = true, type = "organisms"

    if (!isFlag) throwErr(errors.noFlag)
    if (component == undefined || component.length < 3) throwErr(errors.noNameAfterFlag)

    name = capitalize(component)

    make(type, name)
} else {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question(`What's the component name? `, (nameInput) => {
        if (nameInput == undefined || nameInput.length < 3) throwErr(errors.noNameOnQuestion)

        rl.question("Is it an atom (1), a molecule (2) or an organism (3)? ", (typeInput) => {
            let isType

            if (typeInput == 1 || typeInput == "atom") isType = true, type = "atoms"
            if (typeInput == 2 || typeInput == "molecule") isType = true, type = "molecules"
            if (typeInput == 3 || typeInput == "organism") isType = true, type = "organisms"

            if (!isType) throwErr(errors.invalidOption)

            name = capitalize(component)

            rl.close()
        })
    })

    rl.on("close", () => {
        make(type, name)
    })
}
