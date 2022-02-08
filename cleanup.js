const fs = require("fs")

function cleanup() {
    setTimeout(() => {
        fs.rmdirSync("components", { recursive: true, force: true })
    }, 3000)
}

module.exports = cleanup
