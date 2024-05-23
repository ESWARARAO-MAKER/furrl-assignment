import { useCallback, useEffect } from "react";
import "./index.css"


export const Navbar = () => {
    let lastScrollPosition = 0;
    const handleScroll = useCallback(() => {
        const navbarEle = document.getElementById("navbar");
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100){
            navbarEle.style.top = "-100px";
        }
        else{
            navbarEle.style.top = "0";
        }
        lastScrollPosition = currentScrollPosition;
    }, [lastScrollPosition]);

    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    },[handleScroll]);


    return (
        <div className="navbar-container" id="navbar">
            <img src="https://web.furrl.in/_next/static/media/Furrl.13550a62.svg" alt = "Furrl Logo"/>
            <div className="navbar-links">
                <a href="https://furrl.in/wishlist">
                    <img src="https://web.furrl.in/_next/static/media/Whislist.2ac94d87.svg" alt="WishList"/>
                </a>
                <a href="https://furrl.in/cart">
                    <img src="https://web.furrl.in/_next/static/media/Bag.b94fa005.svg" alt="WishList"/>
                </a>
            </div>
        </div>
    )
}