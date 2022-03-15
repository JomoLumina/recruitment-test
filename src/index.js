
import { getComments, getPosts, getUsers } from "./data";

export const getData = Promise.all([getComments(), getPosts(), getUsers()]).then((data) => { 
  const comments = data[0];
  const posts = data[1];
  const users = data[2];

  posts.data.map((post) => {
    const _users = users.data.filter(u => u.id == post.user_id);
    const author = _users.length > 0 ? _users[0] : null;
    post.author = {
      id: author.id,
      name: author.name
    }
    const _comments = comments.data.filter(c => c.post_id == post.id);
    post.comments = [].concat(_comments);
    return post;
  })

  comments.data.map((comment) => {
    const _users = users.data.filter(u => u.id == comment.user_id);
    const author = _users.length > 0 ? _users[0] : null;
    comment.author = author ? {
      id: author.id,
      name: author.name
    } : null;

    const _posts = posts.data.filter(p => p.id == comment.post_id);
    const post = _posts.length > 0 ? _posts[0] : null;
    comment.post = post ? {
      id: post.id,
      title: post.title
    } : null;

    return comment;
  })

  return {comments,posts,users};
 });