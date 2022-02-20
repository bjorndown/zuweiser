import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { Column } from './Participants'

type Props = {
    error?: string
    columns: Column[]
    table: string[][]
}

export const Preview: FunctionComponent<Props> = ({
    error,
    columns,
    table
}) => {
    return (
        <>
            {error && <span className="error">{error}</span>}
            {!error && columns.length > 0 && (
                <div className="preview">
                    <table>
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        className={classNames({
                                            'matched-column': column.matchedAs
                                        })}
                                        key={column.label}
                                        title={
                                            column.matchedAs
                                                ? `Erkannt als "${column.matchedAsLabel}"`
                                                : ''
                                        }
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {table.slice(1).map((row, rowNo) => (
                                <tr key={`row-${rowNo}`}>
                                    {row.map((column, columnNo) => (
                                        <td key={`cell-${rowNo}-${columnNo}`}>
                                            {column}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <style jsx>
                {`
                    .preview {
                        height: 10rem;
                        overflow: auto;
                    }

                    .matched-column {
                        background: var(--green);
                    }

                    th {
                        position: sticky;
                        top: 0;
                        left: 0;
                    }

                    .error {
                        background: #cd5c5c;
                    }
                `}
            </style>
        </>
    )
}
