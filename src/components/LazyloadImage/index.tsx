import './index.css'

import { useEffect, useRef } from "react";
import loadingImg from '@/assets/loading.png'

import type { LazyloadImageProps } from "@/types";

const LazyloadImage = (props: LazyloadImageProps) => {
  const { src, altText, className } = props;
  const imgRef = useRef(null);

  useEffect(() => {
    let observerRefValue: Element;

    const observer = new IntersectionObserver(([entry]) => {
      const loadImage = () => {
        observerRefValue.addEventListener('load', () => {
          setTimeout(() => {
            observerRefValue.classList.add('loaded')
          }, 0)
        })
        observerRefValue.addEventListener('error', (event) => {
          event.stopPropagation()
        })
        const dataURL: string | null = observerRefValue.getAttribute('data-url')
        if (dataURL) {
          observerRefValue.setAttribute('src', dataURL)
        }
      }
      if (entry.isIntersecting === true) {
        loadImage()
        observer.unobserve(observerRefValue)
      }
    },{
      root: null,
      threshold: 1.0
    })

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRefValue = imgRef.current;
    }

    return () => {
      if(observerRefValue){
        observer.unobserve(observerRefValue);
      }
    }
  }, [])
  return (
    <>
      <img className={className} ref={imgRef} src={loadingImg} alt={altText} data-url={src}/>
    </>
  )
}

export default LazyloadImage;