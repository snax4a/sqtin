import React from 'react';

export function PageContainer({ children, ...restProps }) {
  return (
    <section className="page">
      <div className="container" {...restProps}>
        {children}
      </div>
    </section>
  );
}
