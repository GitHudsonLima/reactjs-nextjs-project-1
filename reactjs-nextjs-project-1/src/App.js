import { Component } from "react";
import "./App.css";
import { PostCard } from "./components/PostCard";

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photoJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photoJson[index].url };
    });

    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="posts">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            cover={post.cover}
          />
        ))}
      </div>
    );
  }
}
export default App;
