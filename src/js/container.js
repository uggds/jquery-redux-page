import { connect } from 'react-redux';
import { get, send } from './actions'
import CommentBox from './commentBox'

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCommentsFromServer() {
      dispatch(get());
    },
    handleCommentSubmit(value) {
      dispatch(send(value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox);
