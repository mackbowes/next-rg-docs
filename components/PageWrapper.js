import styles from './styles/PageWrapper.module.scss';

export const PageWrapper = (props) => {

	return (
		<div className={styles.mainWrapper}>
			<Sidebar data={props.sidebarData} />
			<div className={styles.pageWrapper}>
				{props.children}
			</div>
		</div>
	)
}

const Sidebar = (props) => {
	const data = props.data;
	return (
		<div className={styles.sidebar}>
			{data?.map(datum => {
				return <a href={`/docs/${datum.slug}`}>{datum.slug}</a>
			})}
		</div>
	)
}