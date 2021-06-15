import Image from 'next/image'
import styles from "./Loading.module.css"

const Loading = () => {
    return(
        <div className={styles.LoadingContainer}>
            <Image
            src="/loading.svg"
            alt="Loading animation"
            width={75}
            height={75}
        />
        <h4 className={styles.LoadingTitle}>Loading...</h4>
        </div>
    )
}
export default Loading