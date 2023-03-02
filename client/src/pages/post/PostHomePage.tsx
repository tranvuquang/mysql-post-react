import React, { useEffect, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { postAxiosData, useFetch } from "../../axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const HomePage = (props: Props) => {
  let navigate = useNavigate();
  const { accessToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { data } = useFetch("/api/posts", accessToken, dispatch);

  useEffect(() => {
    if (data) {
      setListOfPosts(data.posts);
      setLikedPosts(data.likes);
    }
  }, [data]);

  const likeAPost = async (postId: number) => {
    const { resData, reFetchData } = (await postAxiosData(
      "/api/likes",
      accessToken,
      { PostId: postId },
      dispatch,
      "/api/posts"
    )) as any;
    if (resData && reFetchData) {
      setLikedPosts(reFetchData.data.likes);
    }
  };
  return (
    <div>
      {listOfPosts &&
        listOfPosts.length > 0 &&
        listOfPosts.map((value: any, key) => {
          const liked = likedPosts.find((like: any) => {
            return like.PostId === value.id;
          });
          const likeArr = likedPosts.filter((like: any) => {
            return like.PostId === value.id;
          });
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/posts/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">
                  <Link to={`/profile/${value.UserId}`}>
                    {" "}
                    {value.username}{" "}
                  </Link>
                </div>
                <div className="buttons">
                  <ThumbUpAltIcon
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                    className={!liked ? "unlikeBttn" : "likeBttn"}
                  />
                  <label> {likeArr.length}</label>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;
