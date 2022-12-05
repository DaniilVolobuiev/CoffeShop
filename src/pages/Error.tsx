import React from 'react';
import NotFound from '../components/NotFound';

function Error() {
  return (
    <NotFound
      title={'Ooop, mistake!'}
      text1={'We do not have this page on our website.'}
      text2={'Navigate to the main page and try again.'}
    />
  );
}

export default Error;
