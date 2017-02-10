import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { getJson, ApiError } from 'snapsheet-ajax-utils';

function PhotoWrapper(props) {
  return (
    <div>
      <img src={props.thumbnailUrl}></img>
    </div>
  );
}
PhotoWrapper.propTypes = {
  thumbnailUrl: PropTypes.string
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    getJson('https://jsonplaceholder.typicode.com/photos')
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(error => {
        if (error instanceof ApiError) {
          console.error('ApiError', error);
        }
      });
  }
  render () {
    return (
      <div>
        { !this.state.data && <h2>Loading</h2>}
        { this.state.data &&
          <div>
            {this.state.data.slice(0,50).map(photo => <PhotoWrapper key={photo.id} {...photo} />)}
          </div>
        }
      </div>
    );
  }
}


ReactDOM.render((
  <App />
), document.getElementById('root'));
