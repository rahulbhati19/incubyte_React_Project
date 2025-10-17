export const stringCalculator = (input: string): number => {
  if (!input) return 0

  const normalized = input.replace(/\\n/g, '\n')

  
  let splitRegex: RegExp = /,|\n|;/
  let numbersSection = normalized

  if (normalized.startsWith('//')) {
    const newlineIndex = normalized.indexOf('\n')
    const delimiterSpec = normalized.slice(2, newlineIndex === -1 ? normalized.length : newlineIndex)
    numbersSection = newlineIndex === -1 ? '' : normalized.slice(newlineIndex + 1)

    const bracketed = [...delimiterSpec.matchAll(/\[(.*?)\]/g)].map(m => m[1])
    const delims = bracketed.length ? bracketed : [delimiterSpec]

    const escaped = delims.map(d => d.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'))
    splitRegex = new RegExp(escaped.join('|'))
  }

  
  numbersSection = numbersSection.replace(/\\n/g, '\n')

  const parts = numbersSection.split(splitRegex).filter(p => p !== '' && p !== undefined)
  const numbers = parts.map(p => Number(p))

  const negatives = numbers.filter(n => !isNaN(n) && n < 0)
  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(',')}`)
  }

  const sum = numbers.reduce((acc, n) => {
    if (isNaN(n)) return acc
    return acc + (n <= 1000 ? n : 0)
  }, 0)

  return sum
}