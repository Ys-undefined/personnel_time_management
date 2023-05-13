import {Component} from 'react'
import styles from './testComponent.module.scss'

export class TestComponent extends Component {
    render() {
        return (
            <>
                <p className={styles.box}>Test123</p>
            </>
        )
    }
}