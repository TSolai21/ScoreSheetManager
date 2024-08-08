// import Button from "@/Components/Button/Button";
// import "@/app/styles/portals/_deletePortal.scss";
// const DeleteProtal = ({ isOpen, handleDelete, handleCloseModal, id }) => {
//   if (!isOpen) return null;
//   return ReactDOM.createPortal(
//     <>
//       <div className={"overlay"} onClick={handleCloseModal}></div>
//       <div className={"modal"}>
//         <p>Are you sure want to delete ?</p>
//         <div className={"actions"}>
//           <Button call={handleDelete} arg={id}>
//             Ok
//           </Button>
//           <Button call={handleCloseModal}>Cancel</Button>
//         </div>
//       </div>
//     </>,
//     document.getElementById("portal")
//   );
// };

// export default DeleteProtal;

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "@/components/Button/Button";
import "@/app/styles/portals/_deletePortal.scss";
import Portal from "../Portal";

const DeletePortal = ({ isOpen, handleDelete, handleCloseModal, id }) => {
  if (!isOpen) return null;
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isOpen || !isBrowser) return null;

  return (
    <>
      <Portal>
        <div className="overlay" onClick={handleCloseModal}></div>
        <div className="modal">
          <p>Are you sure want to delete?</p>
          <div className="actions">
            <Button call={handleDelete} arg={id}>
              Ok
            </Button>
            <Button call={handleCloseModal}>Cancel</Button>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default DeletePortal;
