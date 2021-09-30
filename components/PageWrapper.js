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

				// create spaces before internal capital letters
				const categoryCharArray = [...category];
				const newCategoryCharArray = categoryCharArray.map((char, index) => {
					if (/[A-Z]/.test(char) && index > 0) {
						return ` ${char}`
					} else {
						return char
					}
				});
				let cleanedCategory = newCategoryCharArray.join('');

				return (
					<>
						<h2>{cleanedCategory}</h2>
						{data[category].map((item, index) => {
							return <a href={`/${category}/${item.slug}`}>{item.title}</a>
						})}
					</>
				)
			})}
		</div>
	)
}