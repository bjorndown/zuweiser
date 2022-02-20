import React, { FunctionComponent, useState } from 'react'

type Props = {
    onChange: (table: string[][]) => void
}

export const CsvArea: FunctionComponent<Props> = ({ onChange }) => {
    const [separator, setSeparator] = useState('\t')

    const parse = (csv: string, skipFirstLine = false): string[][] => {
        return csv
            .split('\n')
            .slice(skipFirstLine ? 1 : 0)
            .map((line) =>
                line
                    .trim()
                    .split(separator)
                    .map((column) => column.trim())
            )
            .filter((columns) => columns.length !== 1)
    }

    return (
        <div className="container">
            <textarea
                className="input"
                rows={20}
                onChange={(event) => onChange(parse(event.target.value))}
            />
            <style jsx>{`
                .container {
                    display: flex;
                    flex-flow: column wrap;
                    margin: 1rem 0;
                }
                .input {
                    max-width: 700px;
                }
            `}</style>
        </div>
    )
}
