//import React, { Component } from 'react'
import { render } from 'react-dom'
//import * as $ from 'jquery'

//require("babel-polyfill");
// ======================
// tutorial1
// ======================
//class CommentBox extends React.Component {
//  render() {
//    return (
//      <div className="commentBox">
//        Hello, world! I am a CommentBox.
//      </div>
//    );
//  }
//}

// ======================
// tutorial2
// ======================
//class CommentList extends React.Component {
//  render() {
//    return (
//      <div className="commentList">
//        Hello, world! I am a CommentList.
//      </div>
//    );
//  }
//};

//class CommentForm extends React.Component {
//  render() {
//    return (
//      <div className="commentForm">
//        Hello, world! I am a CommentForm.
//      </div>
//    );
//  }
//};

//class CommentBox extends React.Component {
//  render() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList />
//        <CommentForm />
//      </div>
//    );
//  }
//};

// ======================
// tutorial3
// ======================
//class Comment extends React.Component {
//  render() {
//    return (
//      <div className="comment">
//        <h2 className="commentAuthor">
//          {this.props.author}
//        </h2>
//        {this.props.children}
//      </div>
//    );
//  }
//};

//class CommentList extends React.Component {
//  render() {
//    return (
//      <div className="commentList">
//        <Comment author="Pete Hunt">This is one comment</Comment>
//        <Comment author="Jordan Walke">This is another comment</Comment>
//      </div>
//    );
//  }
//};

//render(
//  <CommentBox />,
//  document.getElementById('content')
//);

// ======================
// tutorial4
// ======================

//const DATA = [
//  {id: 1, author: "Pete Hunt", text: "This is one comment"},
//  {id: 2, author: "Jordan Walke", text: "This is another comment"}
//];

//class CommentBox extends React.Component {
//  render() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList data={this.props.data} />
//        <CommentForm />
//      </div>
//    );
//  }
//};

//class CommentList extends React.Component {
//  render() {
//    var commentNodes = this.props.data.map(function(comment) {
//      return (
//        <Comment author={comment.author} key={comment.id}>
//          {comment.text}
//        </Comment>
//      );
//    });
//    return (
//      <div className="commentList">
//        {commentNodes}
//      </div>
//    );
//  }
//};

//render(
//  <CommentBox data={DATA} />,
//  document.getElementById('content')
//);

// ======================
// tutorial5
// ======================
//class CommentBox extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {data: []};
//  }
//  componentDidMount() {
//    $.ajax({
//      url: this.props.url,
//      dataType: 'json',
//      cache: false,
//      success: (data) => {
//        this.setState({data: data});
//      },
//      error: (xhr, status, err) => {
//        console.error(this.props.url, status, err.toString());
//      }
//    });
//  }
//  render() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList data={this.state.data} />
//        <CommentForm />
//      </div>
//    );
//  }
//};


// ======================
// tutorial6
// ======================

//class CommentForm extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {author: '', text: ''};
//  }
//
//  handleAuthorChange(e) {
//    this.setState({author: e.target.value});
//  }
//
//  handleTextChange(e) {
//    this.setState({text: e.target.value});
//  }
//
//
//  render() {
//    return (
//      <form className="commentForm">
//        <input
//          type="text"
//          placeholder="Your name"
//          value={this.state.author}
//          onChange={this.handleAuthorChange.bind(this)}
//        />
//        <input
//          type="text"
//          placeholder="Say something..."
//          value={this.state.text}
//          onChange={this.handleTextChange.bind(this)}
//        />
//        <input type="submit" value="Post" />
//        <div>
//        {this.state.author} {this.state.text}
//        </div>
//      </form>
//    );
//  }
//};

// ======================
// tutorial7
// ======================
//class CommentBox extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {data: []};
//  }
//  loadCommentsFromServer() {
//    $.ajax({
//      url: this.props.url,
//      dataType: 'json',
//      cache: false,
//      success: (data) => {
//        this.setState({data: data});
//      },
//      error: (xhr, status, err) => {
//        console.error(this.props.url, status, err.toString());
//      }
//    });
//  }
//  handleCommentSubmit(comment) {
//    $.ajax({
//      url: this.props.url,
//      dataType: 'json',
//      type: 'POST',
//      data: comment,
//      success: (data) => {
//        this.setState({data: data});
//      },
//      error: (xhr, status, err) => {
//        console.error(this.props.url, status, err.toString());
//      }
//    });
//  }
//  componentDidMount() {
//    this.loadCommentsFromServer();
//    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
//  }
//  render() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList data={this.state.data} />
//        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
//      </div>
//    );
//  }
//};
//
//class CommentForm extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {author: '', text: ''};
//  }
//
//  handleAuthorChange(e) {
//    this.setState({author: e.target.value});
//  }
//
//  handleTextChange(e) {
//    this.setState({text: e.target.value});
//  }
//
//  handleSubmit(e) {
//    e.preventDefault()
//    let author = this.state.author.trim();
//    let text = this.state.text.trim();
//    if (!text || !author) {
//      return;
//    }
//    this.props.onCommentSubmit({author: author, text: text});
//    this.setState({author: '', text: ''});
//  }
//
//  render() {
//    return (
//      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
//        <input
//          type="text"
//          placeholder="Your name"
//          value={this.state.author}
//          onChange={this.handleAuthorChange.bind(this)}
//        />
//        <input
//          type="text"
//          placeholder="Say something..."
//          value={this.state.text}
//          onChange={this.handleTextChange.bind(this)}
//        />
//        <input type="submit" value="Post" />
//        <div>
//        {this.state.author} {this.state.text}
//        </div>
//      </form>
//    );
//  }
//};

//render(
//  <CommentBox url="/api/comments" pollInterval={2000} />,
//  document.getElementById('content')
//);

