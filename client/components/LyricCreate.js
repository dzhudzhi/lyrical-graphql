import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        songId: this.props.songId,
        content: this.state.content
      }
    }).then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
