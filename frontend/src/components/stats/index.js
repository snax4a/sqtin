import React from 'react';
import './styles/stats.scss';

export default function Stats({ children }) {
  return (
    <section className="stats">
      <div className="container">{children}</div>
    </section>
  );
}

Stats.Header = function StatsHeader({ children, ...restProps }) {
  return (
    <div className="stats__header">
      <h3 {...restProps}>{children}</h3>
    </div>
  );
};

Stats.Row = function StatsRow({ className, children, ...restProps }) {
  const classNames = `stats__row ${className}`;
  return (
    <div className={classNames} {...restProps}>
      {children}
    </div>
  );
};

Stats.Box = function StatsBox({ children, ...restProps }) {
  return (
    <div className="stats__box" {...restProps}>
      {children}
    </div>
  );
};

Stats.IconContainer = function StatsIconContainer({ children, ...restProps }) {
  return (
    <div className="stats__icon" {...restProps}>
      {children}
    </div>
  );
};

Stats.Number = function StatsNumber({ children, ...restProps }) {
  return (
    <h3 className="stats__number" {...restProps}>
      {children}
    </h3>
  );
};

Stats.Description = function StatsDescription({ children, ...restProps }) {
  return <p {...restProps}>{children}</p>;
};
