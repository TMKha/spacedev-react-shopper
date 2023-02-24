import React from 'react'
import { createPortal } from 'react-dom'

export const VideoModal = ({maskeCloseable,visible,onCancel}) => {
    const onMaskClick = () =>{
        if(maskeCloseable){
            onCancel?.()
        }
    }

    if(!visible) return null

  return createPortal (
    <div className="popup-video" onClick={onMaskClick} >
    <div className="wrap">
      <iframe width="800" height="450" src="https://www.youtube.com/embed/rMbF5gVk2g4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div className="close" onClick={onCancel} />
  </div>,
     document.body
  )
}
