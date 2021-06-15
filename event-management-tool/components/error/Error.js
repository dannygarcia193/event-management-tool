import styles from  "./Error.module.css"
const Error = ({errMess}) => {
    return (
        <div className={styles.ErrorContainer}>
            <h4 className={styles.ErrorMessage}>{errMess}</h4>
        </div>
    )
}
export default Error