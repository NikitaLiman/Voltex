import React from 'react';

import Styles from '../page.module.scss';
import Link from 'next/link';

export default function page() {
  return (
    <div className={Styles.NotAuth}>
      <h1>U need to login</h1>
      <Link href="/">
        <button>Home</button>
      </Link>
    </div>
  );
}
