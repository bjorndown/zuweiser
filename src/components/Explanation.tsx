import React, { FunctionComponent } from 'react'

type Props = {
    text: string
}

export const Explanation: FunctionComponent<Props> = ({ text }) => (
    <>
        <span className="explanation" title={text}>
            ?
        </span>
        <style jsx>
            {`
                .explanation {
                    background: var(--ok);
                    margin-left: 0.3rem;
                    padding: 0 5px;
                    font-weight: bold;
                    border-radius: 50%;
                }
            `}
        </style>
    </>
)
