import React from 'react';
import './styles/card.scss';

export default function Card({ className, children }) {
  const classes = `card ${className}`;
  return <div className={classes}>{children}</div>;
}

Card.Title = function CardTitle({ children, ...restProps }) {
  return (
    <h2 className="card__title" {...restProps}>
      {children}
    </h2>
  );
};
