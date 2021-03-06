import React from 'react';
import { NavbarContainer } from '../containers/navbar';
import { ShowcaseContainer } from '../containers/showcase';
import { StatsContainer } from '../containers/stats';
import { FooterContainer } from '../containers/footer';

export default function Home() {
  return (
    <>
      <NavbarContainer />
      <ShowcaseContainer />
      <StatsContainer />
      <FooterContainer />
    </>
  );
}
