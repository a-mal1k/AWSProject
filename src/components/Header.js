import React, { Fragment, useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const Header = () => {
  return (
    <div className='head'>
      <h1>My Notes</h1>
      <AmplifySignOut />
    </div>
  );
};
export default Header;
