import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonCheckOut = () => (
  <ContentLoader
    speed={3}
    width={684}
    height={68}
    viewBox="0 0 684 68"
    backgroundColor="#8c8c8c"
    foregroundColor="#4caf50">
    <rect x="18" y="9" rx="5" ry="5" width="38" height="57" />
    <rect x="75" y="12" rx="5" ry="5" width="400" height="19" />
    <rect x="75" y="39" rx="0" ry="0" width="150" height="20" />
    <rect x="632" y="27" rx="5" ry="5" width="43" height="20" />
  </ContentLoader>
);
