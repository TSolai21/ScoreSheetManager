// components/Portal.js
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const portalRoot = useRef(null);

  useEffect(() => {
    portalRoot.current = document.createElement("div");
    document.body.appendChild(portalRoot.current);

    return () => {
      document.body.removeChild(portalRoot.current);
    };
  }, []);

  return portalRoot.current
    ? ReactDOM.createPortal(children, portalRoot.current)
    : null;
};

export default Portal;
