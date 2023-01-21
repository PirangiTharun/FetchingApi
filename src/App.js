import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [numberOfRecords, setNumberOfRecords] = useState(0);
  const [selectApi, setSelectApi] = useState('');
  useEffect(() => {
    if (selectApi === 'fetch' && numberOfRecords > 0) {
      fetch(`https://randomuser.me/api/?results=${numberOfRecords}`)
        .then(response => response.json())
        .then(data => setData(data));
    }

    else if (selectApi === 'axios' && numberOfRecords > 0) {
      axios.get(`https://randomuser.me/api/?results=${numberOfRecords}`)
      .then(response => setData(response.data));
    }
  }, [numberOfRecords, selectApi]);
  let temp = 0;
  const handleSelect = (e) => {
    if (e.target.value === 'select') {
      temp = 0;
      return;
    }
    temp = e.target.value;
  }
  let temp1 = '';
  const handleApi = (e) => {
    temp1 = e.target.value;
  }
  const handleSubmit = () => {
    setNumberOfRecords(temp);
    setSelectApi(temp1);
  }
  return (
    <>
      <div className='header'>
        <label >Select number of records you want to fetch: </label>
        <select name='records' onChange={handleSelect}>
          <option value={'select'} defaultValue>Select</option>
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <label> using </label>
        <select onChange={handleApi}>
          <option value={'select'} defaultValue>Select</option>
          <option value={'fetch'}>Fetch</option>
          <option value={'axios'}>Axios</option>
        </select>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {data?.results?.map((item, index) => (
          <div className='outBox' key={index}>
            <img className='personImage' src={item.picture.large} alt={item.name.first} />
            <div>
              <h2>Name : {item.name.title} {item.name.first} {item.name.last}</h2>
              <h3>Gender : {item.gender}</h3>
              <h3>Phone : {item.phone}</h3>
              <h3>Age : {item.dob.age}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
