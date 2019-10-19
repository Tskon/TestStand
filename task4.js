function solution(input) {
  const div = document.createElement('div')
  div.innerHTML = input
  document.body.appendChild(div)

  const nextRow = '\n'
  const result = {
    colgroup: [],
    rows: []
  }

  const colgroup = document.querySelector('colgroup')
  if (colgroup) {
    const cols = document.querySelectorAll('colgroup col')
    cols.forEach(col => {
      result.colgroup.push(col.getAttribute('align'))
    })
  }

  const rows = document.querySelectorAll('tr')
  rows.forEach(row => {
    const cells = row.querySelectorAll('td, th')
    const resultRow = []

    cells.forEach(cell => {
      const resultCell = {}
      resultCell.elementName = cell.tagName
      resultCell.content = cell.innerText

      resultRow.push(resultCell)
    })

    result.rows.push(resultRow)
  })

  let string = ''

  result.rows.forEach((row, i) => {
    string += '| '
    row.forEach((cell, j, arr) => {
      if (cell.elementName === 'TH') string += '**'
      string += cell.content
      if (cell.elementName === 'TH') string += '**'
      string += (j !== arr.length - 1) ? ' | ' : ' |'
    })
    string += nextRow
    if (i === 0 && result.colgroup.length) {
      string += '| '
      result.colgroup.forEach((colAlign, i, arr) => {
        if (colAlign && colAlign.toLowerCase() === 'right') {
          string += '---:'
        } else if (colAlign && colAlign.toLowerCase() === 'center') {
          string += ':---:'
        } else {
          string += ':---'
        }

        string += (i === arr.length - 1) ? ' |' : ' | '
      })

      string += nextRow
    } else if (i === 0) {
      string += '| '
      row.forEach((el, i, arr) => {
        string += ':---'
        string += (i === arr.length - 1) ? ' |' : ' | '
      })
      string += nextRow
    }
  })
  console.log(result)
  return string
}

console.log(solution(`<table>
  
  <thead>
  <tr>
    <td>Command         </td>
    <td>Description     </td>
    <th>Is implemented  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <th>git status</th>
    <td>List all new or modified    files</td>
    <th>Yes</th>
  </tr>
  <tr>
    <th>git diff</th>
    <td>Show file differences that haven’t been
      staged</td>
    <td>No</td>
  </tr>
  </tbody>
</table>`))