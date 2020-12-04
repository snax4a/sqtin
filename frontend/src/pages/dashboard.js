import React from 'react';
import { NavbarContainer } from '../containers/navbar';
import { PageContainer } from '../containers/page';
import { FooterContainer } from '../containers/footer';

export default function Dashboard() {
  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>Dashboard</h1>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
