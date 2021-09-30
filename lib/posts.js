import fs from "fs";
import path from "path";
import matter from "gray-matter";

//Finding directory named "docs" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), "docs");
const publicDirectory = path.join(postDirectory, 'public');
const privateDirectory = path.join(postDirectory, 'private');

export const getPublicDocs = () => {
	const folderNames = fs.readdirSync(publicDirectory);

	const allPostsData = folderNames.map((folder) => {
		const loc = path.join(publicDirectory, folder);
		const fileNames = fs.readdirSync(loc);
		const allPosts = fileNames.map((fileName) => {
			const slug = fileName.replace('.md', '');
			const fullPath = path.join(loc, fileName);
			const fileContent = fs.readFileSync(fullPath, 'utf8');
			const { data } = matter(fileContent);
			return {
				slug,
				...data,
				fileContent
			}
		});

		return {
			label: folder,
			allPosts,
		}
	});

	let publicDocs = {};
	folderNames.forEach(name => {
		publicDocs[name] = {};
	})
	allPostsData.forEach(folder => {
		publicDocs[folder.label] = folder.allPosts;
	});

	return publicDocs;
}

export const getPrivateDocs = () => {
	const fileNames = fs.readdirSync(privateDirectory);

	const allPostsData = fileNames.map((fileName) => {
		const slug = filename.replace('.md', '');
		const fullPath = path.join(privateDirectory, fileName);
		const fileContent = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContent);
		const frontMatter = {
			...data,
		};
		return {
			slug,
			...frontMatter
		}
	});

	return allPostsData;
}

export const getPublicPostData = async (slug) => {
	const fullPath = path.join(publicDirectory, `${slug}.md`);
	const postContent = fs.readFileSync(fullPath, 'utf8');
	return postContent;
}


export const getPublicPostSlugs = () => {
	const fileNames = fs.readdirSync(publicDirectory);

	return fileNames.map(filename => {
		return {
			params: {
				slug: filename.replace('.md', '')
			}
		}
	})
}