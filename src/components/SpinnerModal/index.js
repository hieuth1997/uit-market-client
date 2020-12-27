import React from 'react';
import Modal from 'react-bootstrap4-modal';
import Spinner from 'react-spinkit';
import './style.scss';

function SpinnerModal(props) {
  const { visible, className, dialogClassName, message, hideTextSync } = props;
  return (
    <Modal
      visible={visible}
      className={`spinner-modal ${className}`}
      dialogClassName={`modal-dialog-centered ${dialogClassName}`}
    >
      <div className="modal-body">
        <div className="d-flex justify-content-center">
          <Spinner
            name="circle"
            className="spinner"
            color="orange"
          />
        </div>
        <div className="d-flex justify-content-center text-white">
          Please wait ...
        </div>
      </div>
    </Modal>
  );
}
export default SpinnerModal;
