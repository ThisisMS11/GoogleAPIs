'use client';
import React from 'react'
import { Checkbox, FormControlLabel, FormGroup, Select, MenuItem, Slider } from '../imports/MuiImports';
import { useState } from '../imports/ReactImports'
import { useRouter } from 'next/navigation'

const countryCodes = {
  All: 'ALL',
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

const selectedVideoCategories = {
  'All': 0,
  'Film & Animation': 1,
  'Autos & Vehicles': 2,
  Music: 10,
  'Pets & Animals': 15,
  Sports: 17,
  Gaming: 20,
  Comedy: 23,
  'News & Politics': 25,
  'Science & Technology': 28,
};

const FilterBox = () => {


  const [country, setCountry] = useState('');
  const [videoCategory, setVideoCategory] = useState('');
  const router = useRouter();

  const [favoriteChecked, setFavoriteChecked] = useState(false);

  /* show filters */
  const showfilters = () => {
    // console.log({ favoriteChecked })
    // console.log({ country, videoCategory })

    if (country !== '' && country !== 'ALL' && videoCategory !== '' && videoCategory !== 0) {
      router.push(`/dashboard/countries?country=${country}&videoCategory=${videoCategory}`)
    }
    else if ((videoCategory !== '' && videoCategory !== 0) && (country === '' || country === 'ALL')) {
      router.push(`/dashboard/countries?videoCategory=${videoCategory}`)
    }
    else if ((country !== '' && country !== 'ALL') && (videoCategory === '' || country !== '')) {
      router.push(`/dashboard/countries?country=${country}`)
    } else {
      router.push(`/dashboard/countries`)
    }
  }


  return (
    <div className='flex flex-col relative  h-[90vh]'>

      <div className='text-md my-2 font-semibold'>Choose Country</div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={country}
        label="Country"
        onChange={(e) => setCountry(e.target.value)}
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
        value={videoCategory}
        label="videoCategory"
        onChange={(e) => setVideoCategory(e.target.value)}
        className='my-2'
      >
        {Object.keys(selectedVideoCategories).map((videoCategory) => (
          <MenuItem key={selectedVideoCategories[videoCategory]} value={selectedVideoCategories[videoCategory]}>
            {videoCategory}
          </MenuItem>
        ))}
      </Select>


      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={(e) => setFavoriteChecked(e.target.checked)} />}
          label="My favorite Only"
        />
      </FormGroup>

      {/* Video Duration  */}
      {/* <div className='text-md my-2 font-semibold'>
        Choose Video Duration in mins</div>
      <Slider defaultValue={50} max={120} aria-label="Default" valueLabelDisplay="auto" /> */}

      {/* video views */}
      {/* <div className='text-md my-2 font-semibold'>
        Choose Video Views</div>
      <Slider defaultValue={50} max={120} aria-label="Default" valueLabelDisplay="auto" /> */}

      <button onClick={showfilters}
        className='absolute bottom-4 bg-red-500 p-4 text-md rounded-md text-white' data-hs-overlay="#navbar-secondary-content">
        Apply Changes
      </button>

    </div>
  )
}

export default FilterBox