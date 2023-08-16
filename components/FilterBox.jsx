'use client';
import React from 'react'
import { Checkbox, FormControlLabel, FormGroup, Select, MenuItem, Slider } from '../imports/MuiImports';
import { useState } from '../imports/ReactImports'
import { useRouter } from 'next/navigation'

const countryCodes = {
  Argentina: 'AR',
  Australia: 'AU',
  Austria: 'AT',
  Belgium: 'BE',
  Brazil: 'BR',
  Canada: 'CA',
  Chile: 'CL',
  Colombia: 'CO',
  'Czech Republic': 'CZ',
  Egypt: 'EG',
  France: 'FR',
  Germany: 'DE',
  'United Kingdom': 'GB',
  'Hong Kong': 'HK',
  Hungary: 'HU',
  India: 'IN',
  Indonesia: 'ID',
  Ireland: 'IE',
  Israel: 'IL',
  Italy: 'IT',
  Japan: 'JP',
  Jordan: 'JO',
  'South Korea': 'KR',
  Kuwait: 'KW',
  Lebanon: 'LB',
  Malaysia: 'MY',
  Mexico: 'MX',
  Morocco: 'MA',
  Netherlands: 'NL',
  'New Zealand': 'NZ',
  Nigeria: 'NG',
  Norway: 'NO',
  Peru: 'PE',
  Philippines: 'PH',
  Poland: 'PL',
  Portugal: 'PT',
  'Puerto Rico': 'PR',
  Qatar: 'QA',
  Romania: 'RO',
  Russia: 'RU',
  'Saudi Arabia': 'SA',
  Singapore: 'SG',
  'South Africa': 'ZA',
  Spain: 'ES',
  Sweden: 'SE',
  Switzerland: 'CH',
  Taiwan: 'TW',
  Thailand: 'TH',
  Turkey: 'TR',
  'United Arab Emirates': 'AE',
  'United States': 'US',
  Venezuela: 'VE',
  Vietnam: 'VN',
};

const FilterBox = () => {


  const [country, setCountry] = useState();
  const router = useRouter();

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const [favoriteChecked, setFavoriteChecked] = useState(false);

  /* show filters */
  const showfilters = () => {
    // console.log({ favoriteChecked })
    console.log({ country })
    router.push(`/dashboard/countries/${country}`)
  }


  return (
    <div className='flex flex-col relative  h-[90vh]'>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={(e) => setFavoriteChecked(e.target.checked)} />}
          label="My favorite Only"
        />
      </FormGroup>

      <div className='text-md my-2 font-semibold'>Choose Country</div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={country}
        label="Country"
        onChange={handleChange}
      >
        {Object.keys(countryCodes).map((countryName) => (
          <MenuItem key={countryCodes[countryName]} value={countryCodes[countryName]}>
            {countryName}
          </MenuItem>
        ))}

      </Select>

      {/* Video Categoriea  */}
      <div className='text-md my-2 font-semibold'>Choose Video Category</div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={country}
        label="Age"
        onChange={handleChange}
        className='my-2'
      >
        <MenuItem value={30} defaultChecked>any</MenuItem>
        <MenuItem value={10} >Entertainment</MenuItem>
        <MenuItem value={20}>Science and Technology</MenuItem>
      </Select>

      {/* Video Duration  */}
      <div className='text-md my-2 font-semibold'>
        Choose Video Duration in mins</div>
      <Slider defaultValue={50} max={120} aria-label="Default" valueLabelDisplay="auto" />

      {/* video views */}
      <div className='text-md my-2 font-semibold'>
        Choose Video Views</div>
      <Slider defaultValue={50} max={120} aria-label="Default" valueLabelDisplay="auto" />

      <button onClick={showfilters}
        className='absolute bottom-4 bg-red-500 p-4 text-md rounded-md text-white'>
        Apply Changes
      </button>

    </div>
  )
}

export default FilterBox