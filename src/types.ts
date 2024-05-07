export type AppItemObj = {
  id: string,
  name: string,
  category: string,
  image: {
    sm: string,
    lg: string,
  },
  summary: string,
  artistName: string,
  averageUserRating: number,
  userRatingCount: number
};

export type FreeAppID = {
  id: string,
  name: string,
  category: string,
  author: string,
  summary: string
}

export type SearchBarProps = {
  onChange: (keyword: string) => void,
  duration: number
}

export type AppLink = {
  attributes: {
    rel?: string,
    type?: string,
    href?: string
  }
}

export type FreeAppEntry = {
  "im:name": {
    label: string
  },
  "summary": {
    label: string
  },
  "im:image": Array<{
    label: string,
    attributes: {
      height: string
    }
  }>,
  "im:price": {
    label: string,
    attributes: {
      amount: string,
      currency: string
    }
  },
  "im:contentType": {
    label: string,
    attributes: {
      term: string,
      label: string
    }
  },
  "rights": {
    label: string
  },
  "title": {
    label: string
  },
  "link": AppLink,
  "id": {
    label: string,
    attributes: {
      "im:id": string,
      "im:bundledId": string
    }
  },
  "im:artist": {
    label: string,
    attributes: {
      href: string
    }
  },
  "category": {
    "attributes": {
      "im:id": string,
      term: string,
      schedule: string,
      label: string
    }
  },
  "im:releaseDate": {
    label: string,
    attributes: {
      label: string
    }
  }
}

export type FreeAppsResponse = {
  name: string; 
  category: string; 
  image: string[];
}

export type AppItemProps = {
  item: AppItemObj; 
  order: number;
}

export type RatingProps = {
  score: number;
}

export type LazyloadImageProps = {
  src: string;
  altText: string; 
  className: string;
}

export type AppListProps = {
  list: AppItemObj[]
}
export type Lang = 'en' | 'ja-JP' | 'zh' ;
export type Locale = 'us' | 'jp' | 'hk' ;
