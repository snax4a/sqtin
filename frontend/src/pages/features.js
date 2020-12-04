import React from 'react';
import { NavbarContainer } from '../containers/navbar';
import { FooterContainer } from '../containers/footer';
import { PageContainer } from '../containers/page';

export default function Features() {
  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>Features</h1>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
