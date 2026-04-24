import { createContext, useContext, useState } from "react";

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
    const [comments, setComments] = useState({
        // episodeId: [{
        // commentID: crypto.genuuid,
        // comment: ......,
        // date: timeStamp or MM-dd-yyyy
        //}]
    })

    const addComment = (episodeId, newComment) => {
        const postDate = new Date();
        const created = `${postDate.getMonth() + 1}-${postDate.getDate()}-${postDate.getFullYear()}`


        const addedComment = comments[episodeId] ? [...comments[episodeId], {
            commentID: crypto.randomUUID(),
            comment: newComment,
            date: created
        }] : [{
            commentID: crypto.randomUUID(),
            comment: newComment,
            date: created
        }]

        setComments(prev=> {
            return (
                {...prev, [episodeId]: addedComment}
            )
        })

    }

    return (
        <CommentContext value={{comments, addComment}}>
            {children}
        </CommentContext>
    )
}

export default CommentProvider;

export const useComment = () => {
    return useContext(CommentContext);
}