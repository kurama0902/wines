import './searchField.css';

export const SearchField = ({placehoder}) => {
  return (
    <div className="search-wrap">
      <div className="input-wrap">
        <label htmlFor="search">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19L14.65 14.65M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#ABADB3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </label>
        <input id='search' type="text" placeholder={placehoder} />
      </div>
      <button className='photo-scan'>
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1667 14.8333C20.1667 15.7538 19.4205 16.5 18.5 16.5H3.50001C2.57954 16.5 1.83334 15.7538 1.83334 14.8333V5.66667C1.83334 4.74619 2.57954 4 3.50001 4H6.83334L8.50001 1.5H13.5L15.1667 4H18.5C19.4205 4 20.1667 4.74619 20.1667 5.66667V14.8333Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11 13.1667C12.841 13.1667 14.3333 11.6743 14.3333 9.83333C14.3333 7.99238 12.841 6.5 11 6.5C9.15906 6.5 7.66668 7.99238 7.66668 9.83333C7.66668 11.6743 9.15906 13.1667 11 13.1667Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </div>
  )
}