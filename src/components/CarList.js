import { useSelector, useDispatch } from 'react-redux';
import { removeCar } from '../store';
import { createSelector } from 'reselect';

function CarList() {
  const dispatch = useDispatch();

  const memoizedCars = createSelector(
    (state) => state.cars.data,
    (state) => state.cars.searchTerm,
    (cars, searchTerm) => {
      return cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  const cars = useSelector(memoizedCars);

  const handleCarDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  const renderedCars = cars.map((car) => {
    return (
      <div key={car.id} className="panel">
        <p>
          {car.name} - £{car.cost}
        </p>
        <button
          className="button is-danger"
          onClick={() => handleCarDelete(car)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

export default CarList;
