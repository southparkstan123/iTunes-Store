import {
  TransitionGroup,
} from 'react-transition-group';

import './index.css'
import LazyloadImage from '@/components/LazyloadImage';
import { FreeAppsResponse } from '@/types';

import { useIntl } from 'react-intl';

type RecommendedAppsProps = {
  list: FreeAppsResponse[]
}

const RecommendedApps = (props: RecommendedAppsProps) => {
  const { list } = props;
  const intl = useIntl();

  const Item = (props: {item: FreeAppsResponse}) => {
    const { item } = props;
    return (
      <div className="w-32 items-center">
        <div className="px-2">
          <LazyloadImage className={"rounded-lg w-24 h-24"} altText={item.name} src={item.image[2]}/>
          <h3 className="text-sm">{item.name}</h3>
          <h4 className="text-sm text-gray-500">{item.category}</h4>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="h-48">
        { 
          (list && list.length > 0) ? 
          <TransitionGroup className="inline-flex">
            {
              list.map((i, index: number) => {
                return(
                  <Item key={index} item={i}/>
                )
              }) 
            }
          </TransitionGroup> : 
          <div className="flex justify-center h-48">
            <div className="flex items-center">
              <h1 className="text-center text-2xl text-primary">
                {intl.messages['recommendedApps.nodata'] as string}
              </h1>
            </div>
          </div>
        }
      </div>
    </>

  )
}

export default RecommendedApps;