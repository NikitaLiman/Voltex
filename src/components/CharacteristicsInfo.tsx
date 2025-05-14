"use client";

import React from "react";
import Styles from "../sass/CharacteristicsInfo.module.scss";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";

interface CharacteristicsArray {
  Items: any[];
}

export const CharacteristicsInfo: React.FC<CharacteristicsArray> = ({
  Items,
}) => {
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
                    title: "Communication standard",
                    value:
                      phone?.standardInternet[
                        "Communication standard/Internet"
                      ],
                  },
                  { title: "Display", value: phone?.Display },
                  { title: "SIM Cards", value: phone?.SimCards },
                  { title: "Memory Functions", value: phone?.MemoryFunctions },
                  { title: "Operating System", value: phone?.OperatingSystem },
                  { title: "Processor", value: phone?.Processor },
                  { title: "Main Camera", value: phone?.MainCamera },
                  { title: "Materials", value: phone?.Materials },
                  { title: "Dimensions", value: phone?.Dimensions },
                  {
                    title: "Wireless Technologies",
                    value: phone?.WirelessTechnologies,
                  },
                ].map(({ title, value }, index) => (
                  <div className={Styles.specifications__boxes} key={index}>
                    <h1>{title}</h1>
                    {render(value)}
                  </div>
                ))}
              </div>
            </>
          ) : null}{" "}
          {laptop ? (
            <>
              <div className={Styles.name}>
                <h2>{render(laptop?.name)}</h2>
              </div>

              <div className={Styles.specifications}>
                <h3 className={Styles.specHeader}>Main Characteristics</h3>
                {[
                  {
                    title: "Screen",
                    value: laptop?.Screen,
                  },
                  { title: "Processor", value: laptop?.Processor },
                  {
                    title: "Data storage devices",
                    value: laptop?.MemoryFunctions,
                  },
                  { title: "Video card", value: laptop?.VideoCard },
                  { title: "Corps", value: laptop?.Corps },
                  { title: "Connection", value: laptop?.Connectors },
                  { title: "Battery", value: laptop?.BatteryLife },
                  { title: "Dimensions", value: laptop?.Dimensions },
                  { title: "Navigation", value: laptop?.Navigation },
                  {
                    title: "Wireless Technologies",
                    value: laptop?.WirelessTechnologies,
                  },
                  { title: "Sound System", value: laptop?.SoundSystem },
                  { title: "Features", value: laptop?.Features },
                  { title: "DeliverySet", value: laptop?.DeliverySet },
                  { title: "Origin", value: laptop?.Origin },
                  { title: "Guarantee", value: laptop?.Guarantee },
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
                    title: "Screen Diagonal",
                    value: Tvs?.ScreenDiagonal,
                  },
                  { title: "SmartTV", value: Tvs?.SmartTV },
                  {
                    title: "Display Technology",
                    value: Tvs?.DisplayTechnology,
                  },
                  { title: "UpdateFrequency", value: Tvs?.UpdateFrequency },
                  { title: "Resolution", value: Tvs?.Resolution },
                  { title: "Model Year", value: Tvs?.ModelYear },
                  { title: "Matrix Type", value: Tvs?.MatrixType },
                  {
                    title: "Country Registration",
                    value: Tvs?.CountryRegistration,
                  },
                  { title: "BatteryLife", value: Tvs?.BatteryLife },
                  { title: "Interfaces", value: Tvs?.Interfaces },
                  { title: "Features", value: Tvs?.Features },
                  { title: "Delivery Set", value: Tvs?.DeliverySet },
                  { title: "Origin", value: Tvs?.Origin },
                  { title: "Guarantee", value: Tvs?.Guarantee },
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
                    title: "Headphone Type",
                    value: Earphones?.HeadphoneType,
                  },
                  { title: "Features", value: Earphones?.Features },
                  {
                    title: "Connection Type",
                    value: Earphones?.ConnectionType,
                  },
                  {
                    title: "Connection Interface",
                    value: Earphones?.ConnectionInterface,
                  },
                  {
                    title: "Charging Interface",
                    value: Earphones?.ChargingInterface,
                  },
                  {
                    title: "Additional Features",
                    value: Earphones?.AdditionalFeatures,
                  },
                  {
                    title: "Country Registration",
                    value: Earphones?.CountryRegistration,
                  },
                  { title: "Guarantee", value: Earphones?.Guarantee },
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
                    title: "Keyboard Type",
                    value: KeyBoard?.KeyboardType,
                  },
                  { title: "Connection", value: KeyBoard?.Connection },
                  { title: "Country Origin", value: KeyBoard?.CountryOrigin },
                  { title: "Layout", value: KeyBoard?.Layout },
                  { title: "Weight", value: KeyBoard?.Weight },
                  {
                    title: "Additional Features",
                    value: KeyBoard?.AdditionalFeatures,
                  },
                  { title: "Interface", value: KeyBoard?.Interface },
                  { title: "Dimensions", value: KeyBoard?.Dimensions },
                  { title: "Guarantee", value: KeyBoard?.Guarantee },
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
                    title: "Connection",
                    value: Mouse?.Connection,
                  },
                  { title: "Interface", value: Mouse?.Interface },
                  { title: "Features", value: Mouse?.Features },
                  { title: "Type", value: Mouse?.Type },
                  { title: "Sensor Type", value: Mouse?.SensorType },
                  { title: "Guarantee", value: Mouse?.Guarantee },
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
                  {Items?.[0]?.variation?.[activeVar]}{" "}
                  {Items?.[0]?.color?.[activeColor]?.nameColor}
                </p>
              </div>
            </div>
          </div>{" "}
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
