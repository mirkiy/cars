import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

function CarValue() {
  const memoizedCars = createSelector(
    (state) => state.cars.data,
    (state) => state.cars.searchTerm,
    (cars, searchTerm) => {
      const filteredCars = cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      let cost = 0;
      for (let car of filteredCars) {
        cost += car.cost;
      }
      return cost;
    }
  );

  const totalCost = useSelector(memoizedCars);

  return <div className="car-value">Total Cost: £{totalCost}</div>;
}

export default CarValue;
