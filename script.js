const readline = require("readline")

const { mkFolder, mkJsx, mkCss, mkJs } = require("./filesystem")

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
