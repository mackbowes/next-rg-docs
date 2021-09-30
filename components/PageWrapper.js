import styles from './styles/PageWrapper.module.scss';

export const PageWrapper = (props) => {

	return (
		<div className={styles.mainWrapper}>
			<Sidebar data={props.sidebarData} />
			<div data='spacer'></div>
			<div className={styles.pageWrapper}>
				{props.children}
			</div>
		</div>
	)
}

const Sidebar = (props) => {
	const data = props.data;
	console.log(data);
	return (
		<div className={styles.sidebar}>
			{Object.keys(data).map((category) => {

				// todo: logic to split CamelCased words

				return (
					<>
						<h2>{category}</h2>
						{data[category].map((item, index) => {
							return <a href={`/${category}/${item.slug}`}>{item.title}</a>
						})}
					</>
				)
			})}
		</div>
	)
}