import React, { Component, PropTypes } from "react";

import GradersDropdown from "../ui/GradersDropdown.component";
import Validate from "../validate/Validate";
import ValidateError from "../ui/Error.component";
import { updateErrors, validateField, validateModel } from "../config/Validator";

export class GraderListCreateUpdate extends Component {
  constructor() {
    super();
    // this.state = {
    //   newGrader: {},
    //   updateGrader: {},
    //   errors: {},
    // };
    this.state = {
      newGrader: Validate.createForm("newGrader", "grader"),
      updateGrader: Validate.createForm("updateGrader", "grader"),
      errors: {},
    };
  }

  componentWillMount() {
    Validate.subscribeToForm("newGrader", this, this.setState);
    Validate.subscribeToForm("updateGrader", this, this.setState);
  }

  handleChange(name, type, event) {
    event.preventDefault();
    if (this.props.editable) {
      if (name === "select" && type === "updateGrader") {
        // this.setState({
        //   updateGrader: Object.assign({}, this.props.Graders[event.target.value]),
        // });
        Validate.replaceForm("updateGrader", this.props.Graders[event.target.value]);
        // this.setState({
        //   updateGrader: Validate.getForm("updateGrader"),
        // });
      } else {
        // const change = {
        //   errors: updateErrors(event.target.value, name, "grader", this.state.errors),
        // };
        // change[type] = this.state[type];
        // change[type][name] = event.target.value;
        // this.setState(change);
        Validate.updateForm("newGrader", name, event.target.value);
        // this.setState({
        //   newGrader: Validate.getForm("newGrader"),
        // });
      }
    }
  }

  handleClick(type, event) {
    event.preventDefault();
    if (this.props.editable) {
      if (type === "create") {
        console.log("yo create");
        const errors = validateModel(this.state.newGrader, "grader");
        if (errors.list.length === 0) {
          this.props.saveGrader(this.state.newGrader);
        }
      } else if (type === "update") {
        console.log("yo update");
        const errors = validateModel(this.state.updateGrader, "grader");
        if (errors.list.length === 0) {
          this.props.updateGrader(this.state.updateGrader);
        }
      }
    }
  }

  renderCreate() {
    return (
      <div className="four fields">
        <div className=" field">
          <label>Title</label>
          <select
            className="ui fluid search dropdown"
            value={this.state.newGrader.values.title}
            onChange={this.handleChange.bind(this, "title", "newGrader")}
          >
            <option value="">Select title</option>
            <option value="Prof">Professor</option>
            <option value="AssProf">Assistant Professor</option>
            <option value="AdjProf">Adjunct Professor</option>
            <option value="Doc">Doctor</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={this.state.newGrader.values.name}
            placeholder="Name"
            onChange={this.handleChange.bind(this, "name", "newGrader")}
          />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui green button"
            onClick={this.handleClick.bind(this, "create")}
          >
            Create Grader
          </button>
        </div>
      </div>
    );
  }

  renderUpdate() {
    const { Graders } = this.props || [];
    // console.log("my graders: ")
    // console.log(Graders)
    return (
      <div className="four fields">
        <div className=" field">
          <label>Who</label>
          <select
            className="ui fluid search dropdown"
            onChange={this.handleChange.bind(this, "select", "updateGrader")}
          >
            { Graders.map((item, index) =>
              <option key={ index } value={ index } >
                { `${item.title} ${item.name}` }
              </option>
            )}
          </select>
        </div>
        <div className="field">
          <label>Title</label>
          <select
            className="ui fluid search dropdown"
            value={this.state.updateGrader.values.title}
            onChange={this.handleChange.bind(this, "title", "updateGrader")}
          >
            <option value="Prof">Professor</option>
            <option value="AssProf">Assistant Professor</option>
            <option value="AdjProf">Adjunct Professor</option>
            <option value="Doc">Doctor</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={this.state.updateGrader.values.name}
            placeholder="Name"
            onChange={this.handleChange.bind(this, "name", "updateGrader")}
          />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="ui blue button"
            onClick={this.handleClick.bind(this, "update")}
          >
            Update Grader
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { formname, Graders, selected, editable } = this.props;
    // console.log(Graders)
    // console.log(selected);
    return (
      <div className="field">
        <h3 className="ui dividing header">Graders</h3>
        <div className="field">
          <label>Select Graders</label>
          <GradersDropdown formname={formname} graders={Graders} selected={selected} editable={editable}/>
        </div>
        { this.props.editable ?
          <span>
            <h3 className="ui dividing header">Create or update Graders</h3>
            { this.renderCreate() }
            { this.renderUpdate() }
          </span>
            :
          <span>
          </span>
        }
      </div>
    );
  }
}

import { connect } from "react-redux";

import { saveGrader, updateGrader } from "../grader/grader.actions";

const mapDispatchToProps = (dispatch) => ({
  saveGrader(newGrader) {
    dispatch(saveGrader(newGrader));
  },
  updateGrader(data) {
    dispatch(updateGrader(data));
  },
});

const mapStateToProps = (state) => {
  const greducer = state.get("grader");
  return {
    Graders: greducer.get("graders").toJS(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraderListCreateUpdate);
