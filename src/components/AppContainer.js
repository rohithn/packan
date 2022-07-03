import { Button, TextareaAutosize, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import * as React from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://rohithn.com/">
        rohithn.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AppContainer() {
  const [value, setValue] = React.useState(0);
  const [textValue, setTextValue] = React.useState("");
  const [parsedDependencies, setParsedDependencies] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleManualInputChange = (event) => {
    setTextValue(event.target.value);
  };

  const onParse = () => {
    const data = JSON.parse(textValue);
    const dependencies = data.dependencies;
    let parsedDeps = [];
    let index = 0;
    for (let lib in dependencies) {
      parsedDeps.push({
        index,
        library: lib,
        version: dependencies[lib],
      });
      index += 1;
    }

    setParsedDependencies(parsedDeps);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Package Analyzer
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h5"
              align="left"
              color="text.secondary"
              paragraph
            >
              Step 1: Select the package.json
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Manual Entry" {...a11yProps(0)} />
                  <Tab label="Upload a File" {...a11yProps(1)} />
                  <Tab label="Pull from URL" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={20}
                  placeholder="Paste your package.json"
                  value={textValue}
                  onChange={handleManualInputChange}
                  style={{ width: "100%" }}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
            </Box>
            <Box>
              <Typography variant="h5" align="left" color="text.secondary">
                Step 2: Generate parsed output
              </Typography>
              <Button variant="outlined" onClick={onParse} sx={{ mt: 3 }}>
                Parse
              </Button>
              <Box sx={{ pt: 3, pb: 3 }}>
                {parsedDependencies && (
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="dependencies table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Library</TableCell>
                          <TableCell>Version</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {parsedDependencies.map((row) => (
                          <TableRow
                            key={row.index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.library}
                            </TableCell>
                            <TableCell>{row.version}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
        {/* End hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md"></Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
