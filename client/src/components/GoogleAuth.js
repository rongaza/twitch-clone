import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			// returns a promise after library initialized
			window.gapi.client
				.init({
					clientId:
						'982223110983-9ur4q5ko7e7iceo3nmvv1ala8n601pbv.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					// event listener
					// listen is a method that you pass a callback function to
					// invoked anytime authentication status is changed
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}
	// isSignedIn will be a boolean returned from this.auth.isSignedIn.listen()
	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<div>
					<button className="ui red google button" onClick={this.onSignOutClick}>
						<i className="google icon" />
						Sign Out
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<button className="ui red google button" onClick={this.onSignInClick}>
						<i className="google icon" />
						Sign In With Google
					</button>
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}
const mapStateToProps = state => {
	return { isSignedIn: state.auth.isSignedIn };
};
export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
