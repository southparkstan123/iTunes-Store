import AppItem from "@/components/AppItem/AppItem";

import './index.css'
import type { AppListProps } from "@/types";

const AppList = (props: AppListProps) => {
  const { list } = props;

  return (
    <>
      <div className="items-center">
        { 
          (list && list.length > 0) ? 
            list.map((i, index) => {
              return(
                <AppItem key={index} item={i} order={index + 1} />
              )
            })
          : null
          }
      </div>
    </>
  )
}

export default AppList