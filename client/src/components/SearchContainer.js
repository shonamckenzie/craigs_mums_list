import React from 'react';
import AdvertList from './advert/AdvertList';
import AdvertDetail from './advert/AdvertDetail';
import './component_style.css'

class Home extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      adverts: [],
      searchTerm: '',
      searchCategory: 'AUTOMOBILES',
      _isLoaded: false,
      selectedAdvert: null,
      embedded: false
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
      });
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
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <div className="container">
            <h1>Search for an item</h1>
            <div className="row">
              <div className="col-6">
                <label>Search Term</label>
              </div>
              <div className="col-6">
              <input
                type="text"
                onChange={this.handleOnSearchTermChange}
                placeholder="Search for..."
              />
              </div>
            </div>
          <div className="row">
            <div className="col-6">
              <label>
                Category
              </label>
            </div>
            <div className="col-6">
              <select
                defaultValue={this.state.searchCategory}
                onChange={this.handleCategoryChange}
                className="dropdown"
              >
                <option value="AUTOMOBILES">Automobiles</option>
                <option value="ELECTRONICS">Electronics</option>
                <option value="HOME">Home</option>
                <option value="FREEBIES">Freebies</option>
                <option value="APPLIANCES">Appliances</option>
                <option value="TOYS">Toys</option>
              </select>
            </div>
          </div>   
            <div className="row">
              <div className="col">    
                <input type="submit" value="Submit" className="btn btn-secondary searchButton" />
              </div> 
            </div> 
          </div>
        </form>
        {this.state._isLoaded ? (
          <AdvertList
            adverts={this.state.adverts}
            handleClick={this.handleClick}
            embedded={this.state.embedded}
          />
        ) : null}
        <AdvertDetail
          selectedAdvert={this.state.selectedAdvert}
          embedded={this.state.embedded}
        />
      </>
    );
  }
}

export default Home;
