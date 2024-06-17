interface SearchFilterProps {
  searchString: string;
  setSearchString: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchString,
  setSearchString,
}) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="w-full max-w-md mb-8">
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchString}
        onChange={handleSearchInput}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchFilter;
