export const getDetailPath = (path: string, id: string | number) => {
    return `${path}/${id}/`
}

export const getNestedDetailPath = (parentPath: string, nestedPath: string, id: string | number) => {
    return `${parentPath}/${nestedPath}/${id}/`
}