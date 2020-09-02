import React, { Component } from "react";

const withLoader = (propValue) => (WrappedComponet) => {
  return class WithLoaderComponent extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return this.props[propValue].length === 0 ? (
        <div>
          <h1> Cargando... </h1>
        </div>
      ) : (
        <WrappedComponet {...this.props} />
      );
    }
  };
};

export default withLoader;
