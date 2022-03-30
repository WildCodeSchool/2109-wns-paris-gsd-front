interface Props<T> {
  entity: string;
  columns: string[];
  data: T[];
  displayData: (data: T) => React.ReactNode;
}

const Table = <T,>({entity, columns, data, displayData}: Props<T>) => {
  return (
    <table className={`${entity}_table`}>
      <thead className={`${entity}_table_header`}>
    <tr>
      {columns.map((column: string, i: number) => (
        <th key={i} className={`${entity}_table_header_item--${column}`}>
          {column}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {data.map(displayData)}
  </tbody>
  </table>
)
}

export default Table