import React from 'react';

const Table = ({ columns = [], data = [], className = '', striped = true }) => {
  return (
    <div className={w-full overflow-x-auto border border-gray-800 rounded-xl bg-gray-900/40 backdrop-blur-md \}>
      <table className=\"w-full text-left font-mono text-xs border-collapse\">
        <thead>
          <tr className=\"border-b border-gray-800 bg-gray-950/80 text-gray-400 uppercase tracking-wider\">
            {columns.map((col, idx) => (
              <th key={col.key || idx} className=\"px-4 py-3 font-semibold\">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=\"divide-y divide-gray-800/60\">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className=\"px-4 py-8 text-center text-gray-600 italic\">
                No records available
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                className={	ransition-colors hover:bg-red-600/5 \}
              >
                {columns.map((col, colIdx) => (
                  <td key={col.key || colIdx} className=\"px-4 py-3 text-gray-300\">
                    {col.render ? col.render(row[col.key], row, rowIdx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
