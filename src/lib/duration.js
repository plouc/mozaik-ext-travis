export const secondsToString = duration => {
    const hours = Math.floor(duration / 3600) % 24
    const minutes = Math.floor(duration / 60) % 60
    const seconds = duration % 60

    const parts = []
    if (hours > 0) parts.push(`${hours} hrs`)
    if (minutes > 0) parts.push(`${minutes} min`)
    if (seconds > 0) parts.push(`${seconds} sec`)

    return parts.join(' ')
}
