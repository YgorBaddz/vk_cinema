interface YearFilterProps {
  selectedYear: string;
  setSelectedYear: (value: string) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({
  selectedYear,
  setSelectedYear,
}) => {
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Filter by year"
        value={selectedYear}
        onChange={handleYearChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default YearFilter;
