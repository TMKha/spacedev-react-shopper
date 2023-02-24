import React from 'react'
import styled from 'styled-components'


const ErrorStyle = styled.span`
  color:red;
  position:absolute;
  top:100%;
  left:230px;
  font-size:0.875rem;
  font-style:italic;

`

export const Field = ({label,error,required,type='text',renderInput,...props}) => {
  return (
    <label className='relative'>
        <p>{label}{required && <span>*</span>}</p>
        {
          renderInput ? renderInput?.(props) :  <input type={type}{...props} />
        }
        {error && <ErrorStyle>{error}</ErrorStyle>}
  </label>
  )
}
