import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/Counotdown";

const NewItems = () => {
    const [data, setData] = useState([])
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
          setData(response.data)
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching new items data:", error);
        }
      }
      fetchData()
    }, [])

      const responsiveSettings = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
    1200: {
      items: 4,
    }
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {data.length > 0 ? (
            <OwlCarousel className="owl-theme" responsive={responsiveSettings} items={7} loop margin={2} dots={false} mouseDrag={false} nav>  
              {data.map((item, index) => (
                <div className="col-lg-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.author}`}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate ? (
                      <div className="de_countdown">
                        <CountdownTimer item={item} />
                      </div>
                    ) : null}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel className="owl-theme" responsive={responsiveSettings} items={4} loop margin={2} dots={false} mouseDrag={false} nav>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="nft_item" key={index}>
                    <div className="author_list_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%"
                        />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft__item_preview">
                        <Skeleton width="80%" height="200px" />
                    </div>
                    <div className="nft_coll_info">
                        <Skeleton width="100px" height="20px" />
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
