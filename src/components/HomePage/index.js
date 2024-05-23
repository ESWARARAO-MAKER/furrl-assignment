import { useEffect, useState } from "react";
import "./index.css"
import axios from "axios";
import { LoadingSpinner } from "../Loading";
import { CategoryFilters } from "../CategoryFilters";
import { ProductItems } from "../ProductItems";


const initial_state = {
    page : 0,
    pageSize : 10,
    totalPages : 10,
    totalProducts : 0,
    products : [],
};

export const HomePage = () => {
    const [productData, setProductData] = useState(initial_state);
    const [isLoading, setIsLoading] = useState(false);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [filterOptions, setFilterOptions] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20){
                if (!hasReachedEnd) setHasReachedEnd(true);
            }
        };
        const handleResize = () => {
            if (window.innerWidth > 768){
                window.location.href = "https://info.furrl.in/";
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        if (window.innerWidth > 768){
            window.location.href = "https://info.furrl.in/";
        }
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        }
    }, [hasReachedEnd]);

    const handleFilterChange = (filter) => {
        setProductData(initial_state);
        setActiveFilter(filter);
        setHasReachedEnd(false)
    };

    const fetchProductsData = async (page, activeFilter) => {
        if (page < productData.totalPages){
            setIsLoading(true)

            const url = 'https://api.furrl.in/api/v2/listing/getListingProducts';
            const requestBody = {
                input : {
                    page : page + 1,
                    pageSize : productData.pageSize,
                    filters : activeFilter ? {id: activeFilter.uniqueId, type : activeFilter.contentType} : [],
                    id : "#HomeHunts",
                    entity : 'vibe',
                }
            }

            try{
                const response = await axios.post(url, requestBody);
                const data = response.data;
                setProductData(prevData => ({
                    ...data.data.getListingProducts,
                    products : [...prevData.products, ...data.data.getListingProducts.products],
                    page : page + 1,
                }))
                setHasReachedEnd(false)
            }
            catch(err){
                console.log(err)
            }
            finally{
                setIsLoading(false);
            }
        }
    }

    const fetchFilterOptions = async () => {
        const url = 'https://api.furrl.in/api/v2/listing/getListingFilters';
        const requestBody = {
            id : "#HomeHunts",
            entity: "vibe",
        };

        try{
            const response = await axios.post(url, requestBody);
            const data = response.data;
            setFilterOptions(data.data.getListingFilters.easyFilters);
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        fetchFilterOptions();
    }, []);
    
    useEffect(() => {
        setProductData(initial_state);
        fetchProductsData(0, activeFilter);
    },[activeFilter])

    useEffect(()=>{
        if (hasReachedEnd){
            fetchProductsData(productData.page, activeFilter)
        }
    },[hasReachedEnd, productData.page, activeFilter])

    const renedrProductItems = () => {
        return productData.products.map((product, index) => (
            <ProductItems key = {product.id} product = {product} index = {index}/>
        ))
    };

    return (
        <>
            <div className="banner">
                <h2 className="banner-heading">#HomeHunts</h2>   
            </div>
            <div className="products-wrapper">
                <p className="title">
                    {/* <span className="dot"></span> */}
                    <span className="count">{productData.totalProducts} Products</span>
                </p>
                <ul className="filter-tabs">
                    <li onClick={() => handleFilterChange(null)} className={`tab ${activeFilter === null ? 'active-tab' : ''}`}>All</li>
                    {
                        filterOptions.map(option => (
                            <CategoryFilters key = {option.uniqueId}
                                item = {option} 
                                className = "tab"
                                activeFilter = {activeFilter}
                                activeFilterChange = {handleFilterChange}
                            />
                        ))
                    }
                </ul>
            </div>
            <ul className="products-list">{renedrProductItems()}</ul>
            {isLoading && <LoadingSpinner/>}
        </>
    )
}