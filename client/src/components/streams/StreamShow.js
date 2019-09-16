import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import streams from '../../apis/streams';

// read id out of url
// call action creator to fetch streams
// mapstate to props to get into compomnent

class StreamShow extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}

		const { title, description } = this.props.stream;
		return (
			<div>
				<h1>{title}</h1>
				<h5>{description}</h5>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};
export default connect(
	mapStateToProps,
	{
		fetchStream,
	}
)(StreamShow);
