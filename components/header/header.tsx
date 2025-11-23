import Logo from "./logo"
import SearchBar from "./search-bar"
import ActionButtons from "./action-buttons"
import Navigation from "./navigation"

export default function Header() {
  return (
    <header className="w-full bg-background shadow-sm">
      {/* Top header section */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <SearchBar />
          <ActionButtons />
        </div>
      </div>

      {/* Navigation bar */}
      <Navigation />
    </header>
  )
}
