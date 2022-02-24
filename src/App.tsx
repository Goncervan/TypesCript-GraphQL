import './App.css';
import { useLazyQuery } from '@apollo/client';
import { characters } from './Interface'
import { handlePage } from './Queries'
import { useEffect, useState } from 'react';


function LazyQuerie(): JSX.Element {
  const [page, setPage] = useState(1)
  const [getAllCharacters, { loading, error, data, fetchMore }] = useLazyQuery<characters>(handlePage, { variables: { pageNumber: page } })

  console.log(data)

  useEffect(() => {
    getAllCharacters();
  }, [])

  if (error) return (
    <>
      <span>{error}</span>
      <button onClick={() => getAllCharacters()}></button>
    </>
  )

  if (!data) return (
    <div className="App">
      <div className="wavy">
        <span className="span">C</span>
        <span className="span">a</span>
        <span className="span">r</span>
        <span className="span">g</span>
        <span className="span">a</span>
        <span className="span">n</span>
        <span className="span">d</span>
        <span className="span">o</span>
        <span className="span">.</span>
        <span className="span">.</span>
        <span className="span">.</span>
      </div>
    </div>
  )
  console.log(page)
  return (
    <div className="App">
      {loading
        ? (<div className="App">
          <div className="wavy">
            <span className="span">C</span>
            <span className="span">a</span>
            <span className="span">r</span>
            <span className="span">g</span>
            <span className="span">a</span>
            <span className="span">n</span>
            <span className="span">d</span>
            <span className="span">o</span>
            <span className="span">.</span>
            <span className="span">.</span>
            <span className="span">.</span>
          </div>
        </div>
        ) : (
          <div className="principal">

            <header className="title-container">
              <h2 className="title">Rick And Morty</h2>
              <h3 className="subTitle">Created using GraphQl and TypeScript</h3>
            </header>
            <div className="characters-container">
              {data && data?.characters?.results?.map(el => (
                <div className="card" key={el.id}>
                  <div className="card-left">
                    <img className="img" src={el.image} alt="image" />
                  </div>
                  <div className="card-right">
                    <span className="name">{el.name}</span>
                    <span className="status">Status: {el.status}</span>
                    <span className="gender">Gender: {el.gender}</span>
                  </div>
                </div>
              ))}
            </div>
            <footer className="pagination-container">
              {page === 1 ? (
                <>
                  <button className="BtnPage" onClick={() => {
                    setPage(page + 1)
                    fetchMore({
                      variables: { pageNumber: page }
                    })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}>Next Page</button>
                </>
              ) : data?.info?.pages === page ? (
                <>
                  <button className="BtnPage" onClick={() => {
                    setPage(page - 1)
                    fetchMore({
                      variables: { pageNumber: page }
                    })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}>Previous Page</button>
                </>
              ) : (
                <>
                  <button className="BtnPage" onClick={() => {
                    setPage(page - 1)
                    fetchMore({
                      variables: { pageNumber: page }
                    })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}>Previous Page</button>
                  <button className="BtnPage" onClick={() => {
                    setPage(page + 1)
                    fetchMore({
                      variables: { pageNumber: page }
                    })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}>Next Page</button>
                </>
              )}
            </footer>
          </div>
        )}
    </div>
  )
}







export default LazyQuerie;
