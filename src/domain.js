class Item {
    constructor(id, title, category_id) {
        this.id = id
        this.title = title
        this.category_id = category_id
        this.category_name
    }

    static fromJSON(itemJSON) {
        return new Item(itemJSON.id, itemJSON.title, itemJSON.category_id)
    }

    setCategoryName(name) {
        this.category_name = name
    }
}

module.exports = {
    Item
}