const Filter = ({filterName, handleFilterChange}) =>{
    return(
      <div>
        filter: <input value={filterName} onChange={handleFilterChange} />
      </div>
      )
  }

export default Filter