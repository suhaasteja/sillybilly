import React from "react";
import TableCell from "./TableCell";

const BillTable = ({ members, handleCellAction, items, memberSplits }) => {
  return (
    <table>
      {/* header */}
      <thead>
        <tr>
          <th>action</th>
          <th>index</th>
          <th>item</th>
          <th>price</th>
          {members.map((mem, memIndex) => {
            return (
              <th key={memIndex}>
                <TableCell
                  val={mem}
                  handleCellAction={handleCellAction}
                  valIndex={memIndex}
                  from={"memberName"}
                  delAction={true}
                  editAction={true}
                />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((item, itemIndex) => {
          const { index, name, price } = item;

          return (
            <tr key={itemIndex}>
              {/* <TableCell>{index}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{price}</TableCell> */}
              <td>
                <TableCell
                  val={""}
                  handleCellAction={handleCellAction}
                  valIndex={itemIndex}
                  from={"actionCol"}
                  delAction={true}
                  editAction={false}
                />
              </td>
              <td>{itemIndex + 1}</td>
              <td>
                <TableCell
                  val={name}
                  handleCellAction={handleCellAction}
                  valIndex={itemIndex}
                  from={"itemName"}
                  delAction={false}
                  editAction={true}
                />
              </td>
              <td>
                <TableCell
                  val={price}
                  handleCellAction={handleCellAction}
                  valIndex={itemIndex}
                  from={"itemPrice"}
                  delAction={false}
                  editAction={true}
                />
              </td>
              {
                members.map((_, memIndex) => {
                  console.log("rowIndex", itemIndex);
                  return (
                    <td key={memIndex}>
                        <TableCell 
                          val={memberSplits[memIndex] || 0}
                          handleCellAction={handleCellAction}
                          valIndex={memIndex}
                          rowIndex = {itemIndex}
                          from={"memberSplit"}
                          delAction={false}
                          editAction={true}
                        />
                    </td>
                  )
                })
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BillTable;
