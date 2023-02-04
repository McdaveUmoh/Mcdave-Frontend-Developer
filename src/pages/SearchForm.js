import { useState, useEffect } from "react";
import { Loading } from "../components";



function SearchForm() {
  const [capsules, setCapsules] = useState([])

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("");
  const [serial, setSerial] = useState("");
  const [paginate, setpaginate] = useState(4);


  useEffect(() => {
    const fetchCapsules = async () => {
      const res = await fetch("https://api.spacexdata.com/v4/capsules")
      const data = await res.json()
      setCapsules(data)
    }

    fetchCapsules()
  }, [])
  
  const data = Object.values(capsules);

  const search_parameters = Object.keys(Object.assign({}, ...data)) || [106,201];;
  const filter_items = [...new Set(data.map((item) => item.type))];
  const filter_items1 = [...new Set(data.map((item) => item.status))];
  const filter_items2 = [...new Set(data.map((item) => item.serial))];


  function search(capsules) {
    
    return capsules.filter((item) =>
       item.type.includes(filter) && item.serial.includes(serial) && item.status.includes(status) && search_parameters.some((parameter) =>
          item[parameter] && item[parameter].toString().toLowerCase().includes(query)
        )
    );
  }
  
  const load_more = (event) => {
    setpaginate((prevValue) => prevValue + 4);
  };

  return (
    <>
      {!capsules ? (
        <Loading />
      ) : (
          <section className="py-32">
              <h1 className="heading text-center capitalize">
                Search Form
              </h1>
              <div className="response max-width grid grid-cols-4  gap-1 md:grid-cols-2 lg:grid-cols-5 px-5 p-5 ">
                <div className=" p-5 col-span-2 ">
                  <label htmlFor="search-form">
                    <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="outline-none pl-4 w-96 rounded-lg h-10 border-2 border-rose-600 shadow-2xl"
                      placeholder="Search"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </label>
                </div>
                <div className="p-5">
                  <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="outline-none pl-2 rounded-lg w-36 h-10 bg-indigo-500 hover:bg-indigo-600 "
                    aria-label="Filter By Type">
                    <option value="" >Dragon</option>
                    {filter_items.map((item) => (
                    <option value={item}> {item}</option>
                    ))}
                  </select>
                </div>
                <div className="p-5">
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="outline-none pl-2 rounded-lg w-36 h-10 bg-indigo-500 hover:bg-indigo-600 "
                    aria-label="Filter By Status">
                    <option value="">Status</option>
                    {filter_items1.map((item) => (
                    <option value={item}> {item}</option>
                    ))}
                  </select>
                </div>
                <div className="p-5">
                  <select
                    onChange={(e) => setSerial(e.target.value)}
                    className="outline-none pl-2 rounded-lg w-36 h-10 bg-indigo-500 hover:bg-indigo-600 "
                    aria-label="Filter By Serial Number">
                    <option value="">Serial Number</option>
                    {filter_items2.map((item) => (
                    <option value={item}> {item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
                  {search(data).slice(0, paginate).map((
                    {
                      id,
                      type,
                      status,
                      serial,
                      launches,
                      last_update,
                      land_landings,
                      water_landings,
                      reuse_count,
                    }
                  ) => (
                    <article key={id} className="articles">
                    <h2 className="text-xl font-bold mb-5">
                      {type},{" "}
                      <span className="text-base opacity-75 font-light">
                        {serial}
                      </span>
                    </h2>
                    <ul>
                      <li className="mb-1">{launches.length} launches</li>
                      <li className="mb-1">{land_landings} land landings</li>
                      <li className="mb-1">{water_landings} water landings</li>
                      <li className="mb-1">Reused {reuse_count} times</li>
                      {status === "active" ? (
                        <li className="text-emerald-500">Active</li>
                      ) : (
                        <li className="text-rose-500">Retired</li>
                      )}
                    </ul>

                    <p className="mt-5 opacity-75">{last_update}</p>
                  </article>
                  ))}
                  
              </div>
              <div className="flex justify-center py-8">
                {paginate < data.length ? <button onClick={load_more} className="btn animate-bounce content-center">Load More</button> : <p className="text-2xl font-bold "> No more data to load</p>}
              </div>
          </section>
          )}
    </>
  )
 }

export default SearchForm;