// LICENSE : MIT
'use strict';
import React from 'react';
import omit from 'lodash.omit';

export default ({Success, Failure}) => class LoadingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, error: null, value: null};
    }

    componentDidMount() {
        this.props.promise.then(
            (value) => this.setState({loading: false, value: value}),
            (error) => {
                console.log(error);
                return this.setState({loading: false, error: error});
            }
        );
    }

    render() {
        if (this.state.loading) {
            return null;
        } else if (this.state.error !== null) {
            const props = omit(this.props, 'promise');
            return <Failure
                {...props}
                error={this.state.error}
            />;
        } else {
            const props = omit(this.props, 'promise');
            console.log(this.state.value);
            return <Success
                {...props}
                value={this.state.value}
            />;
        }
    }

};
