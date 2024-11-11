import React, { useEffect, useState } from 'react';
import { Box, Paper, Pagination, Chip, AppBar, Toolbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import './css/App.css';
import Logo from './asset/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPhone } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [insurance, setInsurance] = useState('');
  const [province, setProvince] = useState('');
  const [laboratoryName, setLaboratoryName] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const handleInsuranceChange = (event) => setInsurance(event.target.value);
  const handleProvinceChange = (event) => setProvince(event.target.value);
  const handleLaboratoryNameChange = (event) => setLaboratoryName(event.target.value);

  const handleSubmit = () => {
    let filtered = cards;
    if (insurance) filtered = filtered.filter(card => card.insurance === insurance);
    if (province) filtered = filtered.filter(card => card.province === province);
    if (laboratoryName) filtered = filtered.filter(card => card.name.includes(laboratoryName));

    setFilteredCards(filtered);
    setCurrentPage(1);

    // Display selected filters as tags
    const tags = [];
    if (insurance) tags.push({ label: `بیمه: ${insurance}`, id: 'insurance' });
    if (province) tags.push({ label: `استان: ${province}`, id: 'province' });
    if (laboratoryName) tags.push({ label: `آزمایشگاه: ${laboratoryName}`, id: 'laboratoryName' });
    setSubmittedData(tags);
  };

  const handleDeleteTag = (tagToDelete) => {
    setSubmittedData((prevData) => prevData.filter((tag) => tag.id !== tagToDelete.id));
    if (tagToDelete.id === 'insurance') setInsurance('');
    if (tagToDelete.id === 'province') setProvince('');
    if (tagToDelete.id === 'laboratoryName') setLaboratoryName('');
    handleSubmit();
  };


  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  useEffect(() => {
    axios.get("http://localhost:3000/Users")
      .then(response => {
        setCards(response.data);
        setFilteredCards(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (event, value) => setCurrentPage(value);

  return (
    <>
      {/* Header */}
      <AppBar position="static" className='header'>
        <Toolbar>
          <img src={Logo} alt='logo' className='logoStyle' />
          <div className='linkParent' style={{ marginRight: '30%' }}>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/react-breadcrumbs/"
              aria-current="page"
              style={{ marginLeft: '20px' }}
            >
              صفحه اصلی
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/react-breadcrumbs/"
              aria-current="page"
              style={{ marginLeft: '20px' }}
            >
              آزمایشگاه
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/react-breadcrumbs/"
              aria-current="page"
              style={{ marginLeft: '20px' }}
            >
              دانش نامه سلامت
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/react-breadcrumbs/"
              aria-current="page"
              style={{ marginLeft: '20px' }}
            >
              بیمه ها
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/react-breadcrumbs/"
              aria-current="page"
              style={{ marginLeft: '20px' }}
            >
              در باره ما
            </Link>
          </div>

          <div className='iconParent'>
            <FontAwesomeIcon icon={faSearch} className='searchIcon' />
            <FontAwesomeIcon icon={faPhone} className='phoneIcon' />
          </div>

          <Button variant="contained" className='loginBtn'>
            ورود | ثبت نام
          </Button>

        </Toolbar>
      </AppBar >

      {/* Main Content */}
      < Box p={4} display="flex" justifyContent="space-between" >

        {/* Right Side */}
        < Box flex={1} mr={1} >
          {/* Selected Filters */}
          < Box className="right-column-boxes" >
            <Paper elevation={3} className="right-column-box" style={{ height: '120px' }}>
              <div className='first-header-right-box'>فیلترهای انتخاب شده</div>
              <div className='chip-container'>
                {submittedData.length > 0 ? (
                  <Stack direction="row" spacing={1} className="chip-container">
                    {submittedData.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.label}
                        onDelete={() => handleDeleteTag(tag)}
                        color="primary"
                        className='textBox-style'
                      />
                    ))}
                  </Stack>
                ) : (
                  <p style={{ color: '#a2a2a2' }}>هیچ فیلتری انتخاب نشده است</p>
                )}
              </div>
            </Paper>
          </Box >

          {/* Search Filters */}
          < Box className="right-column-boxes" >
            <Paper
              elevation={3}
              className="right-column-box"
              style={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
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
                    value={insurance}
                    label="Insurance"
                    onChange={handleInsuranceChange}
                  >
                    <MenuItem value=""><em>بیمه ها</em></MenuItem>
                    <MenuItem value="ایران">ایران</MenuItem>
                    <MenuItem value="کوثر">کوثر</MenuItem>
                    <MenuItem value="ارتش">ارتش</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: '90%', marginTop: '10px' }} size="small">
                  <InputLabel id="province-label">استان</InputLabel>
                  <Select
                    labelId="province-label"
                    id="province"
                    value={province}
                    label="Province"
                    onChange={handleProvinceChange}
                  >
                    <MenuItem value=""><em>استان ها</em></MenuItem>
                    <MenuItem value="تهران">تهران</MenuItem>
                    <MenuItem value="اردبیل">اردبیل</MenuItem>
                    <MenuItem value="اصفهان">اصفهان</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id="outlined-basic"
                  label="نام آزمایشگاه"
                  variant="outlined"
                  value={laboratoryName}
                  onChange={handleLaboratoryNameChange}
                  sx={{ width: '90%', marginTop: '10px' }}
                />
              </div>
              <Button variant="contained" onClick={handleSubmit} className='submitBtn'>اعمال</Button>
            </Paper>
          </Box >
        </Box >

        {/* Left Side */}
        < Box flex={2} mr={3} >
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
          <div className='paginationStyle'>
            <Pagination
              count={Math.ceil(filteredCards.length / cardsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': { color: 'black', borderColor: 'white' },
                '& .MuiPaginationItem-page.Mui-selected': { backgroundColor: '#498d8c70', color: 'black' },
              }}
            />
          </div>
        </Box >

      </Box >
    </>
  );
};

export default App;
