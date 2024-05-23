import "./index.css"
import { IoShareOutline } from "react-icons/io5";


export const ProductItems = ({product}) => {
    //console.log(product)
    return (
        <li className="product-item">
            <img src={product.images[0].src} className="product-image" alt={product.title}/>
            <div className="product-details">
                <span className="share-icon"><IoShareOutline /></span>
                <p className="vendor-name">{product.MRP.value}</p>
                <p className="vendor-name product-title">{product.vendor}</p>
                <p className="vendor-name product-title product-price">Rs.{product.price.value} <span className="product-mrp">Rs.{product.MRP.value}</span><span className="product-discount">{product.discountPercent}%</span></p>
            </div>
        </li>
    )
}