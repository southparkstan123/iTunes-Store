import debounce from "lodash/debounce";
import type { SearchBarProps } from "@/types"
import { useIntl } from 'react-intl';

const SearchBar = (props: SearchBarProps) => {

  const { onChange, duration } = props;

  const intl = useIntl();

  const onChangeKeyword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value.trim())
  }

  const debouncedOnChange = debounce(onChangeKeyword, duration);

  return (
    <label className="relative block w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
        </svg>
      </span>
      <input 
        className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm" 
        placeholder={intl.messages['searchbar.search'] as string}
        type="text" 
        name="search"
        onChange={debouncedOnChange}
      />
    </label>
  )
}

export default SearchBar