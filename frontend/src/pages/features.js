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

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere delectus ea soluta ipsa
          fugit aspernatur temporibus sunt iste esse quidem. Atque repellendus magni sint officiis
          doloribus quam, aspernatur odio eius.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet explicabo excepturi
          corrupti quia possimus. Recusandae aliquid inventore velit iure temporibus eligendi
          corrupti, sed nisi sit, tempora voluptatem. At quaerat labore exercitationem asperiores,
          nulla mollitia perspiciatis modi aperiam beatae consequatur natus repellendus rem vel
          debitis perferendis fuga hic. Ducimus eum magnam quasi eaque temporibus labore dolor
          alias, voluptas ab corporis nulla.
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae officiis voluptatum unde.
          Sint officiis accusantium laboriosam veniam illum ducimus iure.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, quas illum facere fugit,
          tempore error deserunt maiores aperiam officiis numquam reprehenderit! Maxime iusto
          numquam sed qui, ducimus veritatis est amet! Laborum sed doloremque voluptate laboriosam,
          culpa corrupti similique, adipisci cum debitis, eveniet tempora sint ipsa esse labore
          numquam! Voluptatibus, sint?
        </p>

        <br />

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati voluptas rem
          voluptates inventore eveniet sit, voluptate asperiores quibusdam rerum, suscipit animi, ab
          commodi assumenda tempora. Magnam, eos odit, itaque suscipit eius ex atque nostrum beatae
          cum optio magni rem quas. Ullam neque soluta officiis iure tenetur. Enim quasi velit modi
          temporibus, non optio. Provident illum ducimus inventore impedit. Rerum, labore.
        </p>
      </PageContainer>
      <FooterContainer />
    </>
  );
}
