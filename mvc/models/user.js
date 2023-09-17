exports.find = (id) => {
    return this.values.find((value) => value.id == id)
}