import React from 'react';
import styled from 'styled-components';

const Container = styled.ul`
  background-color: black;
  color: #fefefe;
`

const Movie = styled.li`
  margin: .5em 0;
`

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      apiKey: '5a7f34f54c25ea35d2c772a1bf4b5535'
    };
    console.log(this.state.apiKey)
  }

  componentDidMount() {
    const fetchMovies = async () => {
      const response = await fetch(`http://api.themoviedb.org/3/movie/upcoming?api_key=${this.state.apiKey}`);
      const json = await response.json();
      this.setState({
        movies: json.results
      })
    }
    fetchMovies();
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Container>
        {this.state.movies.map((movie, index) => <Movie key={index}>{movie.title}</Movie>)}
      </Container>
    )
  }
}

export default Movies;