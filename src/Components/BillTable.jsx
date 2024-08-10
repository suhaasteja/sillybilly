import React from 'react'
import TableCell from './TableCell'

const BillTable = ({members, handleCellAction}) => {
  return (
    <table>
      {/* header */}
      <thead>
        <tr>
          <th>index</th>
          <th>item</th>
          <th>price</th>
          {
            members.map((mem, memIndex) => {
              return (
                <th key={memIndex}>
                  <TableCell val={mem} handleCellAction={handleCellAction} valIndex={memIndex} />
                </th>
              )
            })
          }
        </tr>
      </thead>
    </table>
  )
}

export default BillTable