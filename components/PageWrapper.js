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
						<SidebarListItem category={category} data={data} cleanedCategory={cleanedCategory} />
						{/* <Heading as="h2" sx={{ fontSize: '1.5rem', margin: `1ex 0` }}>{cleanedCategory}</Heading>
						{data[category].map((item, index) => {
							return <a key={`${item}--${index}`} href={`/${category}/${item.slug}`}>
								<Heading sx={{ fontSize: `1.25rem`, margin: `.5ex 1em` }} _hover={{ color: `white` }}>{item.title}</Heading>
							</a>
						})} */}
					</>
				)
			})}
		</>
	)
}

const SidebarListItem = (props) => {

	const [isOpen, setIsOpen] = useState(true);

	const toggleOpen = () => {
		setIsOpen(v => !v);
	}

	return (
		<>
			<Heading
				as="h2"
				sx={{ fontSize: '1.5rem', margin: `1ex 0` }}
				_hover={{ color: `white`, cursor: `pointer` }}
				onClick={() => toggleOpen()}>
				{props.cleanedCategory}
			</Heading>
			{(isOpen)
				?
				<>
					{props.data[props.category].map((item, index) => {
						return <a key={`${item}--${index}`} href={`/${props.category}/${item.slug}`}>
							<Heading sx={{ fontSize: `1.25rem`, margin: `.5ex 1em` }} _hover={{ color: `white` }}>{item.title}</Heading>
						</a>
					})}
				</>
				: null}
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
			sx={{ borderRight: `3px solid`, borderColor: "brand.500", overflowY: 'scroll', userSelect: `none` }}
			css={{
				'&::-webkit-scrollbar': {
					width: '1rem',
				},
				'&::-webkit-scrollbar-track': {
					width: '6px',
				},
				'&::-webkit-scrollbar-thumb': {
					background: "brand.500",
					borderRadius: '24px',
				},
			}}
		>

			<>
				<Heading>Arcana</Heading>
				<Box sx={{ marginLeft: '1em' }}>
					<SidebarList data={data} />
				</Box>
			</>
			{((typeof props.privateData !== 'undefined') && props.privateData)
				?
				<>
					<Toggler label="Private Data">
						<SidebarList data={props.privateData} />
					</Toggler>
				</>
				: null}
		</Box >
	)
}
