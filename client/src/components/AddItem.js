import React from 'react';
import './component_style.css';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      seller: 'http://localhost:8080/sellers/1',
      image: '',
      category: 'AUTOMOBILES'
    };
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleCategoryChange = event => {
    this.setState({
      category: event.target.value
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleImageChange = event => {
    this.setState({
      image: event.target.value
    });
  };

  handlePriceChange = event => {
    this.setState({
      price: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:8080/adverts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        seller: this.state.seller,
        image: this.state.image,
        category: this.state.category,
        dateListed: Date.now()
      })
    })
      .then(res => res.json())
      .then(this.props.getData)
      .then(
        this.setState({
          title: '',
          description: '',
          price: '',
          image: '',
          category: 'AUTOMOBILES'
        })
      );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h1 className="form-heading">Create a new listing</h1>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-5">
              <label htmlFor="title">Enter title</label>
            </div>
            <div className="col-5">
              <input
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.handleTitleChange}
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <label htmlFor="image">Enter Image Link</label>
            </div>
            <div className="col-5">
              <input
                id="image"
                name="image"
                value={this.state.image}
                onChange={this.handleImageChange}
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <label htmlFor="category">Select category</label>
            </div>
            <div className="col-5">
              <select
                onChange={this.handleCategoryChange}
                defaultValue={this.state.category}
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
            <div className="col-5">
              <label htmlFor="description">Enter description</label>
            </div>
            <div className="col-5">
              <input
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <label htmlFor="price">Enter price</label>
            </div>
            <div className="col-5">
              <input
                id="price"
                name="price"
                value={this.state.price}
                onChange={this.handlePriceChange}
                type="number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <button className="submitAdvert btn btn-secondary" type="submit">
                List now!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddItem;
