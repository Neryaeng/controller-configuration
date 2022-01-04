import React, { useEffect, useRef, useState } from "react";

import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { spacing } from "@mui/system"; 
import MessageSnackBar from "./MessageSnackBar";
import Snackbar from '@mui/material/Snackbar';
import TextField from "@mui/material/TextField";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
 
 export default function UpdateRowsApiRef(props) {
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
const onCellValueChanged = (params) => {
  var changedData = [params.data];
  params.api.applyTransaction({ update: changedData });
};
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
    onCellEditCommit: (params) => { console.log(params)}
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
       
        renderCell: (params) => { 
          const handleRemoveItem = (params) => {
            const id = params.row.id;
             setRows(rows.filter(item => item.id !== id));
           };
          const onClickDelete = async () => (handleRemoveItem(params)); 
          return (
            <><IconButton  disabled={rows.length===1} value="icon of button" onClick={ onClickDelete}
            className="deleStyle"><DeleteIcon align={'center'}  /></IconButton></>
          );
        },
      },
]; 
let idCounter = 0;
const [value,setValue]=useState('');
const createRandomRow = () => {
  idCounter += 1;
  return { id: idCounter+(Math.random(100000)), 
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
   //     Value: "",
        VehicleCommand: "",
        
    
    }
  ]);
  const apiRef = useGridApiRef();

 
  const handleUpdateRow = () => { 
  };

  const handleUpdateAllRows = () => {
    const rowIds = apiRef.current.getAllRowIds();
    apiRef.current.updateRows(
   // rowIds.map((rowId) => ({ id: rowId, username: randomUserName() })),
    );
  };

  const handleDeleteRow = () => {
    const rowIds = apiRef.current.getAllRowIds();
    //const rowId = randomArrayItem(rowIds);

    apiRef.current.updateRows([{ id: Math.random(111), _action: 'delete' }]);
  };

  const handleAddRow = () => {
    setRows([...rows, createRandomRow() ]);
  }; 
  return (
    <div style={{ width: '100%' }}>
     
      <Stack
        sx={{ width: '100%', mb: 1 }}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >
  <div>{JSON.stringify(rows)}</div>
        <Button   className={"addingStyle" }size="small"  onClick={handleAddRow} >
        {[<AddCircleOutlineIcon  />," Add a row " ]}
        </Button>
        {rows[0].Value}
        <Button className={"addingStyle"} size="small"  value={"AAAAS"} >
        {[<SaveIcon  />," Save Settings " ]}
        </Button>
      </Stack>

      <Box className="boxStyle" sx={{   height: 120+(40*(rows.length)) ,bgcolor: 'background.paper' }}>
         <DataGrid  className="buttonsSettingGrid" apiRef={apiRef} hideFooter rows={rows} columns={columns}  
          />
      </Box>
    </div>
  );
}