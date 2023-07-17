import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState, useEffect } from "react";

const BACKEND_URL = "https://nft-mint-api-824f9dc02cba.herokuapp.com/";
const route = "trending/";

function NFTTrending() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL + route);
        const trending_nfts = response.data.slice(0, 10);
        setCards(trending_nfts);
      } catch (error) {
        console.error("Failed to fetch NFTs", error);
      }
    };

    fetchData();
  }, []);

  return cards; // Return cards state
}

function TrendingTable({ rows }) {
  // Accept rows as a prop
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/collection/${id}`);
  };
  return (
    <div>
      <TableContainer className="trend-t-container" component={Paper}>
        <Table md={{ minWidth: 650 }} aria-label="a dense table">
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
              <TableRow onClick={() => handleRowClick(row.id)} key={row.rank}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "1.5rem" }}
                >
                  {row.rank}
                </TableCell>
                <TableCell align="left">
                  <div className="trend_collection">
                    <img src={row.image_link} alt="" />
                    <span>{row.title}</span>
                  </div>
                </TableCell>
                <TableCell align="right" style={{ fontSize: "1.5rem" }}>
                  {row.floorPrice}
                </TableCell>
                <TableCell align="right" style={{ fontSize: "1.5rem" }}>
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
  const cards = NFTTrending(); // Store the cards returned by NFTTrending

  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item md={6} className="table-main-container">
          <TrendingTable rows={cards} /> {/* Pass cards as a prop */}
        </Grid>
        <Grid item md={6} className="table-main-container">
          <TrendingTable rows={cards} /> {/* Pass cards as a prop */}
        </Grid>
      </Grid>
    </Container>
  );
}
