import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from '../Backdrop/Backdrop'


const Modal = React.memo(
  props => {
  //useEffect(() => console.log('it did update'));

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
},
  (prevProps, nextProps) => (prevProps.show === nextProps.show)
);




// const modal = (props) => (
//   <Aux>
//     <Backdrop show={props.show} clicked={props.modalClosed} />
//     <div
//       className={classes.Modal}
//       style={{
//         transform: props.show ? "translateY(0)" : "translateY(-100vh)",
//         opacity: props.show ? "0.9" : "0",
//       }}
//     >
//       {props.children}
//     </div>
//   </Aux>
// );

export default Modal;
