'use client';
import React from 'react';
import '../../sass/SassComp/sticky.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/swiper-bundle.css';
import { Check, CreditCard, ShieldCheck, ShoppingCart, Star } from 'lucide-react';
import { Recommendation } from '@prisma/client';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

interface Props {
  colorArr?: ColorProps[] | undefined;
  name?: string;
  varitaions?: string[];
  id: number;
  price?: number[];
  describe?: string;
  recommendation?: Recommendation[];
  cartItem: number;
}

type ColorProps = {
  color: string;
  images: string[];
  nameColor: string;
};
export const Sticky: React.FC<Props> = ({
  colorArr,
  name,
  varitaions,
  id,
  price,
  describe,
  recommendation,
  cartItem,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<number>(0);
  const [active, setActive] = React.useState<number>(0);
  const [activeSlide, setactiveSlide] = React.useState<number>(0);
  const [selectedPrice, setSelectedPrice] = React.useState<number>(0);
  const activeColor = useCartStore.getState().activeColor;
  const activeVar = useCartStore.getState().activeVariation;
  const swiperRef = React.useRef<any>(null);

  const addVar = (index: number) => {
    useCartStore.getState().addActiveVar(index);
  };
  console.log(active);
  const handleColorChange = (index: number) => {
    setSelectedColor(index);
  };
  const handleChange = (index: number) => {
    setActive(index);
  };
  const PriceChange = (index: number) => {
    setSelectedPrice(index);
  };
  const handleImageClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
      setactiveSlide(index);
    }
  };
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const addColor = async (index: number) => {
    await useCartStore.getState().addActive(index);
  };
  const idItem = Number(id);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const listLogos = [
    'https://cdn.comfy.ua/media/media/icons/apple-pay.svg',
    'https://cdn.comfy.ua/media/media/icons/google-pay.svg',
    'https://cdn.comfy.ua/media/media/icons/private-pay.svg',
    'https://cdn.comfy.ua/media/media/icons/mastercard.svg',
    'https://cdn.comfy.ua/media/media/icons/visa.svg',
  ];
  return (
    <>
      <div className="containerSlider">
        <div className="slider">
          <div>
            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              spaceBetween={50}
              navigation={true}
              slidesPerView={1}
              speed={0}
              onSlideChange={(swiper) => setactiveSlide(swiper.activeIndex)}>
              {colorArr?.[activeColor]?.images?.map((item, index) => (
                <SwiperSlide key={index}>
                  <Image src={item} alt="" width={500} height={500} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="sliderImages">
            {colorArr?.[activeColor]?.images.map((item, index) => (
              <img
                onClick={() => handleImageClick(index)}
                className={activeSlide === index ? 'active' : ''}
                key={index}
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="sliderDescribe">
            <p>{describe}</p>
          </div>
        </div>
        <div className="containerSlider__information">
          <div className="name">
            <p>{name}</p>
            <div className="Review">
              <div className="Review__stars">
                <div className="star">
                  <Star color="#ff5722" size={20} />
                  <Star color="#ff5722" size={20} />
                  <Star color="#ff5722" size={20} />
                  <Star color="#ff5722" size={20} />
                  <Star color="#ff5722" size={20} />
                </div>
                <h3>10 Reviews</h3>
              </div>
              <h2>Code: {id}</h2>
            </div>
          </div>
          {recommendation && recommendation.length > 0 ? (
            <div className="Recommendation">
              <Link href={`/Product/${recommendation?.[0]?.productId}`}>
                <div className="Recommendation__block">
                  <div className="Recommendation__block__content">
                    <div className="Image">
                      <img src={recommendation[0]?.imageUrl} alt="" />
                    </div>
                    <div className="Recommendation__block__content__text">
                      <h2 style={{ color: '#000000' }}>Reccomend</h2>
                      <p style={{ color: '#000000' }}>{recommendation[0]?.name}</p>
                    </div>
                  </div>

                  <div className="price">
                    <p style={{ color: '#000000' }}>{recommendation[0]?.price} $</p>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            ''
          )}

          <div className="colorBlock">
            <div className="ChosenColor">
              color: <b>{colorArr?.[selectedColor]?.nameColor}</b>{' '}
            </div>
            <div className="RowColors">
              {colorArr?.map((item, index) => (
                <div
                  className={activeColor === index ? 'active' : 'BoxColors'}
                  onClick={() => {
                    handleColorChange(index);
                    addColor(index);
                  }}
                  key={index}
                  style={{ backgroundColor: item.color }}></div>
              ))}
            </div>
          </div>
          <div className="variation">
            <p>
              Integrated: <b>{varitaions?.[activeVar]}</b>
            </p>
            <ul>
              {varitaions?.map((item, index) => (
                <li
                  className={activeVar === index ? 'active' : ''}
                  onClick={() => {
                    handleChange(index);
                    PriceChange(index);
                    addVar(index);
                  }}
                  key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="Banner">
            <p>Create a magical New Year together with us!</p>
            <h1>
              Delight your loved ones with gifts that will make their lives easier and bring joy!
            </h1>
          </div>
          <div className="SellBox">
            <div className="Available">
              <p>In Stock </p>
              <b>{price?.[selectedPrice]} $</b>
            </div>
            <div className="SellBox__buttons">
              {cartItem ? (
                <button
                  onClick={() => {
                    toggleDrawer();
                  }}>
                  <Check />
                  Go to cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    toggleDrawer();
                  }}>
                  <ShoppingCart size={20} color="white" />
                  Buy
                </button>
              )}
            </div>
          </div>
          <div className="payment">
            <div className="payment__content">
              <CreditCard color="#4caf50" />
              <div className="payment__content__box">
                <p>Pay for the purchase with cash, card or bank transfer (cashless)</p>
                <div className="payment__content__box__content">
                  {listLogos.map((logo, index) => (
                    <div key={index} className="logosbox">
                      <img src={logo} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ShieldCheck">
              <ShieldCheck color="#4caf50" />
              <p>
                All equipment has certificates and guarantees from the manufacturer. You can return
                it within 14 days after purchase
              </p>
            </div>
          </div>
        </div>
      </div>{' '}
      <CartDrawer
        activeVar={selectedPrice}
        selectedPrice={selectedPrice}
        id={idItem}
        active={activeColor}
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
      />
    </>
  );
};
