import React from "react";
import { connect } from "react-redux";

export default connect((state) => ({ remotes: state.remotes }))(
  function RemoteList({ remotes }) {
    return (
      <div className="RemoteList">
        {remotes?.map((e) => {
          return <div key={e}> {e}</div>;
        })}
      </div>
    );
  }
);
