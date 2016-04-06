import React, { Component } from "react";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getCouncilmeetings } from "./councilmeeting.actions";

export class CouncilmeetingList extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    const { getCouncilmeetings } = this.props;
    getCouncilmeetings();  
  } 

  render() {
    const { councilmeetings } = this.props;
    return (
        <div>
            <h2>Councilmeetings</h2>
            <BootstrapTable data={councilmeetings} search bordered={false}>
              <TableHeaderColumn filter= {{ type: "TextFilter" }} dataField="id" isKey hidden>
              Councilmeeting ID</TableHeaderColumn>
              <TableHeaderColumn dataField="date" dataSort width="200">Date</TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
  }

}


const mapStateToProps = (state) => {
  const councilmeetings = state.get("councilmeetings");
  return {
    councilmeetings: councilmeetings.get("councilmeetinglist").toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCouncilmeetings() {
    dispatch(getCouncilmeetings());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CouncilmeetingList);
