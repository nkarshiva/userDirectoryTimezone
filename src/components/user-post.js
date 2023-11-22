import React from 'react';

const Post = ({ title, body, onPostClick }) => {
  return (
    <div 
      className='border-[2px] border-black rounded-[20px] flex flex-col justify-between p-5 gap-y-[10px] cursor-pointer'
      onClick={() => onPostClick({ title, body })}
    >
      <h3 className='font-medium'>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default Post;