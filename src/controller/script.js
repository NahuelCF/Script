const fetch = require("node-fetch")
const { Item } = require("../domain")
const readline = require("readline")

let usersId = ""

const getUsersId = () => {
    let interfazCaptura = readline.createInterface({ input: process.stdin, output: process.stdout })
    interfazCaptura.question("", function (res) {
        interfazCaptura.close()
        seller(res)
    })
}

const seller = async (users) => {
    usersId = users.split(",")
    let allItems = []
    usersId.map(async (userId) => {
        await fetch("https://api.mercadolibre.com/sites/MLA/search?seller_id=" + userId)
            .then(result => result.json())
            .then(items => allItems = items.results.map(item => Item.fromJSON(item)))
        allItems.map(async (item) => {
            await fetch("https://api.mercadolibre.com/categories/" + item.category_id)
                .then(result => result.json())
                .then(res => item.setCategoryName(res.name))
            console.log(`${item.id}, ${item.title}, ${item.category_id}, ${item.category_name}`)
        })
    })
}

getUsersId()