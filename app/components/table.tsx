export type headerProps = {
  header: string;
  field: string;
  hidden?: boolean | false;
};

interface props {
  title?: string;
  headerProps: headerProps[];
  tableData: any[];
}

export default function Table({ title, headerProps, tableData }: props) {
  return (
    <>
      {title && (
        <p className="pb-[2px] text-center font-semibold text-skin-bold">
          {title}
        </p>
      )}

      <table className="table table-auto border border-skin-bold/80 text-sm">
        <thead>
          <tr>
            {headerProps.map((item, index) => (
              <th
                key={index}
                className="border border-skin-bold/80 bg-skin-bold/60 p-1 
                font-semibold text-skin-bold"
                hidden={item.hidden}
              >
                {item.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="cursor-default text-skin-base hover:bg-skin-bold/40 
              hover:text-skin-bold"
            >
              {headerProps.map((item, index) => (
                <td key={index} className="p-1" hidden={item.hidden}>
                  {row[item.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
