import React, { Component } from "react";

export class FlashMessage extends Component {

  constructor() {
    super();
    this.handleMessageClose = this.handleMessageClose.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.messages.length > 0) {
  //     const newMsgId = newProps.messages[newProps.messages.length-1].id;
  //     // console.log("setting timer on id: " + newMsgId);
  //     setTimeout(() => {
  //       this.props.deleteMessage(newMsgId);
  //     }, 4000);
  //   }
  // }

  handleMessageClose(message, event) {
    event.preventDefault();
    this.props.deleteMessage(message.id);
  }

  renderMessage(message) {
    return (
      <div className={`ui ${message.type} message`}>
        <i className="close icon" onClick={this.handleMessageClose.bind(this, message)}></i>
        <div className="header">
          { message.title }
        </div>
        <p>{ message.body }</p>
      </div>
    );
  }

  render() {
    const { messages } = this.props;
    return(
      <div className="flashmessage-container">
        { messages.map(msg => this.renderMessage(msg)) }
      </div>
    );
  }
}

import { connect } from "react-redux";
import { deleteMessage } from "./flash.actions";

const mapStateToProps = (state) => {
  const freducer = state.get("flash");
  return {
    messages: freducer.get("messages").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteMessage(id) {
    dispatch(deleteMessage(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
