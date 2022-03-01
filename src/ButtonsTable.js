import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 11,
    backgroundColor: "rgb(33,32,64)",
    color: theme.palette.common.white,
    borderBottom: "none",
    margin:0,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    color: theme.palette.common.white,
    borderBottom: "none",
  } 
}));
 
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {},
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));
export default function ButtonsTable(props) {
   const buttonsTableParameters = [
    "",
    "IS INVERT",
    "IS RELEASE",
    "MAX VALUE",
    "MIN VALUE",
    "NOT IN RANGE",
    "OPERATION NAME",
    "OPERATION TYPE",
    "VALUE",
    "VEHICLE COMMAND",
    "",
  ];
  const actions = [
    { value: "Steer", label: "Steer" },
    { value: "Gas", label: "Gas" },
    { value: "Break", label: "Break" },
  ];
  const [buttonRows, setButtonRows] = useState([
    {
      DeviceOperation: {
        Id: 0,
        IsInvert: false,
        IsRelease: false,
        MaxValue: "",
        MinValue: "",
        NotInRangeValue: "",
        OperationName: "",
        OperationType: "",
        Value: "",
        VehicleCommand: "",
      },
    },
  ]);

  const handleRemoveItem = (rowId) => {
    const id = rowId;
    setButtonRows(buttonRows.filter((item) => item.DeviceOperation.Id !== id));
  };
  const updateParamValue = (index, propertyName) => (e) => {
    let newArr = [...buttonRows]; // copying the old datas array
    newArr[index]["DeviceOperation"][propertyName] = e.target.value;
  };
  const updateBooleanParamValue = (index, propertyName) => (e) => {
    let newArr = [...buttonRows]; // copying the old datas array
    newArr[index]["DeviceOperation"][propertyName] = e.target.checked;
  };
  const handleAddRow = () => {
    let newArr = [...buttonRows];
    setButtonRows([...buttonRows, createRandomRow()]);
  };

  let idCounter = 0;
  const createRandomRow = () => {
    idCounter += 1;
    return {
      DeviceOperation: {
        Id: Math.random(100000),
        IsInvert: false,
        IsRelease: false,
        MaxValue: "",
        MinValue: "",
        NotInRangeValue: "",
        OperationName: "",
        OperationType: "",
        Value: "",
        VehicleCommand: "",
      },
    };
  };
  const addButtonItem = (button, index) => {
    setButtonRows((buttonRows) => [
      ...buttonRows,
      {
        DeviceOperation: {
          Id: index,
          IsInvert: false,
          IsRelease: false,
          MaxValue: "",
          MinValue: "",
          NotInRangeValue: "",
          OperationName: "",
          OperationType: "",
          Value: "",
          VehicleCommand: "",
        },
      },
    ]);
  };
  return (
    <div >
<div>{
//JSON.stringify(buttonRows)
}</div>
       <Button className={"addingStyle"} size="small" onClick={handleAddRow}>
         <AddCircleOutlineIcon />&nbsp; Add a row  
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        className={"addingStyle"}
        size="small"
        value={buttonRows}
        onClick={props.updateJSONObjButtonValue((props.buttonIndex), buttonRows)}
      >
    <SaveIcon />&nbsp; Save Settings  
      </Button>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            {buttonsTableParameters.map((buttonParameter, index) => (
              <StyledTableCell  className="tableTextField"  align="center">
                {buttonParameter}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {buttonRows.map((button, index) => [
            <StyledTableRow
              className={"rowStyle_" + (index % 2)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell
              sx={{ width: '19%' }} 
                id={"rowStyle_" + (index % 2)}
                component="th"
                scope="row"
              >
                
                <span>{"OPERATION " + (index + 1)}</span>
              </StyledTableCell>
              <StyledTableCell id={"rowStyle_" + (index % 2)} sx={{ width: '1%' }} align="center"  >
                <Checkbox
                className="tableCheckbox"
                  variant="standard"
                    type="checkbox"
                  onChange={updateBooleanParamValue(index, "IsInvert")}
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["IsInvert"]
                      : ""
                  }
                />
              </StyledTableCell>
              <TableCell  id={"rowStyle_" + (index % 2)}  sx={{ width: '1%' }}  align="center"  >
              <Checkbox
                className="tableCheckbox"
                  
                  onChange={updateBooleanParamValue(index, "IsRelease")}
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["IsRelease"]
                      : ""
                  }
                />
              </TableCell>
              <StyledTableCell    className={"rowStyle_" + (index % 2)} sx={{ width: '25%' }} align="center" >
                <TextField  className="tableTextField"
                  onChange={updateParamValue(index, "MaxValue")}
                  variant="standard"
                  align="center"
                  id={"rowStyle_" + (index % 2)}

                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["MaxValue"]
                      : ""
                  }
                />
              </StyledTableCell>
              <StyledTableCell id={"rowStyle_" + (index % 2)} sx={{ width: '25%' }} >
                <TextField
                 className="tableTextField"
                  id={"rowStyle_" + (index % 2)}
                  variant="standard"
                  align="center"
                  variant="standard"
                  onChange={updateParamValue(index, "MinValue")}
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["MinValue"]
                      : ""
                  }
                />
              </StyledTableCell>
              <StyledTableCell  id={"rowStyle_" + (index % 2)}>
                <TextField
                className="tableTextField"
                  id={"rowStyle_" + (index % 2)}
                  align="center"
                  variant="standard"
                  onChange={updateParamValue(index, "NotInRangeValue")}
                  variant="standard"
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["NotInRangeValue"]
                      : ""
                  }
                />
              </StyledTableCell>
              <StyledTableCell id={"rowStyle_" + (index % 2)} align="center"   >
              <TextField
              className="tableTextField"
                  onChange={updateParamValue(index, "OperationName")}
                  variant="standard"
                  id={"rowStyle_" + (index % 2)}
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["OperationName"]
                      : ""
                  }
                />
              </StyledTableCell>
              <StyledTableCell
                id={"rowStyle_" + (index % 2)}
              
              >
                <TextField
                  variant="standard"
                className="tableTextField"
                  onChange={updateParamValue(index, "OperationType")}
                  id={"rowStyle_" + (index % 2)}
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["OperationType"]
                      : ""
                  }
                />
              </StyledTableCell>
              <StyledTableCell id={"rowStyle_" + (index % 2)} >
                <TextField
                   variant="standard"
                  className="tableTextField"
                  align="center"
                  onChange={updateParamValue(index, "Value")}
                  id={"rowStyle_" + (index % 2)}
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["Value"]
                      : ""
                  }
                >
                  {" "}
                </TextField>
              </StyledTableCell>
              <StyledTableCell id={"rowStyle_" + (index % 2)}>
                <TextField
                  variant="standard"
                  className="tableTextField"
                  align="center"
                  onChange={updateParamValue(index, "VehicleCommand")}
                  id={"rowStyle_" + (index % 2)}
                  value={
                    buttonRows[index]["DeviceOperation"]
                      ? buttonRows[index]["DeviceOperation"]["VehicleCommand"]
                      : ""
                  }
                >
                  {" "}
                </TextField>
              </StyledTableCell>
              <StyledTableCell   sx={{ width: '1%' }} className="tableTextField" >
                <IconButton
                
                  onClick={() => {
                    handleRemoveItem(
                      buttonRows[index]["DeviceOperation"]["Id"]
                    );
                  }}
                  disabled={buttonRows.length === 1}
                  className="deleStyle"
                >
                  <DeleteIcon align={"center"} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>,
          ])}
        </TableBody>
      </Table>
    </div>
  );
}
