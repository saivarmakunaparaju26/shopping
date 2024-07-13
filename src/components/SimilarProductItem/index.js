// Write your code here
const SimilarProductItem = props => {
  const {lists} = props
  const {
    imageUrl,
    title,
    price,
    description,
    brand,
    totalReviews,
    rating,
    style,
    availability,
  } = lists

  return (
    <li>
      <img src={imageUrl} alt="similar product" />
      <p>{title}</p>
      <p>by {brand}</p>
      <p>Rs {price}/-</p>
      <p>{rating}</p>
    </li>
  )
}
export default SimilarProductItem
