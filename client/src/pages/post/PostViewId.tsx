import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  deleteAxiosData,
  getAxiosData,
  postAxiosData,
} from "../../axios/axiosConfig";
import { selectAuth } from "../../features/auth/authSlice";

type Props = {};

const PostViewId = (props: Props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { accessToken, user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [postObject, setPostObject] = useState<any>({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (id) {
      (async () => {
        const resData = await getAxiosData(
          `/api/posts/getPostById/${id}`,
          accessToken,
          dispatch
        );
        const resCommentsData = await getAxiosData(
          `/api/comments/${id}`,
          accessToken,
          dispatch
        );
        if (resData) {
          setPostObject(resData.data.post);
        }
        if (resCommentsData) {
          setComments(resCommentsData.data.comments);
        }
      })();
    }
  }, [accessToken, dispatch, id]);

  const addComment = async () => {
    const data = {
      commentBody: newComment,
      username: user.username,
      UserId: user.id,
      PostId: postObject.id,
    };
    const { resData, reFetchData } = (await postAxiosData(
      "/api/comments/create",
      accessToken,
      data,
      dispatch,
      `/api/comments/${id}`
    )) as any;
    if (resData && reFetchData) {
      setComments(reFetchData.data.comments);
    }
  };

  const deleteComment = (id: number) => {
    console.log(id)
  };

  const deletePost = async (id: number) => {
    await deleteAxiosData(`/api/posts/delete/${id}`, accessToken, {}, dispatch);
    navigate("/posts");
  };
  const updatePost = (id: number) => {
    navigate(`/posts/update/${id}`);
  };

  return (
    postObject && (
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title">{postObject.title}</div>
            <div className="body">{postObject.postText}</div>
            <div className="footer">
              {postObject.username}
              {user.username === postObject.username && (
                <button
                  onClick={() => {
                    deletePost(postObject.id);
                  }}
                >
                  {" "}
                  Delete
                </button>
              )}
              {user.username === postObject.username && (
                <button
                  onClick={() => {
                    updatePost(postObject.id);
                  }}
                >
                  {" "}
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="addCommentContainer">
            <input
              type="text"
              placeholder="Comment..."
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <button onClick={addComment}> Add Comment</button>
          </div>
          <div className="listOfComments">
            {comments.length > 0 &&
              comments.map((comment: any, key) => {
                return (
                  <div key={key} className="comment">
                    {comment.commentBody}
                    <label> Username: {comment.username}</label>
                    {user.username === comment.username && (
                      <button
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
                      >
                        X
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
};

export default PostViewId;
