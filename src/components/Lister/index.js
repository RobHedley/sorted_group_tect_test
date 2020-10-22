import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);
	const [postList, setPostList] = useState();

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	useEffect(() => {
		console.log('I am in')
		const postList = allPosts.map((post, i) => {
			console.log(post.title)
			return (
			  <Post id={post.id} title={post.title} body={post.body} author={post.author} onDelete={onDeletePost} key={i}/>
			);
		  });
		  setPostList(postList)
	},[allPosts])

	const onDeletePost = (id) => {
		const toDelete = allPosts.indexOf(allPosts.find(function( obj ) { return obj.id === id; }))
		let deleteArray = allPosts
		if(toDelete !== -1){
			deleteArray.splice(toDelete, 1);
		}
		setPosts([...deleteArray])
	}

	const onCreatePost = post => {
		let addArray = allPosts
		addArray.push(post)
		setPosts([...addArray])
	}

	return (
		<div className="postList">
			{loading &&
				<h2>
					Loading...
				</h2>
			}
			{postList && postList}
			<CreatePost onCreate={onCreatePost} />
		</div>
	)
};

export default Lister;