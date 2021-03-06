import React from 'react';
import AdvertList from './advert/AdvertList.js';
import AdvertDetail from './advert/AdvertDetail.js';
import AddItem from './AddItem.js';

class AdvertContainer extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      adverts: [],
      selectedAdvert: null,
      url:
        'http://localhost:8080/adverts/search/findAdvertBySellerId?sellerId=1',
      _isLoaded: false,
      embedded: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = () => {
    this.setState({ _isLoaded: false });
    fetch(this.state.url)
      .then(res => res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ adverts: data._embedded.adverts, _isLoaded: true });
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

  render() {
    return (
      <>
        <AddItem getData={this.getData} />
        {this.state._isLoaded ? (
          <AdvertList
            adverts={this.state.adverts}
            handleClick={this.handleClick}
            embedded={this.state.embedded}
          />
        ) : (
          <p>Loading</p>
        )}
        <AdvertDetail
          selectedAdvert={this.state.selectedAdvert}
          embedded={this.state.embedded}
        />
      </>
    );
  }
}

export default AdvertContainer;
