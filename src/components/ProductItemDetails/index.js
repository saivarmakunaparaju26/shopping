// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import {BsPlusSquare} from 'react-icons/bs'
import {BsDashSquare} from 'react-icons/bs'
import './index.css'

const apiStatus = {
  success: 'Success',
  failure: 'Failure',
  loading: 'Loading',
  inProgress: 'In_Progress',
}

class ProductItemDetails extends Component {
  state = {
    num: 1,
    itemDetails: [],
    similarDet: [],
    dataStatus: apiStatus.inProgress,
  }

  componentDidMount() {
    this.ggtt()
  }

  ggtt = async () => {
    this.setState({dataStatus: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jt = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jt}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }
      const similarProducts = data.similar_products.map(e => ({
        id: e.id,
        imageUrl: e.image_url,
        title: e.title,
        style: e.style,
        price: e.price,
        description: e.description,
        brand: e.brand,
        totalReviews: e.total_reviews,
        rating: e.rating,
        availability: e.availability,
      }))
      console.log(updatedData)
      console.log(similarProducts)
      this.setState({
        itemDetails: updatedData,
        similarDet: similarProducts,
        dataStatus: apiStatus.success,
      })
    } else {
      this.setState({dataStatus: apiStatus.failure})
    }
  }

  showTheValues = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case apiStatus.success:
        return this.showSuccessView()
      case apiStatus.failure:
        return this.showFailureView()
      case apiStatus.loading:
        return this.showLoadingView()
      default:
        return null
    }
  }

  goTo = () => {
    const {history} = this.props
    history.replace('/products')
  }

  incre = () => {
    this.setState(prev => ({
      num: prev.num + 1,
    }))
  }

  decre = () => {
    const {num} = this.state
    if (num === 1) {
      this.setState({num: 1})
    } else {
      this.setState(prev => ({
        num: prev.num - 1,
      }))
    }
  }

  showSuccessView = () => {
    const {itemDetails, similarDet, num} = this.state
    const {
      id,
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = itemDetails
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <img src={imageUrl} alt="product" />
        </div>
        <div>
          <h1>{title}</h1>
          <p>Rs {price}</p>
          <button type="button">
            <p>{rating}</p>{' '}
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </button>
          <p>{totalReviews}</p>
          <p> Reviews</p>
          <p>{description}</p>
          <p>Availability: {availability}</p>
          <p>Brand: {brand}</p>
        </div>
        <hr />
        <div>
          <button type="button" onClick={this.decre} data-testid="minus">
            <BsDashSquare/>
          </button>
          <p>{num}</p>
          <button type="button" onClick={this.incre} data-testid="plus">
            <BsPlusSquare />
          </button>
          <button type="button">Add To Cart</button>
        </div>
        <h1>Similar Products</h1>
        <ul>
          {similarDet.map(each => (
            <SimilarProductItem key={each.id} lists={each} />
          ))}
        </ul>
      </div>
    )
  }

  showLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  showFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button type="button" onClick={this.goTo}>
        Continue Shopping
      </button>
    </div>
  )

  render() {
    return <div>{this.showTheValues()}</div>
  }
}
export default ProductItemDetails
