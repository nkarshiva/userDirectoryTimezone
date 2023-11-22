import React from 'react'

const PostPopup = ({selectedPost,handleClosePopup}) => {
    return (
        <div>
            {selectedPost && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={handleClosePopup}
                >
                    <div className="bg-white p-8 max-w-md rounded-[20px]">
                        <h3 className="font-medium">{selectedPost.title}</h3>
                        <p>{selectedPost.body}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostPopup