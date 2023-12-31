import { FC, useState } from 'react'
import { UserData, posts } from './Profile';
import { User } from 'firebase/auth';

export interface IAppProps {
    email: string
    user: UserData
    posts: posts[]
    setPosts: (posts: posts[]) => void
}

export const ProfileSection: FC<IAppProps> = ({ email, user, posts, setPosts }) => {
    const [userEmail, setUserEmail] = useState(email);
    const [userUsername, setUserUsername] = useState(user.username || '');

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const handleCommentSubmit = (): void => {
        if (!comment.trim()) {
            alert('Please enter a comment.');
            return;
        }
        // Here you can implement the logic to handle the comment
        console.log('Comment:', comment);
        let userPost: posts = {
            postid: '',
            uid: '',
            title: title,
            body: comment
        }
        console.log(userPost + ' userpost')
        setPosts([...posts, userPost])
        console.log(posts)
        setComment(''); // Clear the comment input after submission
    };


    return (
        <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-gray-700 p-4 rounded-md shadow-md mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Profile Information</h2>
                <div>
                    <label className="text-gray-200">Email</label>
                    <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-gray-200" />
                </div>
                <div className="mt-4">
                    <label className="text-gray-200">Username</label>
                    <input type="text" value={userUsername} onChange={(e) => setUserUsername(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-gray-200" />
                </div>
                <div className="mt-4">

                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-gray-200" placeholder='Title'/>
                    <label className="text-gray-200">Share the word</label>
                    <textarea onChange={(e) => setComment(e.target.value)} value={comment} className="w-full p-2 rounded bg-gray-800 text-gray-200" placeholder="Add a profile comment"></textarea>
                </div>
                <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>

            {/* Posts Section */}

            <div className="bg-gray-700 p-4 rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post, index) => (
                        <div key={index} 
                        className="bg-gray-800 p-3 rounded h-64 flex flex-col border border-transparent hover:border-white duration-200">
                            <h3
                                className="text-lg font-semibold text-gray-100 mb-2">{post.title}
                            </h3>
                            <p 
                                className="text-gray-300 flex-grow">{post.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};