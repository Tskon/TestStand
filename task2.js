const getBemSyntax = function(str) {
  const result = {}

  let separators = str.match(/[^A-Za-z0-9]+/g)
  if (separators.length === 2) {
    result.mod = separators[0]
    result.elem = separators[1]
  } else {
    const filteredArr = separators.filter(sep => sep === separators[0])
    const unique = separators.filter((v, i, a) => a.indexOf(v) === i)

    if (filteredArr.length === 1) {
      result.mod = unique[1]
      result.elem = unique[0]
    } else {
      result.mod = unique[0]
      result.elem = unique[1]
    }
  }

  return result
}

console.log(getBemSyntax('blo3ck_m4od__el6em'))
console.log(getBemSyntax('block_mod_mod__elem '))
console.log(getBemSyntax('block__elem_mod_mod'))
console.log(getBemSyntax('block__mod__val—elem'))
console.log(getBemSyntax('block–mod–val___elem'))