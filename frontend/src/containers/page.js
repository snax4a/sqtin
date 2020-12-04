import React from 'react';

export function PageContainer({ children, ...restProps }) {
  return (
    <section className="page">
      <div className="container flex" {...restProps}>
        {children}
      </div>
    </section>
  );
}
