import React, { useEffect, useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useGamepads } from "react-gamepads";
import { Grid } from "@mui/material";
import MainMenu from "./MainMenu";
import Accordion from "@mui/material/Accordion";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
 import {  GiSteeringWheel } from "react-icons/gi";
 import { BiJoystickButton} from "react-icons/bi";
 import Checkbox from '@mui/material/Checkbox';

import controllerIMg from "./images/xbox.png";
//import USB Gamepad (Vendor_0810 Product_0001) from "./Assets/USB Gamepad (Vendor_0810 Product_0001).png";
//UpdateRowsApiRef
import UpdateRowsApiRef from "./UpdateRow";
import ButtonsTable from "./ButtonsTable";

function download(filename, text) {
  var blob = new Blob([text], { type: "text/plain" });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 12,
    backgroundColor: "rgb(33,32,64)",
    color: theme.palette.common.white,
    border: "0px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: theme.palette.common.white,
    border: "0px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {},
}));
export default function ConfigurationMenu({ gamepads }) {
  //function ConfigurationMenu() {
  const requestRef = useRef();
  const [configurationJsonList, setConfigurationJsonList] = useState([]);
  const [configurationJsonListButtons, setConfigurationJsonListButtons] =
    useState([]);
  const [gamePadsAmount, setGamePadsAmount] = useState(0);
  const [action, setAction] = React.useState("");
  const [data, setData] = useState("");
  const [selectedGamepad, setSelectedGamepad] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

  const updateJSONObjValue = (index, propertyName) => (e) => {
    let newArr = [...configurationJsonList]; // copying the old datas array
    newArr[index]["KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"][
      "Value"
    ][propertyName] = e.target.value;
  };
  const updateJSONBooleanObjValue = (index, propertyName) => (e) => {
    let newArr = [...configurationJsonList]; // copying the old datas array
    newArr[index]["KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"][
      "Value"
    ][propertyName] = e.target.checked;
  };
  const updateJSONObjButtonValue = (index, jsonText) => () => {
    let newArr = [...configurationJsonListButtons]; // copying the old datas array
    configurationJsonListButtons[0][
      "KeyValueOfDeviceDrivingOperationDriverOperationYpjuv_PMd"
    ]["Value"] = jsonText;
  };
  const updateJSONBooleanObjButtonValue = (index, propertyName) => (e) => {
    let newArr = [...configurationJsonListButtons]; // copying the old datas array
    newArr[index]["KeyValueOfDeviceDrivingOperationDriverOperationYpjuv_PMd"][
      "Value"
    ]["DeviceOperation"][propertyName] = e.target.checked;
  };
  const axesTableParameters = [
    "",
    "TYPE",
    "AFFECTED",
    "COMBINATION",
    " DEAD ZONE",
    "ID",
    "IS REVERSED",
    "MAX",
    "MIN",
  ];
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
  ];
  const actions = [
    { value: "Steer", label: "Steer" },
    { value: "Gas", label: "Gas" },
    { value: "Break", label: "Break" },
  ];
  const axesList = ["X Axis", "Y Axis", "Z Axis", "Z Rotation", "POV"];

  useEffect(() => {
    gamepads.length &&
      gamepads.map((gp) => {
        if (gamepads.length > gamePadsAmount) {
          setGamePadsAmount(gamepads.length);
          actions.map((action, index) => {
            addAxisItem(action, index);
          });
          gp.buttons.map((button, index) => {
            addButtonItem(button, index);
          });
        }
      });
  }, [gamepads]);
  const addAxisItem = (action, index) => {
    setConfigurationJsonList((configurationJsonList) => [
      ...configurationJsonList,
      {
        KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd: {
          Key: action.label,
          Value: {
            AffectedOperation: false,
            CombinationButtons: false,
            DeadZone: "",
            Id: "",
            IsReversed: false,
            Name: "",
            Xmax: "",
            Xmin: "",
          },
        },
      },
    ]);
  };
  //Gear Level Command,
  //const [stateObj, setStateObj] = useState({first:'foobar', second:'barfoo'});

  const addButtonItem = (button, index) => {
    setConfigurationJsonListButtons((configurationJsonListButtons) => [
      ...configurationJsonListButtons,
      {
        KeyValueOfDeviceDrivingOperationDriverOperationYpjuv_PMd: {
          Key: {
            int: parseInt(index),
          },
          Value: {},
        },
      },
    ]);
  };

  if (!gamepads) return "";
  return (
    <>
      <div className="container">
        {({ gamepads }) => {
          return (
            <div>
              <h2>{gamepads[0].id}</h2>
            </div>
          );
        }}
        {gamepads.length &&
          gamepads.map((gp) => {
            return (
              <Grid className="container" container spacing={0}>
                <div>
                  <br />
                </div>
                <Grid className="container" item xs={9}>
                  <FormControl className="container">
                    <span className="noSpacesStyle">
                      <h1 className="noSpacesStyle" id="pageTitle">
                        {" "}
                        Controller Settings
                      </h1>
                      <h3 className="noSpacesStyle" align="center">
                        <ArrowDownwardIcon />
                        {"   Select Device   "}
                        <ArrowDownwardIcon />
                      </h3>
                    </span>
                    {
                      //<TextField className={selectedGamepad === "" ? "glow" : ""} id={"selectboxStyle"} select value={(gamepads.length===1&&gamepads[0]!==undefined)?(gamepads[0].id):selectedGamepad}
                    }
                    <TextField
                      className={selectedGamepad === "" ? "glow" : ""}
                      id={"selectboxStyle"}
                      select
                      value={selectedGamepad}
                      onChange={(e) => setSelectedGamepad(e.target.value)}
                      variant="standard"
                    >
                      {gamepads.map((gamepad, index) => (
                        <MenuItem
                          id={"rowStyle_" + (index % 2)}
                          value={gamepad.id}
                        >
                          {gamepad.id}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TableContainer
                      className="tableContainerStyle"
                      component={Paper}
                    >
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          // className="mainPageStyle"
                        >
                          <Typography className="mainPageStyle">
                            <b><GiSteeringWheel className="iconsStyle"/>&nbsp; Driving Operation Settings </b>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                {axesTableParameters.map(
                                  (axisParameter, index) => (
                                    <StyledTableCell align="center">
                                      {axisParameter}
                                    </StyledTableCell>
                                  )
                                )}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {configurationJsonList.map((jsonObj, index) => [
                                <StyledTableRow
                                  className={"rowStyle_" + (index % 2)}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <StyledTableCell
                                    padding={"normal"}
                                    id={"rowStyle_" + (index % 2)}
                                    component="th"
                                    scope="row"
                                  >
                                    {
                                      jsonObj[
                                        "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                      ]["Key"]
                                    }
                                  </StyledTableCell>
                                  <StyledTableCell
                                    id={"rowStyle_" + (index % 2)}
                           
                                  >
                                    <TextField
                                      id={"rowStyle_" + (index % 2)}
                                      className={"rowStyle_" + (index % 2)}
                                      select
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["Name"]
                                      }
                                      onChange={updateJSONObjValue(
                                        index,
                                        "Name"
                                      )}
                                      variant="standard"
                                    >
                                      {axesList.map((option) => (
                                        <MenuItem id={"rowStyle_" + (index % 2)}
                                          value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </StyledTableCell>
                                  <StyledTableCell align="center" width={"5%"}>
                                    <Checkbox
                                      type="checkbox"
                                      className="tableCheckbox"
                                      onChange={updateJSONBooleanObjValue(
                                        index,
                                        "AffectedOperation"
                                      )}
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["AffectedOperation"]
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell align="center" width={"5%"}>
                                    <Checkbox
                                    className="tableCheckbox"
                                      type="checkbox"
                                      onChange={updateJSONBooleanObjValue(
                                        index,
                                        "CombinationButtons"
                                      )}
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["CombinationButtons"]
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell width={"15%"}>
                                    <TextField
                                      id={"rowStyle_" + (index % 2)}
                                      align="center"
                                      variant="standard"
                                      onChange={updateJSONObjValue(
                                        index,
                                        "DeadZone"
                                      )}
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["DeadZone"]
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell width={"10%"}>
                                    <TextField
                                      id={"rowStyle_" + (index % 2)}
                                      align="center"
                                      variant="standard"
                                      onChange={updateJSONObjValue(index, "Id")}
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["Id"]
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell align="center" width={"5%"}>
                                    <Checkbox
                                    className="tableCheckbox"
                                      type="checkbox"
                                      onChange={updateJSONBooleanObjValue(
                                        index,
                                        "IsReversed"
                                      )}
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["IsReversed"]
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell  width={"10%"} > 
                                    <TextField variant="standard"
                                      onChange={updateJSONObjValue(
                                        index,
                                        "Xmax"
                                      )}
                                      id={"rowStyle_" + (index % 2)}
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["Xmax"]
                                      }
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell
                                    width={"13%"}
                                    className="tableTextField"
                                  >
                                    <TextField
                                      className="tableTextField"
                                      align="center"
                                      variant="standard"
                                      onChange={updateJSONObjValue(
                                        index,
                                        "Xmin"
                                      )}
                                      id={"rowStyle_" + (index % 2)}
                                      value={
                                        configurationJsonList[index][
                                          "KeyValueOfDeviceDrivingOperationDriverOperationXouiSpMd"
                                        ]["Value"]["Xmin"]
                                      }
                                    ></TextField>
                                  </StyledTableCell>
                                </StyledTableRow>,
                              ])}
                            </TableBody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                      {
                        
                        //BUTTONS TABLE
                      }
                      <Accordion disabled={false}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="mainPageStyle">
                            <b> <BiJoystickButton className="iconsStyle"/>&nbsp;Buttons Settings </b>
                          </Typography>
                        </AccordionSummary>
                        <div>
                          {JSON.stringify(configurationJsonListButtons)}
                        </div>
                        <AccordionDetails>
                          {actions.map((button, index) => (
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id={"button_" + index + "_Section"}
                              >
                                <Typography className="mainPageStyle">
                                  {"Button " + ++index}{" "}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {
                                  // <UpdateRowsApiRef  updateJSONObjButtonValue={updateJSONObjButtonValue}/>
                                }
                                <ButtonsTable
                                  index={index}
                                  updateJSONObjButtonValue={
                                    updateJSONObjButtonValue
                                  }
                                />
                              </AccordionDetails>
                            </Accordion>
                          ))}

                         
                        </AccordionDetails>
                      </Accordion>
                    </TableContainer>
                    <Button
                      type="submit"
                      variant="contained"
                      color={"secondary"}
                      disabled={"" === selectedGamepad}
                      onClick={(e) => {
                        //  download("text.json", JSON.stringify(configurationJsonList));
                        download(
                          selectedGamepad + ".json",
                          '{"DeviceDrivingOperationBinding":' +
                            JSON.stringify(configurationJsonList, null, " ") +
                            "}"+ '{"DeviceOperationDictionaryBinding":' + JSON.stringify(configurationJsonListButtons, null, " ") +
                            "}"
                        );
                      }}
                    >
                      Genereta Configuration File
                    </Button>
                  </FormControl>
                </Grid>
                <Grid className="controllerLayoutDiv" item xs={3}>
                  <MainMenu
                    selectedGamepad={selectedGamepad}
                    gamepads={gamepads}
                  />
                  <br />
                  <div  id='justifyContentCenter'>
                  <img align='center' width='95%'src={controllerIMg}/>
                    </div>
                </Grid>
              </Grid>
            );
          })}
      </div>
    </>
  );
}

//export default ConfigurationMenu;
