import React, { useReducer } from 'react';

const CreatePost = ({ onCreate }) => {

	const initialState = {
		title: '',
		body: '',
		author: ''
	};

	const postReducer = (state, { type, ...payload } ) => {
		switch(type) {
			case 'updateTitle':
				return {...state, title: payload.value}
			case 'updateBody':
				return {...state, body: payload.value}
			case 'updateAuthor':
				return {...state, author: payload.value}
			case 'reset':
				return {
					title: '',
					body: '',
					author: ''
				}
		}
	};

	const [{title, body, author}, dispatch] = useReducer(postReducer, initialState)

	return (
		<form aria-label="Create post">
			<fieldset>
				<h3>Add new post</h3>
				<ul>
					<li>
						<label htmlFor="title">Title</label>
						<input type="text" id="title" value={title} onChange={({ target: { value } }) => dispatch({ type: 'updateTitle', value })}/>
					</li>
					<li>
						<label htmlFor="body">Body</label>
						<textarea id="body" value={body} onChange={({ target: { value } }) => dispatch({type: 'updateBody', value})}></textarea>
					</li>
					<li>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" value={author} onChange={({ target: { value } }) => dispatch({ type: 'updateAuthor', value })}/>
					</li>
				</ul>

				<button type="button" onClick={() => {
					onCreate({ title, body, author });
					dispatch({ type: 'reset'})
				}}>Add post</button>
				<button type="button" onClick={() => dispatch({ type: 'reset'})}>Reset</button>
			</fieldset>
		</form>
	);
};

export default CreatePost;