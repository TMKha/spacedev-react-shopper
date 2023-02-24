import { createPortal } from "react-dom"

export const Modal = ({children,maskeCloseable,visible,onCancel}) => {
    const onMaskClick = () =>{
        if(maskeCloseable){
            onCancel?.()
        }
    }

    if(!visible) return null
  return createPortal(
    <div className="popup-video" onClick={onMaskClick} >
    <div className="wrap">
        {children}
    </div>
    <div className="close" onClick={onCancel} />
  </div>,
  document.body // render ở body
  )
}
