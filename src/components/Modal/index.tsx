import ReactModal from 'react-modal'

import { IoCloseCircleOutline } from "react-icons/io5";

import { CloseButton, Details } from './styles';

type Props = {
  isOpen: boolean
  onRequestClose: () => void
  contentLabel?: string
  children: React.ReactNode
}

export const Modal = ({ isOpen, onRequestClose, contentLabel, children }: Props) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '90vh',
      borderRadius: '20px',
      window: '50%',
      boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.4)'
    }
  }

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} style={customStyles}>   
      <Details>
        <CloseButton>
          <IoCloseCircleOutline size={30} />
        </CloseButton>
      </Details>  
      {children}
    </ReactModal>
  )
}

