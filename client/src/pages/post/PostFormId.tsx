import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getAxiosData, postAxiosData } from "../../axios/axiosConfig";
import { selectAuth } from "../../features/auth/authSlice";

const formDataDefaulValue = {
  id: 0,
  title: "",
  postText: "",
};

type Props = {};

const PostFormId = (props: Props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { accessToken, user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(formDataDefaulValue);
  useEffect(() => {
    if (id) {
      (async () => {
        const resData = await getAxiosData(
          `/api/posts/getPostById/${id}`,
          accessToken,
          dispatch
        );
        if (resData) {
          setFormData(resData.data.post);
        }
      })();
    } else setFormData(formDataDefaulValue);
  }, [accessToken, dispatch, id]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });
  const onSubmit = async (data: any) => {
    if (!id && formData.id === 0) {
      data = { ...data, username: user.username, UserId: user.id };
      await postAxiosData(`/api/posts/create`, accessToken, data, dispatch);
      navigate("/posts");
    }
    if (formData.id !== 0) {
      await postAxiosData(
        `/api/posts/update/${id}`,
        accessToken,
        data,
        dispatch
      );
      navigate("/posts");
    }
  };

  const formikMethod = (action: string = "") => {
    return (
      <Formik
        initialValues={formData}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />

          <button type="submit">
            {" "}
            {action === "update" ? "Update Post" : "Create Post"}
          </button>
        </Form>
      </Formik>
    );
  };
  return (
    <div className="createPostPage">
      {formData.id !== 0 && formikMethod("update")}
      {formData.id === 0 && formikMethod("create")}
    </div>
  );
};

export default PostFormId;
