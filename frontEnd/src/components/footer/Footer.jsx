import React from 'react';

function Footer() {
  return (
    <div className='w-full'>
        <footer className="my-1 text-Text-Color py-4 text-center font-mono">
        <p className="text-xl">© {new Date().getFullYear()} Md Abdullah. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Footer;
