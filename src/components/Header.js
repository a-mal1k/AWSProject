import React, { Fragment, useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const Header = () => {
  return (
    <div className='head'>
      <h1>
        <a href='/'>My Notes</a>
      </h1>
      <ul>
        <li>
          <AmplifySignOut />
        </li>
      </ul>
    </div>
  );
};
export default Header;
