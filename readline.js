const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let name
let type

rl.question(`What's the component name? `, (nm) => {
    rl.question("Is it an atom, a molecule or an organism? ", (tp) => {
        name = nm
        type = tp
        rl.close()
    })
})

rl.on("close", () => {
    console.log(`The component ${name} is an ${type}`)
    console.log("Thank you for using atomic maker!")
    process.exit(0)
})
