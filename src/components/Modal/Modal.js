import React, { useRef} from 'react'
import styled from 'styled-components'
import { Close } from '@styled-icons/ionicons-outline/Close'


const CloseModalBtn = styled(Close)`
cursor: pointer;
position: absolute;
top: 1em;
right: 1em;
width: 32px;
heigth: 32px;
padding: 0;
z-index: 20; 

 &:focus,
 &:hover {
     color: #ff6c70;
 }
`;

const ModalBg = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    display: block;
    z-index: 30;
`;

const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25%;
    height: 25%;
    box-shadow: 6px 6px 10px ${({ theme }) => theme.shadow};;
    background: ${({ theme }) => theme.bgModal};
    color: #fafafa;
    z-index: 31;
    border-radius: 20px;
    font-size: 1.2rem;

    @media (max-width: 768px) {
        height: 80%;
        width: 80%;
        font-size: 1rem;
    }
`;

const ModalContent = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
line-height: 1.2;
padding: 20px 50px;
color: #fafafa;
z-index: 32;


p {
    margin-bottom: 0.8rem;
}

button {
    padding: 6px 10px;
    background: #000;
    color: #e1e2e3;
    border: none;
    outline: none;
}
`;

const Modal = ({ showModal, setShowModal }) => {
        const modalRef = useRef();


        const closeModal = (e) => {
            if(modalRef.current === e.target) {
                setShowModal(false);
            }
        };

    return (
        <>
                <ModalBg ref={modalRef} onClick={closeModal}>
                        <ModalWrapper>

                            <ModalContent>
                                <CloseModalBtn aria-label='Close Modal' onClick={() => setShowModal (prev => !prev)} />
                                    <h3>Dont know why i put this in, but now we have it if we want to use it</h3>
                                    <h5>LOOOOOL</h5>
                                </ModalContent>

                        </ModalWrapper>
                </ModalBg>
        </>
     );
}

export default Modal;
