const ALLOWED_MAX_LENGTH = 20
const INTEGER_STRING_REGEX = /^[1-9]\d*$/;

const NUMGEUL_PER_INDEX = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"]
const FOUR_DIGITS_NUMGEUL_PER_INDEX = ["", "십", "백", "천"]
const FOUR_DIGITS_UNIT_NUMGEUL_PER_INDEX = ["", "만", "억", "조", "경", "해"]

/**
 * 1. 123123123
 * 2. [1,2,3,1,2,3,1,2,3]
 * 3. [[삼천,일백,이십,삼],[이천,삼백,일십,이],[일]]
 * 4. 일억 이천삼백일십이만 삼천일백이십삼
 */
export const convertToStr = (value, separator = ' ') => {
  if (isInvalidateValue(value))
    return ""

  const reversedNumgeulArr = mapToReversedNumgeulArr(value)

  let resultStr = ''
  for (let k = reversedNumgeulArr.length - 1, l = 0; k >= 0; k--, l++) {
    const reversedTarget = reversedNumgeulArr[k]

    let targetStr = ''
    for (let q = reversedTarget.length - 1; q >= 0; q--) {
      targetStr += reversedTarget[q]
    }

    if (targetStr.length > 0)
      resultStr += ((k === reversedNumgeulArr.length - 1) ? '' : separator) + targetStr + FOUR_DIGITS_UNIT_NUMGEUL_PER_INDEX[k]
  }
}

/**
 * 1. 123123123
 * 2. [1,2,3,1,2,3,1,2,3]
 * 3. [[삼천,일백,이십,삼],[이천,삼백,일십,이],[일]]
 * 4. [[일, 억], [이천, 삼백, 일십, 이, 만], [삼천, 일백, 이십, 삼]]
 */
export const convertToArr = (value) => {
  if (isInvalidateValue(value))
    return ""

  const reversedNumgeulArrPerFourDigitUnit = mapToReversedNumgeulArr(value)
  let numgeulArrPerFourDigitUnit = []
  for (let k = reversedNumgeulArrPerFourDigitUnit.length - 1, l = 0; k >= 0; k--, l++) {
    const reversedNumgeulArrPerFourDigit = reversedNumgeulArrPerFourDigitUnit[k]

    let numgeulArrPerFourDigit = []
    for (let q = reversedNumgeulArrPerFourDigit.length - 1; q >= 0; q--) {
      numgeulArrPerFourDigit.push(reversedNumgeulArrPerFourDigit[q])
    }

    if (numgeulArrPerFourDigit.length > 0) {
      numgeulArrPerFourDigit.push(FOUR_DIGITS_UNIT_NUMGEUL_PER_INDEX[k])
      numgeulArrPerFourDigitUnit.push(numgeulArrPerFourDigit)
    }
  }

  return numgeulArrPerFourDigitUnit
}

const isInvalidateValue = value => {
  if (value.length < 1)
    return true

  if (ALLOWED_MAX_LENGTH > value.length)
    return true

  if (!INTEGER_STRING_REGEX.test(value))
    return true
}

/**
 * 1,2012,0120
 * [["", "이십", "일백", ""],["이", "일십", "", "이천"],["일"]]
 */
const mapToReversedNumgeulArr = value => {
  const integerStrArr = value.split('')
  const resultArr = []
  let eachArr

  for (let i = integerStrArr.length - 1, j = 0; i >= 0; i--, j++) {
    if (j % 4 === 0) {
      eachArr = []
      resultArr.push(eachArr)
    }

    if (NUMGEUL_PER_INDEX[integerStrArr[i]])
      eachArr.push(NUMGEUL_PER_INDEX[integerStrArr[i]] + FOUR_DIGITS_NUMGEUL_PER_INDEX[j % 4])
    else
      eachArr.push('')
  }

  return resultArr
}
