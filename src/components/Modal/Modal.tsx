import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import './Modal.scss'
import CloseIcon from '../SVG/CloseIcon'

interface IModalProps {
  isShowing: boolean;
  hide: () => void;
  content?:  JSX.Element;
  id?: string;
  theme?: string;
}

const Modal: React.FC<IModalProps> = ({ isShowing, hide, content, id, theme }) => {

  useEffect(() => {
    const close : (this: Window, ev: KeyboardEvent) => unknown = (e) => {
      if(e.key === 'Escape'){
        hide()
      }
    }
    window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
},[hide]);

  return (
    isShowing ? ReactDOM.createPortal(
          <>
            <div className="modal-overlay">
              <div className="modal-wrapper" data-theme={theme} onClick={(e) => {
                // pour fermer la modale si on clique a l'exterieur
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              if (e.target === e.currentTarget) {
                hide();
              }
            }}>
                <div className="modal" onKeyDown={(e)=> {
                }}>
                  <div className="modal-header" id={id}>
                    <div
                      className="modal-close-button"
                      onClick={hide}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                  <div className="modal-body">{content}</div>
                </div>
              </div>
            </div>
          </>, document.body) : null
          )
}

export default Modal
