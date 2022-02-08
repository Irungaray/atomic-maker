// TO DO
const fs = require("fs")

const cleanup = () => {
    setTimeout(() => {
        fs.rmdirSync("components", { recursive: true, force: true })
    }, 3000)
}

module.exports = cleanup
