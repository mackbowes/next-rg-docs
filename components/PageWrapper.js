import styles from './styles/PageWrapper.module.scss';
import { useState } from 'react';
import { Box, VStack, Flex, Heading } from '@chakra-ui/react'

export const PageWrapper = (props) => {

	return (
		<div className={styles.mainWrapper}>
			<Sidebar data={props.sidebarData} privateData={props.privatePageData} />
			<div data='spacer'></div>
			<div className={styles.pageWrapper}>
				{props.children}
			</div>
		</div>
	)
}



const SidebarList = ({ data }) => {

	return (
		<>
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
		</>
	)
}

const Toggler = (props) => {
	const [isOpen, setIsOpen] = useState(props.isOpen);

	const toggle = () => {
		setIsOpen(v => !v);
	}

	return (
		<>
			<Heading
				color="brand.100"
				sx={{ userSelect: 'none' }}
				onClick={() => toggle()}>{props.label} {(isOpen) ? 'v' : '>'}</Heading>
			{
				(isOpen)
					? props.children
					: null
			}
		</>
	)


}

export const Sidebar = (props) => {
	const data = props.data;
	return (
		<Box
			color="brand.500"
			h='100vh'
			w="100%"
			bg="brand.900"
			p={5}
			sx={{ borderRight: `3px solid`, borderColor: "brand.500" }}
		>

			<Toggler label="Public Data">
				<SidebarList data={data} />
			</Toggler>
			{((typeof props.privateData !== 'undefined') && props.privateData)
				?
				<>
					<Toggler label="Private Data">
						<SidebarList data={props.privateData} />
					</Toggler>
				</>
				: null}
		</Box>
	)
}
