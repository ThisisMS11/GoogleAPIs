import React from 'react'
import { TextField, Checkbox, FormControlLabel, FormGroup,Select,MenuItem } from '../imports/MuiImports';
import { useState } from '../imports/ReactImports'

const FilterBox = () => {

  const [query, setQuery] = useState("");

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const [popularChecked, setPopularChecked] = useState(false);
  const [subscribedChecked, setSubscribedChecked] = useState(false);
  const [favoriteChecked, setFavoriteChecked] = useState(false);

  /* show filters */
  const showfilters = () => {
    console.log({ popularChecked, subscribedChecked, favoriteChecked })
  }


  return (
    <>


      <div className="py-3">
        <div className="relative max-w-xs">
          <label htmlFor="hs-table-search" className="sr-only">Search</label>

          <input type="text" name="hs-table-search" id="hs-table-search" className="p-3 pl-10 bg-gray-100 text-black block w-full border-black rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Search for items"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
            <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>

        </div>
      </div>


      <FormGroup>
        <FormControlLabel
          control={<Checkbox onChange={(e) => setPopularChecked(e.target.checked)} />}
          label="Most Popular"
        />
        <FormControlLabel
          control={<Checkbox onChange={(e) => setSubscribedChecked(e.target.checked)} />}
          label="Most Subscribed"
        />
        <FormControlLabel
          control={<Checkbox onChange={(e) => setFavoriteChecked(e.target.checked)} />}
          label="My favorite Only"
        />
      </FormGroup>


      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <button onClick={showfilters}> click me to see magic</button>
    </>
  )
}

export default FilterBox