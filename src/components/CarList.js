import { useSelector, useDispatch } from 'react-redux';
import { removeCar } from '../store';
import { createSelector } from 'reselect';

function CarList() {
  const dispatch = useDispatch();

  const memoizedCars = createSelector(
    (state) => state.cars.data,
    (state) => state.cars.searchTerm,
    (state) => state.form.name,

    (cars, searchTerm) => {
      const filteredCars = cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredCars;
    }
  );

  const cars = useSelector(memoizedCars);
  const { name } = useSelector((state) => state.form);

  const handleCarDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  const renderedCars = cars.map((car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
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
