import React, { useState, useEffect, useRef } from 'react';
import '../styles/Details.css';
import SoldIcon from '../images/sold.png';


export default function Details() {

  const product = { // Product Data
    id: 1,
    name: 'new macbook laptop',
    slug: 'new-luxury-laptop',
    photo: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1999,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque consectetur vero asperiores quis animi explicabo accusamus nemo cupiditate harum pariatur! Provident sit tenetur totam mollitia consectetur nesciunt, recusandae obcaecati itaque!',
    images: [
      {
        src: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        src: 'https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ],
    colors: ["#2287fa", "#f71b1b", "green"],
    infos: [
      {
        title: "highlights",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis magni illum, sint explicabo esse temporibus! Dicta, voluptatum dolorem numquam deserunt, doloribus, voluptatem consequuntur praesentium deleniti nulla in repellendus eum vero."
      },
      {
        title: "materials",
        content: "materials"
      },
      {
        title: "how to use",
        content: "how to use"
      },
      {
        title: "pro tips",
        content: "pro tips"
      }
    ],
    discount: 20,
    sold: 52,
    category: 'laptop',
    brand: 'apple'
  }

    const [slideIndex, setSlideIndex] = useState(1);
    const [width, setWidth] = useState(0);
    const [start, setStart] = useState(0);
    const [change, setChange] = useState(9);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [infoTitle, setInfoTitle] = useState(product.infos[0].title);
    const slideRef = useRef();

    useEffect(() => {
        if(!slideRef.current) return;
        const scrollWidth = slideRef.current.scrollWidth;
        const childrenElementCount = slideRef.current.childElementCount;
        const width = scrollWidth / childrenElementCount;
        setWidth(width);
    }, [])

    const plusSlides = (n) => {
        setSlideIndex( prev => prev + n);
        slideShow( slideIndex + n);
    }

    const slideShow = (n) => {
        if(n > product.images.length) {setSlideIndex(1)};
        if(n < 1) {setSlideIndex(product.images.length)};
    }



    //   Drag function
    const dragStart = (e) => {
        setStart(e.clientX)
    }
    const dragOver = (e) => {
        let touch = e.clientX;
        setChange(start - touch);

    }
    const dragEnd = (e) => {
        if(change > 0) {
            slideRef.current.scrollLeft += width
        } else {
            slideRef.current.scrollLeft -= width
        }
    }

    useEffect(() => {
        if(!slideRef.current || !width) return;
        let numOfThumb = Math.round(slideRef.current.offsetWidth / width);
        slideRef.current.scrollLeft = slideIndex > numOfThumb ? (slideIndex - 1) * width : 0;
    }, [width, slideIndex])


  return (
    <>
        <section className='product-details'>
            <div className='product-page-image'>
                {
                    product.images.map((image, index) => (
                        <div 
                            key={index} 
                            className='mySlides'
                            style={{display : (index + 1) === slideIndex ? "block" : "none"}}
                            >
                            <div className='numberText'>{index + 1} / {product.images.length}</div>
                            <img src={image.src} alt="" />
                        </div>
                    ))
                }

                <a href='# ' className='prev' onClick={() => plusSlides(-1)} >{'<'}</a>
                <a href='# ' className='next' onClick={() => plusSlides(1)}>{'>'}</a>

                <div className='slider-image' draggable={true}
                    ref={slideRef}
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    onDragEnd={dragEnd}
                >
                    {
                        product.images.map((image, index) => (
                            <div key={index} className={`slider-box ${index + 1 === slideIndex && 'active'}`}
                            onClick={() => setSlideIndex(index + 1)}
                            >
                                <img src={image.src} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='product-page-details'>
                <strong>{product.name}</strong>
                <p className='product-category'>
                    {product.brand} - {product.category}
                </p>
                <p className='product-price'>
                    ${Math.round(product.price - product.price * product.discount / 100)} <del>{product.price}</del>
                </p>
                <p className='product-small'>{product.desc}</p>
                <div className='product-options'>
                <span>Color</span>
                    {
                        product.colors.map(color => (
                            <div key={color} >
                                <button style={{background: color}}
                                  className={color === selectedColor ? "active" : ""}
                                  onClick={() => setSelectedColor(color)}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className='product-page-offer'>
                    <i className='fa-solid fa-tag' /> {product.discount}% Discount
                </div>
                <div className='product-solid'>
                    <img src={SoldIcon} alt='SoldIcon' />
                    <strong>{product.sold} <span>Product Sold.</span></strong>
                </div>
                <div className='card-btns'>
                    <a href='# ' className='add-card'>Add to card</a>
                    <a href='# ' className='add-card buy-now'>Buy Now</a>
                </div>
            </div> 
        </section>
        <section className='product-all-info'>
          <ul className='product-info-menu'>
              {
                product.infos.map(info => (
                  <li key={info.title} 
                  className={`p-info-list ${info.title === infoTitle ? "active" : ""}`}
                  onClick={() => setInfoTitle(info.title)}
                  >
                    {info.title}
                  </li>
                ))
              }
          </ul>
          {
            product.infos.map(info => (
              <div key={info.title} className={`info-container ${info.title === infoTitle ? "active" : ""}`}>
                 {info.content}
              </div>
            ))
          }
        </section>
    </>
  )
}