// ======================
// tutorial8
// ======================
//import { createStore } from 'redux';
//import { Provider, connect } from 'react-redux';

// Actions
// Action名の定義
//const SEND = 'SEND';
//// Action Creators
//function send(value) {
//  // Action
//  return {
//    type: SEND,
//    value
//  };
//}

//// Reducers
//function formReducer(state, action) {
//  switch (action.type) {
//  case 'SEND':
//      var copy = state.data.concat();
//      copy.push(Object.assign({id: String(state.data.length + 1)}, action.value));
//      return Object.assign({}, state, {
//        data: copy
//      });
//    default:
//      return state;
//  }
//}

/* Storeの実装 */
//const initialState = {
//  data: []
//};
//const store = createStore(formReducer, initialState);
//
///* Viwの実装 */
//
//// Veiw (Container Components)
//class CommentBox extends React.Component {
//  render() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList data={this.props.data} />
//        <CommentForm onCommentSubmit={this.props.handleCommentSubmit} />
//      </div>
//    );
//  }
//};
//
//CommentBox.propTypes = {
//  handleCommentSubmit: React.PropTypes.func.isRequired,
//  data: React.PropTypes.array
//};

// Veiw (Presentational Components)
//CommentForm.propTypes = {
//  onCommentSubmit: React.PropTypes.func.isRequired,
//};

//// Veiw (Presentational Components)
//CommentList.propTypes = {
//  data: React.PropTypes.array,
//};

// Connect to Redux
//function mapStateToProps(state) {
//  return {
//    data: state.data
//  };
//}
//function mapDispatchToProps(dispatch) {
//  return {
//    handleCommentSubmit(value) {
//      dispatch(send(value));
//    },
//  };
//}
//const AppContainer = connect(
//  mapStateToProps,
//  mapDispatchToProps
//)(CommentBox);

// ======================
// tutorial9
// ======================
//import { createStore, applyMiddleware } from 'redux'
//import createSagaMiddleware from 'redux-saga';
//import { fork, put, call } from "redux-saga/effects"
// Actions
// Action名の定義
//const GET = 'GET';

// Action Creators
//function get(data) {
//  // Action
//  return {
//    type: GET,
//    data
//  };
//}

//function loadCommentsFromServer() {
//  return new Promise(function(resolve) {
//    $.ajax({
//      url: "/api/comments",
//      dataType: 'json',
//      cache: false,
//      success: (data) => {
//        console.log('success')
//        resolve(data);
//      },
//      error: (xhr, status, err) => {
//        console.error(this.props.url, status, err.toString());
//        resolve([]);
//      }
//    });
//  });
//}

//function formReducer(state, action) {
//  switch (action.type) {
//    case GET:
//      return Object.assign({}, state, {data: action.data})
//    case SEND:
//      var copy = state.data.concat();
//      copy.push(Object.assign({id: String(state.data.length + 1)}, action.value));
//      return Object.assign({}, state, {
//        data: copy
//      });
//    default:
//      return state;
//  }
//}

//function* getComment() {
//  const data = yield call(loadCommentsFromServer);
//  yield put(get(data));
//}

//function* rootSaga() {
//  yield fork(getComment)
//}

// sagaの実装
//const sagaMiddleware = createSagaMiddleware()
//const store = createStore(formReducer, initialState, applyMiddleware(sagaMiddleware))
//sagaMiddleware.run(rootSaga)

//class CommentBox extends React.Component {
//  componentDidMount() {
//    this.props.loadCommentsFromServer;
//  }
//  render() {
//    return (
//      <div className="commentBox">
//        <h1>Comments</h1>
//        <CommentList data={this.props.data} />
//        <CommentForm onCommentSubmit={this.props.handleCommentSubmit} />
//      </div>
//    );
//  }
//};

//CommentBox.propTypes = {
//  loadCommentsFromServer: React.PropTypes.func.isRequired,
//  handleCommentSubmit: React.PropTypes.func.isRequired,
//  data: React.PropTypes.array
//};

//function mapDispatchToProps(dispatch) {
//  return {
//    loadCommentsFromServer() {
//      dispatch(get());
//    },
//    handleCommentSubmit(value) {
//      dispatch(send(value));
//    },
//  };
//}
//const AppContainer = connect(
//  mapStateToProps,
//  mapDispatchToProps
//)(CommentBox);

// ======================
// tutorial10
// ======================
//import { fork, put, call, take } from "redux-saga/effects"
//const SUCCESS_SEND = "SUCCESS_SEND";

//function successSend(data) {
//  return {
//    type: SUCCESS_SEND,
//    data
//  };
//}
//function handleCommentSubmit(comment) {
//  return new Promise(function(resolve) {
//    $.ajax({
//      url: 'api/comments',
//      dataType: 'json',
//      type: 'POST',
//      data: comment,
//      success: (data) => {
//        console.log('successed post request')
//        resolve(data);
//      },
//      error: (xhr, status, err) => {
//        console.error(this.props.url, status, err.toString());
//        resolve([]);
//      }
//    });
//  });
//}

//function formReducer(state, action) {
//  switch (action.type) {
//    case GET:
//      return Object.assign({}, state, {data: action.data})
//    case SUCCESS_SEND:
//      return Object.assign({}, state, {data: action.data})
//    default:
//      return state;
//  }
//}

//function* sendComment() {
//  while(true) {
//    const action = yield take(SEND);
//    const data = yield call(handleCommentSubmit, action.value);
//    yield put(successSend(data));
//  }
//}

//function* rootSaga() {
//  yield fork(getComment)
//  yield fork(sendComment)
//}

// ======================
// tutorial11
// ======================
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import AppContainer from './container'

render(
  <Provider store={store()}>
    <AppContainer />
  </Provider>,
  document.getElementById('content')
)
