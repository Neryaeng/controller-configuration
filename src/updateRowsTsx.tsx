import React, { useEffect, useRef, useState } from "react";

import { DataGrid,GridCellEditCommitParams, useGridApiRef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { spacing } from "@mui/system"; 
import MessageSnackBar from "./MessageSnackBar";
import Snackbar from '@mui/material/Snackbar';
import TextField from "@mui/material/TextField";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
 
 export default function UpdateRowsApiRefTsx(props) {

  const [rows, setRows] = useState([
    {
        id: 0,
        IsInvert:false,
        IsRelease: false,
        MaxValue: 0,
        MinValue: 0,
        NotInRangeValue: 0,
        OperationName: "",
        OperationType: "",
        Value: "",
        VehicleCommand: "", 
    }
  ]); 

  const handleCommit  = (e:GridCellEditCommitParams)=>{
    const array = rows.map(r=>{
      if(r.id === e.id){
        return{...r,[e.field]:e.value}
      }
      else{
        return {...r}
      }
    });
    setRows(array);
  }
  
const styles = theme => ({
  disabledButton: {
    backgroundColor: theme.palette.primary || 'red'
  }
});
function showSnackbarMessage(){
return(
  <div>
  <span>aaa</span></div>
  )
}
const updateFieldValue = (index, propertyName) => (params) => {
  let newRows = [...rows]; // copying the old datas array
  newRows[index][propertyName] = params.row.propertyName;
};
const updateFieldBooleanValue = (index, propertyName) => (e) => {
  let newRows = [...rows]; // copying the old datas array
  newRows[index][propertyName] = e.target.checked;
};
const columns = [
  { field: 'IsInvert', headerName: 'Is Invert', width: 85,type: 'boolean',editable: true },
  { field: 'IsRelease', headerName: 'Is Release', width: 95,type: 'boolean', editable: true },
  {
    field: 'MaxValue',
    headerName: 'Max Value',
	type: 'number' ,
    width: 100,
    editable: true,
   },
    {
    field: 'MinValue',
    headerName: 'Min Value',
	type: 'number' ,
    width: 95,
    editable: true,
 
  },
  {
    field: 'NotInRangeValue',
    headerName: 'Not In Range Value',
	type: 'number' ,
    width: 150,
    editable: true, 
   },
  {
    field: 'OperationName',
    headerName: 'Operation Name',
    width: 140,
    editable: true,
 
  },
  {
    field: 'OperationType',
    headerName: 'Operation Type',
    width: 125,
    editable: true,
    
  },
  {
    field: 'Value',
    headerName: 'Value',
    width: 65,
    editable: true,
    renderCell: (params) => { 
      const handleChange = (index,propertyName) => (params) => {
        let newRows = [...rows]; 
        newRows[index][propertyName] = params.row.Value;
       }; return (
        <> <TextField  value={params.row.Value}  onChange={handleChange(0,"Value")}
       > </TextField>   </>
      );
    },
  
  },
  {
    field: 'VehicleCommand',
    headerName: 'Vehicle Command',
    width: 145,
    editable: true,
     
  },
  {
        field: 'Delete',
        headerName: 'Delete',
        width: 70,
        sortable: false,
        
      },
]; 
let idCounter = 0;
const [value,setValue]=useState('');
const createRandomRow = () => {
  idCounter += 1;
  return { id: idCounter+(Math.random()), 
    IsInvert:false,
    IsRelease: false,
    MaxValue: "",
    MinValue: "",
    NotInRangeValue: "",
    OperationName: "",
    OperationType: "",
    Value: "",
    VehicleCommand: ""
};
}; 
/*
  const handleAddRow = () => {
    setRows([...rows, createRandomRow]);
  }; */
  return (
    <div style={{ width: '100%' }}>
     
      <Stack
        sx={{ width: '100%', mb: 1 }}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >
  <div>{JSON.stringify(rows)}</div>
        <Button   className={"addingStyle" }size="small"  >
        {[<AddCircleOutlineIcon  />," Add a row " ]}
        </Button>
        {rows[0].Value}
        <Button className={"addingStyle"} size="small"  value={"AAAAS"} >
        {[<SaveIcon  />," Save Settings " ]}
        </Button>
      </Stack>

      <Box className="boxStyle" sx={{   height: 120+(40*(rows.length)) ,bgcolor: 'background.paper' }}>
         <DataGrid onCellEditCommit={handleCommit} className="buttonsSettingGrid"  hideFooter rows={rows} columns={columns}  
          />
      </Box>
    </div>
  );
}