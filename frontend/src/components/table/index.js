import React from 'react';
import { Loader } from 'components';

export default function Table({ children, ...restProps }) {
  return <table {...restProps}>{children}</table>;
}

Table.Head = function TableHead({ children, ...restProps }) {
  return <thead {...restProps}>{children}</thead>;
};

Table.Body = function TableBody({ children, ...restProps }) {
  return <tbody {...restProps}>{children}</tbody>;
};

Table.Foot = function TableFoot({ children, ...restProps }) {
  return <tfoot {...restProps}>{children}</tfoot>;
};

Table.NoRecords = function TableNoRecords({ children, ...restProps }) {
  return (
    <tr>
      <td className="text-center py-3" colSpan="4" {...restProps}>
        There are no records yet.{children}
      </td>
    </tr>
  );
};

Table.Loader = function TableLoader({ children, ...restProps }) {
  return (
    <tr>
      <td className="text-center py-3" colSpan="4" {...restProps}>
        <Loader style={{ width: 25, height: 25 }} />
      </td>
    </tr>
  );
};
