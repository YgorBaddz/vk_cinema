interface RatingFilterProps {
  selectedRating: string;
  setSelectedRating: (value: string) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  selectedRating,
  setSelectedRating,
}) => {
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(e.target.value);
  };

  return (
    <div className="w-full max-w-md ">
      <input
        type="text"
        placeholder="Filter by rating"
        value={selectedRating}
        onChange={handleRatingChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default RatingFilter;
