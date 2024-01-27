import { FunctionComponent, PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './Message.module.css'

type Props = {
    type: 'ok' | 'bad' | 'warn'
}
export const Message: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    type
}) => {
    return <p className={classNames(styles.container, type)}>{children}</p>
}
