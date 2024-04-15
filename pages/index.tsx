/*import {GetServerSideProps, NextPage} from "next";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";

type Props = {
  initialImageUrl: string;
}

const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
  console.log(initialImageUrl);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(true);
  //useEffect(() => {
  //  fetchImage().then((newImage) => {
  //    setImageUrl(newImage.url);
  //    setLoading(false);
  //  });
  //}, []);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
    );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  if(!Array.isArray(images)){
    throw new Error("猫の画像が所得できませんでした")
  }
  const image: unknown = images[0];
  if(!isImage(image)){
    throw new Error("猫の画像が取得できませんでした");
  }
  return image;
};

const isImage = (value: unknown): value is Image =>{
  if(!value || typeof value !== "object"){
    return false;
  }
  return "url" in value && typeof value.url === "string";
}
*/
//fetchImage();


import {GetServerSideProps, NextPage} from "next";
import {useState, useEffect} from "react";
import styles from "./index.module.css";

//Props型がstring型のinitialImgaeUrlプロパティを持つことを明文化
type Props = {
  initialImageUrl: string;
}

//Image型がstring型のurlプロパティを持つことを明文化
type Image = {
  url: string;
}

//fetchImageコンポーネントを非同期処理で定義
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  if(!Array.isArray(images)){
    //error case1
    throw new Error("error case1: typeof images is not Array.");
  }
  const image: unknown = images[0];
  if(!isImage(image)){
    //error case2
    throw new Error("error case2: typeof image is not Image.");
  }
  return image
};


//引数がImage型か判別する関数を定義
const isImage = (value: unknown): value is Image =>{
  if(!value || typeof value !== "object"){
    return false;
  }
  return "url" in value && typeof value.url === "string";
}

//画像の表示を行うコンポーネントを定義
const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
  const [imageUrl, setImageUrl] = useState("initialImageUrl");
  const [loading, setLoading] = useState(true);
  const handleClick = async() =>{
    setLoading(true);
    const image = await fetchImage();
    setImageUrl(image.url);
    setLoading(false);
  }
  return (
    <div>
      <button onClick={handleClick} className={styles.button}>one more cat!</button>
      <div className = {styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
        </div>
    </div>
  );
};

//ページが読み込まれると同時にProps型のinitialImageUrlプロパティを定義しておく。
export const getServerSideProps: GetServerSideProps<Props> = async() =>{
  const img = await fetchImage();
  return {
    props: {
      initialImageUrl: img.url,
    },
  };
}

export default IndexPage;
