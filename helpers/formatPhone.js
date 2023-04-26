export const formatPhone = (value) => {
    return value?.replaceAll('+', '')
        .replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
}