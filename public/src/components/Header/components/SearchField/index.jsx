import { CameraSVG } from "../../../../shared/SVG/CameraSVG";
import { SearchSVG } from "../../../../shared/SVG/SearchSVG";

import './searchField.css';

export const SearchField = ({placehoder}) => {
  return (
    <div className="search-wrap">
      <div className="input-wrap">
        <label htmlFor="search">
          <SearchSVG/>
        </label>
        <input id='search' type="text" placeholder={placehoder} />
      </div>
      <button className='photo-scan'>
        <CameraSVG/>
      </button>
    </div>
  )
}