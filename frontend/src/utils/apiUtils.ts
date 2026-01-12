export const getCursorQuery = (fullPath: string | null) => {
    if (!fullPath) return null
    console.log(fullPath)
    const curs = fullPath.split('cursor=')[1].split('&')[0]
    return curs
}