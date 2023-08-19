'use client';
import { Skeleton, Box } from '@mui/material'
import React from 'react'

const Card = () => {
  return (

    <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2, marginX: 2 }}>
      <Skeleton variant="rectangular" width={345} height={500} sx={{ borderRadius: 2 }} />
    </Box>


  )
}

export default Card