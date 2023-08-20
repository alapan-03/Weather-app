export default function Search(props) {
    return(
        <>
        <form class="d-flex w-50 mt-4 text-center container" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
        </>
    )
}