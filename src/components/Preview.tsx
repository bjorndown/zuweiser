import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { Column } from './Participants'
import { Message } from './Message'

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
            {error && <Message type="bad">{error}</Message>}
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
                        background: var(--ok);
                    }

                    th {
                        position: sticky;
                        top: 0;
                        left: 0;
                    }
                `}
            </style>
        </>
    )
}
