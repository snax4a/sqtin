import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarContainer } from '../containers/navbar';
import { PageContainer } from '../containers/page';
import { FooterContainer } from '../containers/footer';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Dashboard')}</h1>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
