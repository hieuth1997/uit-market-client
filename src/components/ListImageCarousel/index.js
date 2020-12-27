import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';

import * as host from "./../../constants/host";
import './style.css';
import ItemNews from './../itemNews';

export class ListImageCarousel extends Component {
    render() {
        const options = {
            items: 3,
            autoplay: true,
            margin: 30,
            loop: true,
            rewind: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                }
            }
        };

        const events = {
            onDragged: function (event) { },
            onChanged: function (event) { }
        };
        const {
            listImageProduct: listImageProduct = [],
        } = this.props;

        let listImageProducts = [];
        if (listImageProduct === null) {
            listImageProducts = ['abc.jpg'];
        } else {
            listImageProducts = listImageProduct;
        }

        return (
            <div className="list-image-carousel">
                <div className="list-item">
                    {
                        listImageProducts.length ?
                            <OwlCarousel ref="car" options={options} events={events} >
                                {
                                    listImageProducts.map((item, index) => {

                                        return <div className="img-product" key={index}>
                                            <img className="img-content-ask" src={`${host.apiUrl}/product/image/${item.imageUrl}`} alt="feed" />
                                        </div>
                                    })
                                }
                            </OwlCarousel> : null
                    }
                    {/* <OwlCarousel ref="car" options={options} events={events} >
                        <div className="img-product">
                            <img className="img-content-ask" src="./../assets/images/bitmap@3x.jpg" alt="feed" />
                        </div>
                        <div className="img-product">
                            <img className="img-content-ask" src="./../assets/images/bitmap@3x.jpg" alt="feed" />
                        </div>
                        <div className="img-product">
                            <img className="img-content-ask" src="./../assets/images/bitmap@3x.jpg" alt="feed" />
                        </div>
                    </OwlCarousel> */}
                </div>
            </div>
        )
    }
}

export default ListImageCarousel
