import React, {useState} from "react"
export default function Navbar(props) {

    const [state, setState] = useState("")

    function capitalize(word){
      let a = word.slice(0, 1);
      let b = word.slice(1);
      return a.toUpperCase()+b
    }

    function add(e){
        e.preventDefault()
        // console.log(state)
      
        props.handler(capitalize(state))
    }


    return(
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{display:"flex", alignItems:"space-between"}}>
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active ms-5" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="#">Link</a>
        </li>

    <a class="navbar-brand position-relative start-100" style={{transform:"translate(11rem, 0)"}} href="#">Weather-Bird</a>  
      </ul>
      <form class="d-flex" role="search" onSubmit={add}> 
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={state} onChange={e=> setState(e.target.value)}/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </>
    )
}