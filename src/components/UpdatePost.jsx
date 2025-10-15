import { useState } from "react"

function UpdatePost () {
    const [formData, setFormData] = useState({
        postId: '',
        title: '',
        body: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validationForm = () => {
        const {postId, title, body} = formData;

        if (postId.trim() === '' || title.trim() === '' || body.trim === '') {
            setSuccess('');
            setError('Post ID, title, and body are requiresd');
            return false;
        }
        setError('');
        return true;
    };

    const updatePost = async (event) => {
        event.preventDefault();

        if(!validationForm()) {
            return;
        }

        try {
            const {postID, title, body} =formData;

            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                id:postId,
                title: title,
                body: body,
                userId: 1,
            }),
            headers: {
                    'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
                throw new Error('Failed to update post');
            }
            const updatedPost = await response.json();
            
            setSuccess(
                <div>
                    <p>Post #{updatedPost.id} Updated Successfully!</p>                    
                    New Title: {updatedPost.title}<br/>
                    New Body: {updatedPost.body}
                </div>
            );
        } catch (error) {
            console.error(error.message);
        } 
    };


    return(
        <div>
            <h1>Update Post</h1>
            <form onSubmit={updatePost}>
                <div>
                    <label htmlFor="title">Post ID</label><br/>
                    <input
                    type="number"
                    id="postId"
                    value={formData.postID}
                    onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="title">Title:</label><br/>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label><br/>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                    />
                </div><br/>
                <button type="submit">Update Post</button>
            </form>

            {/* Display validation error or success message */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}

        </div>
    )
}

export default UpdatePost