import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={4}
    width={600}
    height={109}
    viewBox="0 0 600 109"
    backgroundColor="#8c8c8c"
    foregroundColor="#4caf50">
    <rect x="51" y="540" rx="0" ry="0" width="0" height="2" />
    <rect x="30" y="7" rx="18" ry="18" width="57" height="100" />
    <rect x="97" y="44" rx="5" ry="5" width="370" height="26" />
    <rect x="488" y="22" rx="5" ry="5" width="51" height="19" />
    <rect x="530" y="53" rx="0" ry="0" width="13" height="0" />
    <rect x="519" y="66" rx="0" ry="0" width="1" height="0" />
    <rect x="472" y="47" rx="10" ry="10" width="85" height="38" />
    <rect x="491" y="104" rx="0" ry="0" width="5" height="1" />
  </ContentLoader>
);

export default Skeleton;
