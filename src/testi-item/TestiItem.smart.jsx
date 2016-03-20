import React, { Component, PropTypes } from "react";

export class TestiItem extends Component {

  saveItem(event) {
    event.preventDefault();

  	const { addTestiItem } = this.props;
    const newItem = {
      id: this.props.id+1,
      name: this.props.name,
      status: this.props.status,
    }

    addTestiItem(newItem);
  }

  render() {
  	const { id, name, status } = this.props;
		return (
			<div>
	      <h3>Olen TestiItem id: { id }</h3>
        <p>nimeltä: { name }</p>
        <p>ja statukseni on { status }</p>
	      <button onClick={(event) => this.saveItem(event) }>addTestiItem</button>
	    </div>
		);
  }
}

TestiItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

import { connect } from "react-redux";

import { addTestiItem } from "./TestiItem.actions";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addTestiItem(TestiItem) {
    dispatch(addTestiItem(TestiItem))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestiItem);
