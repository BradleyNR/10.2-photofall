import React from 'react';
import '../styles/App.css';

class ImageList extends React.Component{
  render(){
    return (
      <li>
        <img className="images" src={this.props.photoObject.imgURL} alt="Image" />
        <p>{this.props.photoObject.caption}</p>
      </li>
    );
  }
}

class ImageForm extends React.Component{
  render(){
    return(
      <form className="form-horizontal">

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="imageUrl">Image URL:</label>
          <div className="col-sm-7">
            <input type="text" className="form-control" id="imageUrl" placeholder="Image URL" />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="caption">Caption:</label>
          <div className="col-sm-7">
            <input type="text" className="form-control" id="caption" placeholder="Caption" />
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
  render(){
    let ImageListWithSeederData = this.props.seederData.map(function(photoObject){
      return <ImageList photoObject={photoObject}/>;
    });


    return(
      <div className="well">
        <ImageForm />
        <ul className="list">
          {ImageListWithSeederData}
        </ul>
      </div>
    );
  }
}


export {ImageBoard as default};
