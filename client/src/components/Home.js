import React from "react";
import AdvertList from "./search/AdvertList";
import AdvertDetail from "./search/AdvertDetail";

class Home extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      adverts: [],
      searchTerm: "",
      searchCategory: "AUTOMOBILE",
      _isLoaded: false,
      selectedAdvert: null
    };
  }

  handleOnSearchTermChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleCategoryChange = event => {
    this.setState({
      searchCategory: event.target.value.toUpperCase()
    });
  };

  getData = params => {
    this.setState({ _isLoaded: false });
    fetch(`http://localhost:8080/adverts/custom-search?${params}`)
      .then(res => res.json())
      .then(searchResult => {
        if (this._isMounted) {
          this.setState({
            adverts: searchResult,
            _isLoaded: true
          });
        }
      })
      .catch(console.log("get data failed"));
  };

  handleClick = id => {
    const advert = this.state.adverts.find(
      advert => advert.id === parseInt(id)
    );
    this.setState({
      selectedAdvert: advert
    });
  };

  createParams = () => {
    return `title=${this.state.searchTerm}&category=${this.state.searchCategory}`;
  };

  handleSubmit = event => {
    event.preventDefault();
    const params = this.createParams();
    this.getData(params);
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleOnSearchTermChange}
            placeholder="Search for..."
          />
          <label>
            <select onChange={this.handleCategoryChange}>
              <option selected searchCategory="automobiles">
                Automobiles
              </option>
              <option searchCategory="electronics">Electronics</option>
              <option searchCategory="home">Home</option>
              <option searchCategory="freebies">Freebies</option>
              <option searchCategory="appliances">Appliances</option>
              <option searchCategory="toys">Toys</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state._isLoaded ? (
          <AdvertList
            adverts={this.state.adverts}
            handleClick={this.handleClick}
          />
        ) : null}
        {this.state.selectedAdvert && (
          <AdvertDetail selectedAdvert={this.state.selectedAdvert} />
        )}
      </>
    );
  }
}

export default Home;
