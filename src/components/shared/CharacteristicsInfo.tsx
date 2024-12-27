'use client';

import React from 'react';
import Styles from '../../sass/CharacteristicsInfo.module.scss';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface CharacteristicsItem {
  id: number;
  name: string;
  productId: number;
  phone: Phone[];
  laptops: Laptop[];
  Tvs: Tvs[];
  Earpohnes: Earphones[];
  Keyboard: Keyboard[];
  Mouse: Mouse[];
}

interface Phone {
  id: number;
  name: {
    Series: string;
  };
  standardInternet: {
    'Communication standard/Internet': {
      'Communication standard': string[];
    };
  };
  Display: {
    'Matrix type': string;
    Additionally: string[];
    'Screen diagonal': string;
    'Screen material': string;
    'Display resolution': string;
    'Screen refresh rate': string;
  };
  SimCards: {
    'SIM card format': string[];
    'Number of SIM cards': number;
  };
  MemoryFunctions: {
    'Built-in memory': string;
    'Maximum supported memory card capacity': string;
  };
  OperatingSystem: {
    'Operating system': string;
  };
  FrontCamera: {
    Additionally: string[];
    'Front camera': string;
    'Front flash type': string;
    'Stabilization method': string;
    'Front camera features': string[];
    'Front camera placement': string;
    'Front camera video recording': string;
  };
  Processor: {
    'Apple Series': string;
    'Processor name': string;
    'Number of cores': string;
  };
  MainCamera: {
    'Main camera': string;
    Additionally: string[];
    'Video recording': string[];
    'Main camera features': string[];
    'Stabilization method': string;
    'Number of main cameras': number;
    'Main camera video recording': string;
  };
  Materials: {
    'Body material': string;
  };
  Connectors: {
    Connectors: string;
  };
  Navigation: {
    Navigation: string[];
  };
  Dimensions: {
    Depth: string;
    Width: string;
    Height: string;
    Weight: string;
  };
  WirelessTechnologies: {
    'Wireless technology characteristics': string[];
  };
  characteristicsId: number;
}
interface Laptop {
  name: {
    Series: string;
  };
  Screen: {
    'Matrix type': string;
    Additionally: string[];
    'Screen diagonal': string;
    'Screen material': string;
    'Display resolution': string;
    'Screen refresh rate': string;
  };
  Processor: {
    'Processor name': string;
    'Number of cores': number;
    'Operating system': string;
  };
  MemoryFunctions: {
    RAM: string;
    'Built-in memory': string;
    'Maximum supported memory card capacity': string;
  };
  VideoCard: {
    'Video card type': string;
    'Video card manufacturer': string;
    'Integrated graphics card': string;
  };
  Corps: {
    Color: string[];
    'Body material': string;
    'Battery capacity, Wh': string;
  };
  Connectors: {
    Connectors: string[];
  };
  Dimensions: {
    Depth: string;
    Width: string;
    Height: string;
    Weight: string;
  };
  Navigation: {
    Navigation: string[];
  };
  WirelessTechnologies: {
    'Wireless technology characteristics': string[];
  };
  BatteryLife: {
    'Movie playback': string;
    'Wireless Internet': string;
  };
  SoundSystem: {
    Description: string[];
  };
  Features: {
    Additionally: string[];
  };
  DeliverySet: {
    Items: string[];
  };
  Origin: {
    'Country of origin': string;
    'Country of brand registration': string;
  };
  Guarantee: {
    Guarantee: string;
  };
  characteristicsId: number;
}

interface Tvs {
  id: number;
  characteristicsId: number;
  name: {
    Series: string;
  };
  ScreenDiagonal: {
    Value: string;
  };
  SmartTV: {
    Features: string[];
  };
  DisplayTechnology: {
    Technology: string;
  };
  UpdateFrequency: {
    Rate: string;
  };
  Resolution: {
    Type: string;
    Pixels: string;
  };
  ModelYear: {
    Year: string;
  };
  MatrixType: {
    Type: string;
  };
  CountryRegistration: {
    Country: string;
  };
  BatteryLife: {
    Lifetime: string;
  };
  Interfaces: {
    Inputs: string[];
  };
  Features: {
    Options: string[];
  };
  DeliverySet: {
    Items: string[];
  };
  Origin: {
    Country: string;
    BrandCountry: string;
  };
  Guarantee: {
    Period: string;
  };
}
interface Earphones {
  id: number;
  PeripheralsId: number;
  characteristicsId: number;
  name: { Series: string };
  HeadphoneType: { Type: string; NoiseCancellation: string };
  Features: { Options: string[] };
  ConnectionType: { Type: string };
  ConnectionInterface: { Interface: string[] };
  ChargingInterface: { Interface: string };
  AdditionalFeatures: { Features: string[] };
  CountryRegistration: { Country: string };
  Guarantee: { Period: string };
}
interface Keyboard {
  id: number;
  name: { Series: string };
  KeyboardType: { Type: string; SwitchType: string };
  Connection: { Interface: string; Type: string };
  CountryOrigin: { Country: string };
  Layout: { Type: string; KeyCount: number };
  Weight: { Value: string };
  AdditionalFeatures: { Features: string[] };
  Interface: { Ports: string[] };
  Dimensions: { Height: string; Depth: string; Width: string };
  Guarantee: { Period: string };
}

