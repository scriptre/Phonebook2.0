const Persons =({name, number, handleDelete}) =>{

    return(
      <div>
        <li>
          {name} {number} {<button onClick={handleDelete}>delete</button>}
        </li>
      </div>
    )
  }

export default Persons