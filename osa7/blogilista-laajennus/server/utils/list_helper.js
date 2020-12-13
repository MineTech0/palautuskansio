var _ = require('lodash');
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach(blog => {
    likes += blog.likes;
  });
  return likes;
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs[0];
  blogs.forEach((blog) =>{
    favoriteBlog = blog.likes > favoriteBlog.likes ? blog : favoriteBlog;
  })
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  };
}
const mostBlogs = (blogs) => {
  let mostBlogs = _.map(_.countBy(blogs,'author'), (val, key)=>({author: key,blogs:val}));
  mostBlogs = _.maxBy(mostBlogs,'blogs');
  return mostBlogs;
}
const mostLikes = (blogs) => {
  let authorGroups = _.groupBy(blogs,'author')
  let MostLikes = [];

  _.forEach(authorGroups, (authorBlogs, key) =>{
    MostLikes.push({
      author: key,
      likes: _.sumBy(authorBlogs,'likes')
    });
  });
  return _.maxBy(MostLikes,'likes');
}




module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}