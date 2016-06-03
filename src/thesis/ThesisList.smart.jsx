/**
* ThesisList.smart for displaying the data relating to all the thesis added to the
* database. It contains the component for rendering the needed displayable data, and
* the container containing various functions for handling the connections between the
* component and Redux.
*/

import React, { Component } from "react";
import { Table, Thead, Th, unsafe } from "reactable";

export class ThesisList extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.theses = [];
    this.state.allTheses = [];
    this.state.inProgressTheses = [];
  }

  /**
  * Defines what is done at the beginning of the components life before rendering.
  * Switches the state used by Table between all and in progress theses
  */
  componentWillMount() {
    this.props.getTheses();
  }

  componentWillReceiveProps(newProps) {
    this.selectFields(this.props.theses);
    this.setState({ theses: this.state.inProgressTheses });
  }

  /**
   * Selects desired fields from raw thesis objects and formats them
   * We keep track of two sets of theses: all and only in progress
   */
  selectFields(theses) {
    for (let i = 0; i < theses.length; i++) {
      const origDate = new Date(theses[i].deadline);
      const newDate = `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
      const link = '<a href="thesis/' + theses[i].id + '">' + theses[i].title + "</a>";
      const newThesis = {
        Status: theses[i].ThesisProgress.isDone ? "Done" : "In progress",
        Author: theses[i].author,
        title: unsafe(link),
        graders: theses[i].User.name,
        StudyField: theses[i].StudyField.name,
        deadline: newDate,
      };
      if (!theses[i].ThesisProgress.isDone) {
        this.state.inProgressTheses.push(newThesis);
      }
      this.state.allTheses.push(newThesis);
    }
  }

  /**
   * Defines what happens when we check the checkbox
   */
  filterOldTheses(event) {
    console.log("filtering theses")
    // const box = document.getElementById("chekki");
    // box.checked = "true"
    // this.refs.checkbox.checked = "true"

    console.log(this.refs.checkOld.checked)

    if (this.refs.checkOld.checked) {
      this.setState({ theses: this.state.allTheses });
    } else {
      this.setState({ theses: this.state.inProgressTheses });
    }
  }
  /**
  * The method in charge of rendering the outlook of the page. Contains all the html elements.
  * Contains a reactable library styled table.
  * #return <div>-container Container wrapping all the html elements to be rendered.
  */

  render() {
    const columns = [
      "Status",
      "Author",
      "title",
      "graders",
      "StudyField",
      "deadline",
    ];
    return (
      <div>
        <h2 className="ui dividing header">Theses</h2>
        {/*<div className="ui celled horizontal list">
          <div className="item">About Us</div>
          <div className="item">Contact</div>
          <div className="item">Support</div>
        </div>*/}
        <div className="ui right input">
          <div className="ui checkbox">
            <input ref="checkOld"
              type="checkbox" onClick={this.filterOldTheses.bind(this)}
            />
            <label>Show also finished theses</label>
          </div>
        </div>
        {/*<div className="field">
          <span>Show also finished theses</span>
          <input ref="checkbox" className="checkbox" type="checkbox" onClick={this.filter.bind(this)}/>
        </div>*/}
        <Table
          className="ui table"
          noDataText="No theses found"
          ref="table"
          sortable columns={columns}
          data={this.state.theses}
          filterable={columns}
        >
          <Thead>
            <Th column="Status">Status</Th>
            <Th column="Author">Author</Th>
            <Th column="title">Thesis title</Th>
            <Th column="graders">Instructor</Th>
            <Th column="StudyField">Field</Th>
            <Th column="deadline">Deadline</Th>
          </Thead>
        </Table>
      </div>
    );
  }
}
import { connect } from "react-redux";
import { getTheses } from "./thesis.actions";

/**
* A special funciton used to define what the form of the data is that is gotten from the state.
* #return ListOfThesis A list containing all the thesis listed in the database.
*/
const mapStateToProps = (state) => {
  const user = state.get("auth").get("user");
  const thesis = state.get("thesis");
  return {
    theses: thesis.get("theses").toJS(),
    user: user.toJS(),
  };
};

/**
* A special function used to define and dispatch the relevant data to the right
* actions in thesis.actions.
*/
const mapDispatchToProps = (dispatch) => ({
  getTheses() {
    dispatch(getTheses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThesisList);
