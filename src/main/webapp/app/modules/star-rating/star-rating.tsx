import './star-rating.scss'
import React, {useState} from 'react';

function Rating({count, value, inactiveColor='#ddd', size=24, activeColor='#f00', onChange}) {

  // short trick
  const stars = Array.from({length: count}, () => '🟊')

  // Internal handle change function
  const handleChange = (value) => {
    onChange(value + 1);
  }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}
                key={index}
                style={{color: style, width:size, height:size, fontSize: size}}
                onClick={()=>handleChange(index)}>{s}</span>
        )
      })}
      {value}
    </div>
  )
}
const StarRating=()=>{
  // Get the rating from a db if required.
  // The value 3 is just for testing.
  const [rating, setRating] = useState(5);

  const handleChange = (value) => {
    setRating(value);
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="col-9">
        <h2>Star Rating Demo</h2>

        <Rating
          count={5}
          size={40}
          value={rating}
          activeColor ={'yellow'}
          inactiveColor={'#ddd'}
          onChange={handleChange}  />
      </div>
    </div>
  )
}
export default StarRating;