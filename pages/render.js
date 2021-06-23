export default function RenderResults(locationSearch, guestsSearch) {
  const resultsArr = stays.filter((prop) => {
    return (
      prop.city == locationSearch.split(", ")[0] &&
      prop.maxGuests >= guestsSearch
    );
  });
  console.log(resultsArr);
  return resultsArr;
}
