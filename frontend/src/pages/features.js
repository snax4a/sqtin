import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarContainer } from '../containers/navbar';
import { FooterContainer } from '../containers/footer';
import { PageContainer } from '../containers/page';

export default function Features() {
  const { t } = useTranslation();

  return (
    <>
      <NavbarContainer />
      <PageContainer>
        <h1>{t('Features')}</h1>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
