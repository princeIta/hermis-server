const chars = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789$&?><£%*#~:;'@"

export function generateRandomNumber(firstNum: number, secondNum: number = 0): number {
    const num1 = (firstNum ?? 0)
    const num2 = (secondNum ?? 0)
    const range = num1 && num2 ? Math.abs(num1 - num2) : num1 || num2
    const rand = Math.random()

    return ((num1 && num2) && num1) + Math.round(rand * range)
}

export function generateRandomChars(strLen: number) {
    const charsLen = chars.length

    let str = ""
    for (let idx = 1; idx <= strLen; idx++) {
        const idx = generateRandomNumber(charsLen)
        const char = chars[idx]
        str += char
    }

    return str
}