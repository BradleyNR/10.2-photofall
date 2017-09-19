import React from 'react';
import '../styles/App.css';

class ImageList extends React.Component{
  render(){
    // - vars -
    let photos = this.props.post.imgURL;
    let caption = this.props.post.caption;
    let uniqueId = this.props.uniqueId;
    return (
      <li>
        <img className="images" src={photos} alt='Did Not Load'/>
        <p>{caption}</p>
        <a onClick={this.props.removePost.bind(this, uniqueId)} className='btn btn-danger'>Delete</a>
      </li>
    );
  }
}

class ImageForm extends React.Component{
  // --- Setting form state for ease of use ---
  constructor(){
    super();
    this.state = {
      imgURL: '',
      caption: ''
    }
  }
  //handles URL field state
  handleUrlChange = (e) => {
    this.setState({imgURL: e.target.value})
  }
  //handles Caption field state
  handleCaptionChange = (e) => {
    this.setState({caption: e.target.value})
  }
  //submits the post with correct data then clears state
  submitPost = (e) => {
    e.preventDefault();

    this.props.addPost({imgURL: this.state.imgURL, caption: this.state.caption});
    this.setState({imgURL: '', caption: ''});
  }

  render(){
    // ------ Below, the value on inputs will clear the field when submitted ------
    return(
      <form onSubmit={this.submitPost} className="form-horizontal">

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="imageUrl">Image URL:</label>
          <div className="col-sm-7">
            <input onChange={this.handleUrlChange} type="text" className="form-control" id="imageUrl" value={this.state.imgURL} placeholder="Image URL" />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="caption">Caption:</label>
          <div className="col-sm-7">
            <input onChange={this.handleCaptionChange} type="text" className="form-control" id="caption" value={this.state.caption} placeholder="Caption" />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-9 col-sm-1">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>

      </form>
    );
  }
}

class ImageBoard extends React.Component{
  // --- setting state ---
  constructor(){
    super();
    this.state = {
      post: [
      ]
    };
  }

  // --- adds post to array on state ---
  addPost = (post) => {
    //posts to server
    fetch("https://tiny-lasagna-server.herokuapp.com/collections/imageBoardBrad/", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json();
    });
  }

  // --- removes post ---
  removePost = (uniqueId, e) => {
    e.preventDefault();

    fetch("https://tiny-lasagna-server.herokuapp.com/collections/imageBoardBrad/" + uniqueId, {
      method: "DELETE"
    }).then(response => {
      response.json();
    });
  }

  render(){
    // ------ GETTING DATA FROM SERVER, SETTING STATE ------
    fetch("https://tiny-lasagna-server.herokuapp.com/collections/imageBoardBrad/").then((results) => {
      return results.json();
    }).then((post) => {
      this.setState({post: post})
    });

    // --- Maps over post array (in state), creates multiple ImageList with correct post
    let posts = this.state.post.map((post, index) => {
      return <ImageList key={post.imgURL} post={post} removePost={this.removePost} uniqueId={post._id}/>;
    });

    return(
      <div>

        <div className='well'>
          <ImageForm addPost={this.addPost} />
        </div>

        <div className='well'>
          <ul className="list">
            {posts}
          </ul>
        </div>

      </div>
    );
  }
}


export {ImageBoard as default};
