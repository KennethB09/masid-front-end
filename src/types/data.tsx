export type category = {
    id: string,
    name: string
}

export type categoryList = {
    categoryList: category[]
}

export type product = {
    id: string
    name: string
    description: string
    price: string
    imageUrl: string
    category: string
}