import React, { Component } from 'react';
import { Alert as BSAlert } from 'react-bootstrap';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.variant = props.variant || "primary";
  }

  render() {
    return (
      <div>
        <BSAlert variant={this.variant} className='text-center m-0'>
          {this.props.text}
        </BSAlert>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.variant = "info";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.variant = "danger";
  }
}

export { InfoAlert, ErrorAlert };
