import React, { useState } from 'react';

const initialCommentsData = [
  {
    name: 'Akshay Kumar',
    text: 'Nice Video!',
    replies: [
      {
        name: 'Souptik Datta',
        text: 'Thank you for commenting on this video',
        replies: [],
      },
      {
        name: 'Keerthana Kumari',
        text: 'Heyyy ...',
        replies: [],
      },
    ],
  },
  {
    name: 'Lionel Messi',
    text: 'Superb Video friend!',
    replies: [
      {
        name: 'Souptik Datta',
        text: 'Thank you !!!!',
        replies: [],
      },
      {
        name: 'Alone Boy',
        text: 'Ohhhhh wow ...',
        replies: [],
      },
    ],
  }
];

function Comment({ data, isNew }) {
    const { name, text } = data;
    return (
      <div className={`flex bg-gray-800 rounded-lg p-3 items-center mb-3 ${isNew ? 'text-yellow-200' : ''}`}>
        <img
          className="w-10 h-10 rounded-full mr-3"
          src="https://static.vecteezy.com/system/resources/previews/005/545/335/non_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
          alt="user"
        />
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-white">{text}</p>
        </div>
      </div>
    );
  }
  
  function CommentsList({ comments }) {
    return comments.map((comment, index) => (
      <div key={index} className="ml-6">
        <Comment data={comment} isNew={comment.isNew} />
        <div className="pl-3 border-l-2 border-gray-700">
          <CommentsList comments={comment.replies} />
        </div>
      </div>
    ));
  }
  
export default function CommentsContainer() {
  const [commentsData, setCommentsData] = useState(initialCommentsData);
  const [inputComment, setInputComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      name: 'Souptik Datta',
      text: inputComment,
      replies: [],
      isNew: true,
    };
    const updatedCommentsData = [...commentsData, newComment]; // Create a new array with the new comment
    setCommentsData(updatedCommentsData);
    setInputComment('');
  };
  

  return (
    <div className="w-full p-4 bg-gray-900 rounded-lg">
      <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-white">Comments</h1>
      <form className="bg-gray-800 border border-gray-700 flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-indigo-500"
          placeholder="Type your Comment..."
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <button className="px-4 py-2 ml-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none" type="submit">
          Submit
        </button>
      </form>
      <div className="p-5">
        <CommentsList comments={commentsData} />
      </div>
    </div>
  )
}