interface Mouse {
  id: number;
  PeripheralsId: number;
  characteristicsId: number;
  name: { Series: string };
  Connection: { Type: string };
  Interface: { Ports: string[] };
  Features: { Options: string[] };
  Type: { Usage: string; Ergonomics: string };
  SensorType: { Technology: string; DPI: string };
  Guarantee: { Period: string };
}

interface CharacteristicsArray {
  Items: any[];
}

export const CharacteristicsInfo: React.FC<CharacteristicsArray> = ({ Items }) => {
  const phone = Items?.[0].Characteristics?.[0]?.phone?.[0];
  const laptop = Items?.[0].Characteristics?.[0]?.laptops?.[0];
  const Tvs = Items?.[0].Characteristics?.[0]?.Tvs?.[0];
  const Earphones = Items?.[0].Characteristics?.[0]?.Earpohnes?.[0];
  const KeyBoard = Items?.[0].Characteristics?.[0]?.Keyboard?.[0];
  const Mouse = Items?.[0].Characteristics?.[0]?.Mouse?.[0];

  const activeColor = useCartStore.getState().activeColor;
  const activeVar = useCartStore.getState().activeVariation;

  const render = (obj: Record<any, string>) => {
    return Object?.entries?.(obj)?.map(([key, value]) => (
      <div className={Styles.renderComponent} key={key}>
        <div className={Styles.divWidth}>
          <h3 className={Styles.specTitle}>{key}</h3>
        </div>
        <div>
          <ul>
            {Array.isArray(value) ? (
              value.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>{value}</li>
            )}
          </ul>
        </div>
      </div>
    ));
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.container__content}>
        <div className={Styles.boxInfo}>
          {phone ? (
            <>
              <div className={Styles.name}>
                <h2>{render(phone?.name)}</h2>
              </div>

              <div className={Styles.specifications}>
                <h3 className={Styles.specHeader}>Main Characteristics</h3>
                {[
                  {
                    title: 'Communication standard',
                    value: phone?.standardInternet['Communication standard/Internet'],
                  },
                  { title: 'Display', value: phone?.Display },
                  { title: 'SIM Cards', value: phone?.SimCards },
                  { title: 'Memory Functions', value: phone?.MemoryFunctions },
                  { title: 'Operating System', value: phone?.OperatingSystem },
                  { title: 'Processor', value: phone?.Processor },
                  { title: 'Main Camera', value: phone?.MainCamera },
                  { title: 'Materials', value: phone?.Materials },
                  { title: 'Dimensions', value: phone?.Dimensions },
                  { title: 'Wireless Technologies', value: phone?.WirelessTechnologies },
                ].map(({ title, value }, index) => (
                  <div className={Styles.specifications__boxes} key={index}>
                    <h1>{title}</h1>
                    {render(value)}
                  </div>
                ))}
              </div>
            </>
          ) : null}{' '}
          {laptop ? (
            <>
              <div className={Styles.name}>
                <h2>{render(laptop?.name)}</h2>
              </div>

              <div className={Styles.specifications}>
                <h3 className={Styles.specHeader}>Main Characteristics</h3>
                {[
                  {
                    title: 'Screen',
                    value: laptop?.Screen,
                  },
                  { title: 'Processor', value: laptop?.Processor },
                  { title: 'Data storage devices', value: laptop?.MemoryFunctions },
                  { title: 'Video card', value: laptop?.VideoCard },
                  { title: 'Corps', value: laptop?.Corps },
                  { title: 'Connection', value: laptop?.Connectors },
                  { title: 'Battery', value: laptop?.BatteryLife },
                  { title: 'Dimensions', value: laptop?.Dimensions },
                  { title: 'Navigation', value: laptop?.Navigation },
                  { title: 'Wireless Technologies', value: laptop?.WirelessTechnologies },
                  { title: 'Sound System', value: laptop?.SoundSystem },
                  { title: 'Features', value: laptop?.Features },
                  { title: 'DeliverySet', value: laptop?.DeliverySet },
                  { title: 'Origin', value: laptop?.Origin },
                  { title: 'Guarantee', value: laptop?.Guarantee },
                ].map(({ title, value }, index) => (
                  <div className={Styles.specifications__boxes} key={index}>
                    <h1>{title}</h1>
                    {render(value)}
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {Tvs ? (
            <>
              <div className={Styles.name}>
                <h2>{render(Tvs?.name)}</h2>
              </div>

              <div className={Styles.specifications}>
                <h3 className={Styles.specHeader}>Main Characteristics</h3>
                {[
                  {
                    title: 'Screen Diagonal',
                    value: Tvs?.ScreenDiagonal,
                  },
                  { title: 'SmartTV', value: Tvs?.SmartTV },
                  { title: 'Display Technology', value: Tvs?.DisplayTechnology },
                  { title: 'UpdateFrequency', value: Tvs?.UpdateFrequency },
                  { title: 'Resolution', value: Tvs?.Resolution },
                  { title: 'Model Year', value: Tvs?.ModelYear },
                  { title: 'Matrix Type', value: Tvs?.MatrixType },
                  { title: 'Country Registration', value: Tvs?.CountryRegistration },
                  { title: 'BatteryLife', value: Tvs?.BatteryLife },
                  { title: 'Interfaces', value: Tvs?.Interfaces },
                  { title: 'Features', value: Tvs?.Features },
                  { title: 'Delivery Set', value: Tvs?.DeliverySet },
                  { title: 'Origin', value: Tvs?.Origin },
                  { title: 'Guarantee', value: Tvs?.Guarantee },
                ].map(({ title, value }, index) => (
                  <div className={Styles.specifications__boxes} key={index}>
                    <h1>{title}</h1>
                    {render(value)}
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {Earphones ? (
            <>
              <div className={Styles.name}>
                <h2>{render(Earphones?.name)}</h2>
              </div>

              <div className={Styles.specifications}>
                <h3 className={Styles.specHeader}>Main Characteristics</h3>
                {[
                  {
                    title: 'Headphone Type',
                    value: Earphones?.HeadphoneType,
                  },
                  { title: 'Features', value: Earphones?.Features },
                  { title: 'Connection Type', value: Earphones?.ConnectionType },
                  { title: 'Connection Interface', value: Earphones?.ConnectionInterface },
                  { title: 'Charging Interface', value: Earphones?.ChargingInterface },
                  { title: 'Additional Features', value: Earphones?.AdditionalFeatures },
                  { title: 'Country Registration', value: Earphones?.CountryRegistration },
                  { title: 'Guarantee', value: Earphones?.Guarantee },
                ].map(({ title, value }, index) => (
                  <div className={Styles.specifications__boxes} key={index}>
                    <h1>{title}</h1>
                    {render(value)}
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {KeyBoard ? (
            <>
              <div className={Styles.name}>
                <h2>{render(KeyBoard?.name)}</h2>
              </div>

              <div className={Styles.specifications}>
                <h3 className={Styles.specHeader}>Main Characteristics</h3>
                {[
                  {
                    title: 'Keyboard Type',
                    value: KeyBoard?.KeyboardType,
                  },
                  { title: 'Connection', value: KeyBoard?.Connection },
                  { title: 'Country Origin', value: KeyBoard?.CountryOrigin },
                  { title: 'Layout', value: KeyBoard?.Layout },
                  { title: 'Weight', value: KeyBoard?.Weight },
                  { title: 'Additional Features', value: KeyBoard?.AdditionalFeatures },
                  { title: 'Interface', value: KeyBoard?.Interface },
                  { title: 'Dimensions', value: KeyBoard?.Dimensions },
                  { title: 'Guarantee', value: KeyBoard?.Guarantee },
                ].map(({ title, value }, index) => (
                  <div className={Styles.specifications__boxes} key={index}>
                    <h1>{title}</h1>
                    {render(value)}
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {Mouse ? (
            <>
              <div className={Styles.name}>
                <h2>{render(Mouse?.name)}</h2>
              </div>

              <div className={Styles.specifications}>
                <h3 className={Styles.specHeader}>Main Characteristics</h3>
                {[
                  {
                    title: 'Connection',
                    value: Mouse?.Connection,
                  },
                  { title: 'Interface', value: Mouse?.Interface },
                  { title: 'Features', value: Mouse?.Features },
                  { title: 'Type', value: Mouse?.Type },
                  { title: 'Sensor Type', value: Mouse?.SensorType },
                  { title: 'Guarantee', value: Mouse?.Guarantee },
                ].map(({ title, value }, index) => (
                  <div className={Styles.specifications__boxes} key={index}>
                    <h1>{title}</h1>
                    {render(value)}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className={Styles.Sticky}>
          <div className={Styles.Sticky__content}>
            <div className={Styles.logo}>
              <img src={Items?.[0].color?.[activeColor]?.images?.[0]} alt="" />
              <div className={Styles.logo__text}>
                <p>
                  {Items?.[0]?.product.name} &nbsp;
                  {Items?.[0]?.variation?.[activeVar]} {Items?.[0]?.color?.[activeColor]?.nameColor}
                </p>
              </div>
            </div>
          </div>{' '}
          <div className={Styles.button}>
            <div className={Styles.Price}>
              <span>In Stock</span>
              <p>{Items?.[0]?.price[activeVar]} $</p>
            </div>
            <Link href={`/Product/${Items?.[0]?.id}`}>
              <button>
                <ShoppingCart size={20} /> Buy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
