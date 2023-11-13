import styles from "./Modal.module.css";

function Modal({ onCloseForm, children }) {
  function handleCloseForm() {
    onCloseForm();
  }

  return (
    <div className={styles.modal} onClick={handleCloseForm}>
      <div className={styles.container}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </div>
  );
}
export default Modal;
