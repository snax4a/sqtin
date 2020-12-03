import React from 'react';
import { Link } from 'react-router-dom';
import './styles/showcase.scss';

export default function Showcase({ children }) {
  return (
    <section className="showcase">
      <div className="container grid">{children}</div>
    </section>
  );
}

Showcase.Column = function ShowcaseColumn({ children, ...restProps }) {
  return (
    <div className="showcase__column" {...restProps}>
      {children}
    </div>
  );
};

Showcase.Title = function ShowcaseTitle({ children, ...restProps }) {
  return <h1 {...restProps}>{children}</h1>;
};

Showcase.Text = function ShowcaseText({ children, ...restProps }) {
  return <p {...restProps}>{children}</p>;
};

Showcase.ButtonLink = function ShowcaseButtonLink({ children, ...restProps }) {
  return (
    <Link className="btn btn-outline" {...restProps}>
      {children}
    </Link>
  );
};
