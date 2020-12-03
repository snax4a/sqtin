import React from 'react';
import { NavbarContainer } from '../containers/navbar';
import { FooterContainer } from '../containers/footer';

export default function Features() {
  return (
    <>
      <NavbarContainer />
      <div className="flex">
        <h1>Features</h1>
      </div>
      <FooterContainer />
    </>
  );
}
