import React from "react";

const Bento: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor"/>
  </svg>
);

export default Bento; 