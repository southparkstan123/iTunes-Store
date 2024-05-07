import { useEffect } from 'react';
import type { MutableRefObject, ReactNode } from 'react';

type ObserverObjectProps = {
  content: ReactNode;
  callback: () => void;
  observerTarget: MutableRefObject<null>;
}

const ObserverObject = (props: ObserverObjectProps) => {
  const { observerTarget, callback, content } = props;

  useEffect(() => {
    let observerRefValue: Element;

    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting === true){
        callback();
      }
    }, {
      threshold: 1.0,
      rootMargin: "50px",
      root: null
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if(observerRefValue){
        observer.unobserve(observerRefValue);
      }
    }
  }, [observerTarget, callback]);

  return (
    <div ref={observerTarget}>
      <div className="text-center animate-pulse">
        { content }
      </div>
    </div> 
  )
}

export default ObserverObject