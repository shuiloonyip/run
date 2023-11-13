import { createPortal } from "react-dom";
import Modal from "../../ui/Modal/Modal";
import RunForm from "../RunForm/RunForm";

function RunFormModal({ onAddRun, onCloseForm }) {
  return createPortal(
    <Modal onCloseForm={onCloseForm}>
      <RunForm onAddRun={onAddRun} onCloseForm={onCloseForm} />
    </Modal>,
    document.getElementById("overlay")
  );
}
export default RunFormModal;
