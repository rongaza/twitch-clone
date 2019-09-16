import React from 'react';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
		console.log(this.props);
	}

	renderActions() {
		const { id } = this.props.match.params;
		return (
			<React.Fragment>
				<button onClick={() => this.props.deleteStream(id)} className="ui button negative">
					Delete
				</button>

				<Link to="/" className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	onDismiss() {
		history.push('/');
	}

	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream';
		}

		return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={this.onDismiss}
			/>
		);
	}
}

// ownProps will grab the fetchStream(this.props.match.params.id) from componentDidMount()
const mapStateToProps = (state, ownProps) => {
	return {
		// is an object of all the different streams loaded up into redux state
		stream: state.streams[ownProps.match.params.id],
	};
};
export default connect(
	mapStateToProps,
	{ fetchStream, deleteStream }
)(StreamDelete);
