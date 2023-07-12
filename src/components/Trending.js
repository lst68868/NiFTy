import React from 'react'
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Container from '@mui/material/Container';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Trending() {
  return ( 
    <div>

      {/* Filter Section */}
      <section>
        <h3> Trending </h3>
      </section>
      {/* collection section */}
      <section>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell align="right">Collection</TableCell>
                    <TableCell align="right">Floor Price</TableCell>
                    <TableCell align="right">Volume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        style={{ borderBottom: "none" }}
                        component="th"
                        scope="row"
                      >
                        {index}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }} align="right">
                        <img style={{ width: "50px", height: "50px" }} src="https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png" alt="" />
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }} align="right">
                        {row.fat}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }} align="right">
                        {row.carbs}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>
      </section>    </div>
  );


}

export default Trending;


