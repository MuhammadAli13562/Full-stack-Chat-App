const SizeStickers = () => {
  return (
    <div className="text-white">
      <span className="hidden 3xl:flex">3xl</span>
      <span className="hidden 2xl:flex">2xl</span>
      <span className="hidden xl:flex 2xl:hidden">xl</span>
      <span className="hidden lg:flex xl:hidden">lg</span>
      <span className="hidden md:flex lg:hidden">md</span>
      <span className="hidden sm:flex md:hidden">sm</span>
    </div>
  )
}

export default SizeStickers
