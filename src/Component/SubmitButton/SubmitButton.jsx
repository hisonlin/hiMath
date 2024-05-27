import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const SubmitButton = ({clickAction}) => {
  return (
    <Button variant="contained" sx={{fontFamily:'Kanit'}} onClick={clickAction}>Submit</Button>
   
  )
}

SubmitButton.propTypes = {

}

export default SubmitButton
