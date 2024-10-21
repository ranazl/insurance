import React, { useEffect, useState } from 'react';
import { Box, Paper, Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import './css/App.css';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const App = () => {
  const [handleDropBox, setHandleDropBox] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setHandleDropBox(event.target.value);
  };

  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;  // Set how many cards per page you want

  useEffect(() => {
    axios.get("http://localhost:3000/Users")
      .then(response => {
        const insurance = response.data;
        setCards(insurance);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  // Calculate the slice indexes based on current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page
  };

  return (
    <Box p={4} display="flex" justifyContent="space-between">
      {/* Left Side */}
      <Box flex={2} mr={3}>
        <div>
        <Paper elevation={3} className="left-column leftBox">
          {currentCards.map((card) => (
            <Stack spacing={2} key={card.id}>
              <div className='laboratoryCard'>
                <h4>{card.name}</h4>
                <p>{card.address}</p>
                <p>{card.phone}</p>
              </div>
            </Stack>
          ))}
        </Paper>
        </div>
        {/* Pagination */}
        <div className='paginationStyle'>
        <Pagination
          count={Math.ceil(cards.length / cardsPerPage)} // Total number of pages
          page={currentPage}  // Current page number
          onChange={handlePageChange}  // Handle page change
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'black',
              borderColor: 'white',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#498d8c70',
              color: 'black',
            }
          }}
        />
        </div>
      </Box>

      {/* Right Side */}
      <Box flex={1}>
        <Box className="right-column-boxes">
          <Paper elevation={3} className="right-column-box" style={{ height: '120px' }}>
            <div className='first-header-right-box'>فیلترهای انتخاب شده</div>
            <div className='text-box'>Right Side (Box 1)</div>
          </Paper>
        </Box>
        <Box className="right-column-boxes">
          <Paper
            elevation={3}
            className="right-column-box"
            style={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Vertically center
              alignItems: 'center',     // Horizontally center
              padding: '20px',
            }}
          >
            <div className="first-header-right-box" style={{ textAlign: 'center' }}>جستجو آزمایشگاه</div>

            <div className="text-box" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl sx={{ width: '90%' }} size="small">
                <InputLabel id="insurance-label">نام بیمه</InputLabel>
                <Select
                  labelId="insurance-label"
                  id="insurance"
                  value={handleDropBox}
                  label="HandleDropBox"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>بیمه ها</em>
                  </MenuItem>
                  <MenuItem value={10}>ایران</MenuItem>
                  <MenuItem value={20}>کوثر</MenuItem>
                  <MenuItem value={30}>ارتش</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: '90%', marginTop: '10px' }} size="small">
                <InputLabel id="province-label">استان</InputLabel>
                <Select
                  labelId="province-label"
                  id="province"
                  value={handleDropBox}
                  label="HandleDropBox"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>استان ها</em>
                  </MenuItem>
                  <MenuItem value={10}>تهران</MenuItem>
                  <MenuItem value={20}>اردبیل</MenuItem>
                  <MenuItem value={30}>اصفهان</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="نام آزمایشگاه"
                variant="outlined"
                sx={{ width: '90%', marginTop: '10px' }}
              />
            </div>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
