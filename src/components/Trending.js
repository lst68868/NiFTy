import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function createData(id, rank, image, title, floorPrice, volume) {
  return { id, rank, image: image, title: title, floorPrice, volume };
}

const rows = [
  createData(1, 1, "https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png", "This is Title", 19, 500),
  createData(2, 2, "https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png", "This is Title", 20, 450),
  createData(3, 3, "https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png", "This is Title", 22, 600),
  createData(4, 4, "https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png", "This is Title", 18, 700),
  createData(5, 5, "https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png", "This is Title", 24, 550),
  // More rows here...
];


function TrendingTable() {
  const navigate = useNavigate();

  const handleRowClick= (id)=>{
    navigate(`/collection/${id}`)
  }
  return (
    <div style={{ margin: '0 2rem' }}> {/* Add margins here */}
      <TableContainer className='trend-t-container' component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Collection</TableCell>
            <TableCell align="right">Floor Price</TableCell>
            <TableCell align="right">Volume</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                onClick={()=> handleRowClick(row.id)}
                key={row.rank}
                style={{ height: '80px', width: '632px' }}
              > 
                <TableCell component="th" scope="row" style={{ fontSize: '1.5rem' }}>
                  {row.rank}
                </TableCell>
                <TableCell align="left" >
                  <div className="trend_collection">
                    <img  src={row.image} alt="" />
                    <span>{row.title}</span>
                  </div>
                </TableCell>
                <TableCell align="right" style={{ fontSize: '1.5rem' }}>
                  {row.floorPrice}
                </TableCell>
                <TableCell align="right" style={{ fontSize: '1.5rem' }}>
                  {row.volume}
                </TableCell>
              </TableRow>
            
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function Trending() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TrendingTable />
      <TrendingTable />
    </div>
  );
}