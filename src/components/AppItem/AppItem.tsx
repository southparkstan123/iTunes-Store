import type { AppItemProps } from '@/types';
import LazyloadImage from '@/components/LazyloadImage';
import Rating from '@/components/Rating';
import './index.css'

const AppItem = (props: AppItemProps) => {
  const { item, order } = props;

  return (
    <div className="grid grid-cols-1 p-2 justify-center items-center border-x-transparent border-b">
      <div data-order={order} className="items flex items-center p-1">
        <LazyloadImage className={(order % 2 === 1) ? "rounded-sm px-1 w-24 h-24" : "rounded-full px-1 w-24 h-24"} altText={item.name} src={item.image.lg}/>
        <div className="ml-3">
          <span>{item.name}</span>
          <p>{item.category}</p>
          <Rating key={order} score={item.averageUserRating}/>
          <span className="italic text-sm">{item.userRatingCount}</span>
        </div>
      </div>
    </div>
  )
}

export default AppItem