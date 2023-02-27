import React, { FC } from "react"
import styles from "./index.module.scss"
interface A {
    message: string
}
const RedError: FC<A> = (props) => (
    <div className={styles['error-wrapper']}>
        <div className={styles.error}>
            {props.message}
        </div>
    </div>
)
export default RedError