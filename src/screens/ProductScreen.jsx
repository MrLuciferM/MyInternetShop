import React,{useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import Rating from '../components/Rating'
function ProductScreen() {

    const [product, setProduct] = useState([])
    const { id } = useParams()

    useEffect(() => {
      async function fetchProduct() {
        const { data } = await axios.get(`/api/products/${id}`)
        setProduct(data)
      }
  
      fetchProduct()
    },[id])

  return (
    <div>
          <Link to='/' className='btn btn-outline-light my-3'>Go Back</Link>
          <Row>
              <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                      <ListGroup.Item>
                          <h3>{ product.name }</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}></Rating>
                      </ListGroup.Item>
                      <ListGroup.Item>
                         Price: ${ product.price }
                      </ListGroup.Item>
                      <ListGroup.Item>
                         Description: { product.description }
                      </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                      <ListGroup.Item>
                          <Row>
                              <Col>
                                  Price:
                              </Col>
                              <Col>
                                  <strong>${product.price}</strong>
                              </Col>
                          </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Row>
                              <Col>
                                  Stock:
                              </Col>
                              <Col>
                                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                              </Col>
                          </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <div className='d-grid gap-2'>
                          <Button className='btn-block' type='button' disabled={product.countInStock===0}>Add to Cart</Button>
                          </div>
                      </ListGroup.Item>
                </ListGroup>
              </Col>
          </Row>
    </div>
  )
}

export default ProductScreen