import { useState } from "react"
import { Link } from "react-router-dom"
import { SiSpacex } from "react-icons/si"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="absolute flex items-center justify-between px-5 w-full ">
        <div>
          <Link to="/">
            <SiSpacex className="text-8xl text-yellow-900" />
          </Link>
        </div>

        <nav className={`${isOpen ? "open" : ""}`}>
          <ul>
            <li className="pb-2">
              <Link to="/" className="text-white hover:bg-amber-900 text-m border-2 rounded p-2 bg-amber-800 border-amber-900">
                Landing Page
              </Link>
            </li>
            <li className="pb-2">
              <Link to="/capsules" className="text-white hover:bg-amber-900 text-m border-2 rounded p-2 bg-amber-800 border-amber-900">
                Capsules
              </Link>
            </li>
            <li className="pb-2">
              <Link to="/rockets" className="text-white hover:bg-amber-900 text-m border-2 rounded p-2 bg-amber-800 border-amber-900">
                Rockets
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-sm uppercase tracking-wider"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
    </>
  )
}
