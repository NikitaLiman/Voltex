'use client';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../sass/Card.scss';
import 'swiper/swiper-bundle.css';
import { ShoppingCart } from 'lucide-react';
import { Pagination } from 'swiper/modules';
import { CartDrawer } from '../ui/cart-drawer';
import { useCartStore } from '@/store/cart';

interface Props {
  id: number;
  name: string;
  price: number[];
  variation: string[];
  color: ColorProps[];
  title: string;
  text: string;
  display: string;
  product: ProductProps;
  categoryId: number;
}

type ColorProps = {
  color: string;
  images: string[];
};
interface ProductProps {
  items: any[];
}

export const Card: React.FC<Props> = ({
  id,
  name,
  price,
  color,
  variation,
  title,
  text,
  display,
  product,
  categoryId,
}) => {
  const [active, setActive] = React.useState<number>(0);
  const [activeVar, setActiveVar] = React.useState<number>(0);
  const activeModelIndex = 0;
  const swiperRef = React.useRef(null);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const addColor = async (index: number) => {
    await useCartStore.getState().addActive(index);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const categories = [
    { name: 'Phones', type: 'Internal Memory' },
    { name: 'Laptops', type: 'RAM' },
    { name: "TV's & Monitor's", type: 'Quality' },
    { name: 'Peripherals Devices', type: 'Audio Format' },
    { name: 'Smart Watches', type: 'Storage' },
  ];
  const category = categories.filter(
    (a) => a.name.toLocaleLowerCase() === title.toLocaleLowerCase(),
  );

  const handleColor = (index: number) => {
    setActive(index);
  };
  const handleVar = (index: number) => {
    setActiveVar(index);
  };

  return (
    <>
      <div className="containerCard">
        {' '}
        <Link href={`/Product/${id}`}>
          {' '}
          <div className="Image">
            {' '}
            <Swiper
              ref={swiperRef}
              modules={[Pagination]}
              pagination={true}
              spaceBetween={0}
              speed={0}
              slidesPerView={1}>
              {' '}
              {product.items[activeModelIndex]?.color[active]?.images
                ?.slice(0, 3)
                ?.map((item: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img src={item} alt="" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>{' '}
        </Link>
        <div className="colorsCard">
          {product.items[activeModelIndex]?.color?.map((color: any, index: number) => (
            <ul key={index}>
              <li
                onClick={() => {
                  handleColor(index);
                  addColor(index);
                }}
                className={active === index ? 'active' : 'color'}
                style={{ backgroundColor: color.color }}></li>
            </ul>
          ))}
          <p></p>
        </div>
        <h1>{name}</h1>
        <div className="containerCard__PriceInfo">
          <h3>{price?.[activeVar]} $</h3>
          <div
            onClick={() => {
              toggleDrawer();
            }}
            className="cart">
            <ShoppingCart size={25} color="white" />
          </div>
        </div>
        <div className="OverFlowContainer">
          <div className="Memory">
            {category && <h2>{category?.[0]?.type}</h2>}
            <ul>
              {variation?.map((variation, index) => (
                <li
                  className={activeVar === index ? 'Active' : ''}
                  onClick={() => handleVar(index)}
                  key={index}>
                  {variation}
                </li>
              ))}
            </ul>
            <div className="Display">
              {categoryId === 4 ? (
                ''
              ) : (
                <p>
                  Display: <span>{display}</span>
                </p>
              )}
            </div>
          </div>

          <div className="text">
            <p>{text}</p>
          </div>
        </div>
      </div>
      <CartDrawer
        activeVar={activeVar}
        id={id}
        active={active}
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
      />
    </>
  );
};
