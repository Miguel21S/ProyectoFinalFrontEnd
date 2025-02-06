
// import "./CTable.css"

export const CTable = ({ columns=[], data=[], customClass }) => {
    return (
        <table className={`table ${customClass}`}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>{
                                columns.map((column, colIndex) => (
                                    <td key={colIndex}>
                                        {column.render
                                            ? column.render(row)
                                            : row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))

                    ) : (
                        <tr>
                        <td colSpan={columns.length} className="text-center">
                            No hay datos disponibles
                        </td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    )
}