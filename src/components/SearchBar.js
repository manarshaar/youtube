import React from "react";
import "../styles/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  handleSubmit = (e) => {
    let { handleVideoList, callAPI} = this.props;
    let {query} = this.state;
    e.preventDefault();
    callAPI(query)
      .then((data) => {
        handleVideoList(data);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    let {query} = this.state;
    return (
      <div className="header-search">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            onChange={this.handleChange}
            className="search-input"
            name="query"
            type="text"
            placeholder="Search"
            value={query}
          />

          <button type="submit" className="search-submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
