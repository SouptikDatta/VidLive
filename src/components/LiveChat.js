import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateString, generator } from '../utils/helper';

export default function LiveChat() {
    const [liveMessage, setLiveMessage] = useState("");
    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages);

    // Effect for generating interval messages
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(addMessage({
                name: generator(),
                message: generateString(20),
                isNew: false // Indicate that this is not a new message
            }))
        }, 1500);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    // Function to handle adding message from input
    const handleAddMessage = (e) => {
        e.preventDefault();
        if (liveMessage.trim() !== '') {
            dispatch(addMessage({ name: 'Souptik', message: liveMessage, isNew: true }));
            setLiveMessage('');
        }
    };

    return (
        <div className='p-5 bg-gray-900 border border-gray-700'>
            <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-white">Live Chat</h1>
            <form className='bg-gray-800 border border-gray-700 flex items-center' onSubmit={handleAddMessage}>
                <input type="text" className='flex-grow px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-indigo-500' value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)} placeholder="Type your message..." />
                <button type="submit" className='px-4 py-2 ml-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none'>Submit</button>
            </form>
            <div className='w-full h-[600px] p-3 border border-gray-700 bg-gray-800 rounded mt-4 overflow-hidden overflow-y-scroll' style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
                {chatMessages.map((message, index) =>
                    <div key={index} className={`flex items-center border border-gray-700 p-2 ${message.isNew ? 'bg-yellow-400' : ''}`}>
                        <img className="h-6 mr-2" src="https://static.vecteezy.com/system/resources/previews/005/545/335/non_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" alt="user" />
                        <span className="font-bold text-white mr-2">{message.name}</span>
                        <span className="text-white">{message.message}🚀</span>
                    </div>
                )}
            </div>
        </div>
    );
}
