import React, { Fragment, useState } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import EventNoteSharpIcon from '@material-ui/icons/EventNoteSharp';

const Header = () => {
  return (
    <div className='head'>
      <h1>
        <a href='/'>
          <EventNoteSharpIcon /> My Notes
        </a>
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
