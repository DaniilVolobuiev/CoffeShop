import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={258}
    height={525}
    viewBox="0 0 258 525"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="10" y="13" rx="0" ry="0" width="240" height="360" />
    <rect x="11" y="392" rx="7" ry="7" width="70" height="40" />
    <rect x="179" y="392" rx="7" ry="7" width="70" height="40" />
    <rect x="13" y="492" rx="7" ry="7" width="91" height="24" />
    <rect x="109" y="492" rx="7" ry="7" width="91" height="24" />
    <circle cx="225" cy="487" r="21" />
    <rect x="13" y="463" rx="7" ry="7" width="187" height="24" />
    <rect x="134" y="443" rx="0" ry="0" width="9" height="0" />
  </ContentLoader>
);

export default Skeleton;
