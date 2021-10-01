import { getPrivateDocs } from '../../lib/posts';


export default function handler(req, res) {
	const data = getPrivateDocs();
	res.status(200).json({ 'data': data });
}
