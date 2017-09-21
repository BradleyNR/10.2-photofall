import React from 'react';
import '../styles/App.css';

class ImageList extends React.Component{
  render(){
    // - vars -
    let photos = this.props.post.imgURL;
    let caption = this.props.post.caption;
    let uniqueId = this.props.uniqueId;
    return (
      <div className="photo-block">
        <img className="images" src={photos} alt='Did Not Load'/>
        <p className="photo-caption">{caption}</p>
        <a onClick={this.props.removePost.bind(this, uniqueId)} className='btn btn-danger'>Delete</a>
        <a onClick={this.props.editPost.bind(this, uniqueId)} className='btn btn-success'>Edit</a>
      </div>
    );
  }
}

class ImageForm extends React.Component{
  // --- Setting form state for ease of use ---
  constructor(){
    super();
    this.state = {
      imgURL: '',
      caption: '',
      formClass: 'well form-header-movement form-header-styling'
    }
  }
  //handles URL field state
  handleUrlChange = (e) => {
    e.preventDefault();

    this.setState({imgURL: e.target.value})
  }
  //handles Caption field state
  handleCaptionChange = (e) => {
    e.preventDefault();

    this.setState({caption: e.target.value})
  }
  //submits the post with correct data then clears state
  submitPost = (e) => {
    e.preventDefault();

    this.props.addPost({imgURL: this.state.imgURL, caption: this.state.caption});
    this.setState({imgURL: '', caption: ''});
  }

  popOut = (e) => {
    e.preventDefault();
    this.setState({formClass: 'well form-header-styling'});
  }

  popIn = (e) => {
    e.preventDefault();
    this.setState({formClass: 'well form-header-movement form-header-styling'});
  }

  render(){
    // ------ Below, the value on inputs will clear the field when submitted ------
    return(
      <div onMouseEnter={this.popOut} onMouseLeave={this.popIn} className={this.state.formClass}>
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
        <div className="row">
          <div className="form-bottom-element">New Image</div>
        </div>
      </div>
    );
  }
}

class ImageBoard extends React.Component{
  // --- setting state ---
  constructor(){
    super();
    this.state = {
      post: []
    };
  }

  // --- adds post to array on state ---
  addPost = (post) => {
    //posts to server
    fetch("https://tiny-lasagna-server.herokuapp.com/collections/imageBoardBrad2/", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then((post) => {
      console.log(post);
      let postsList = this.state.post;
      postsList.unshift(post);
      this.setState({post: postsList})
      console.log('state posts: ', this.state.post);
    })
  }

  editPost = (uniqueId, e) => {
    e.preventDefault();

    let postList = this.state.post;
    console.log('postlist', postList);

    function findById(postList){
      return postList._id === uniqueId;
    }

    let postToEdit = findById(postList)

    console.log('post to edit: ', postToEdit);


    // fetch('https://tiny-lasagna-server.herokuapp.com/collections/imageBoardBrad2/' + uniqueId, {
    //   method: 'put',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })

  }

  // --- removes post ---
  removePost = (uniqueId, e) => {
    e.preventDefault();

    fetch('https://tiny-lasagna-server.herokuapp.com/collections/imageBoardBrad2/' + uniqueId, {
      method: "DELETE"
    }).then(response => {
      return response.json();
    }).then((message) =>{
      let postsList = this.state.post;

      //find post by it's unique id
      function findById(posts){
        return posts._id === uniqueId;
      }
      //set index to the index number of the post with that unique id
      let index = postsList.indexOf(postsList.find(findById));
      postsList.splice(index, 1)
      this.setState({post: postsList})
    })
  }

  // ------ GETTING DATA FROM SERVER, SETTING STATE ------
  componentDidMount(){
    fetch("https://tiny-lasagna-server.herokuapp.com/collections/imageBoardBrad2/").then((results) => {
      return results.json();
    }).then((post) => {
    this.setState({post: post})
    console.log('posts from server: ', post);
    });
  }

  render(){

    // --- Maps over post array (in state), creates multiple ImageList with correct post
    let posts = this.state.post.map((post, index) => {
      return <ImageList key={post.imgURL} post={post} removePost={this.removePost} editPost={this.editPost} uniqueId={post._id}/>;
    });

    return(
      <div>

        <ImageForm addPost={this.addPost} />

        <div className='well main-content'>
          <h1 className="main-title">PhotoFall</h1>
          <div className="list">
            {posts}
          </div>
        </div>

      </div>
    );
  }
}


export {ImageBoard as default};
