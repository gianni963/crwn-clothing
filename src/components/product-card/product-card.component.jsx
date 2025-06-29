import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


import './product-card.styles.scss'

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (<div className="product-card-container">
        <img src={imageUrl} alt={`{name}`} />
        <div className='footer'>
            <img src={imageUrl} alt={`${name}`} />
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
            Add to card
        </Button>
    </div>
    );
}

export default ProductCard;