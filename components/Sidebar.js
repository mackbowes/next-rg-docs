
/**
 * A sidebar for documentation
 * @param {Object} Links An list of links to display
 * @returns A sidebar that contains dynamic data
 */
export const Sidebar = (props) => {
	const links = props.Links;
	console.log('links: ', links);
	return (
		<>
			<nav>
				{Object.keys(links).map(link => {
					return <a href={links[link].href}>{links[link].name}</a>
				})}
			</nav>
		</>
	)
}

export const SidebarLink = (props) => {
	return (
		<>
			<div>

			</div>
		</>
	)
}
