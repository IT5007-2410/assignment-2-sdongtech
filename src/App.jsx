/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1,
    name: 'Jack',
    phone: 88885555,
    email: 'jack@gmail.com',
    age: 25,
    passportNumber: 'EK23456',
    gender: 'male',
    bookingTime: new Date().toLocaleString(),
    seatNumber: '01A',
  },
  {
    id: 2,
    name: 'Rose',
    phone: 88884444,
    email: 'rose@gmail.com',
    age: 22,
    passportNumber: 'EK56789',
    gender: 'female',
    bookingTime: new Date().toLocaleString(),
    seatNumber: '02B',
  },
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.age}</td>
      <td>{traveller.passportNumber}</td>
      <td>{traveller.gender}</td>
      <td>{traveller.bookingTime}</td>
      <td>{traveller.seatNumber}</td>    
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Age</th>
          <th>Passport Number</th>
          <th>Gender</th>
          <th>Booking Time</th>
          <th>Booking Seat</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers && travellers.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}        
      </tbody>
    </table>
  );
}


class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Retrieve passenger information from the form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    this.props.bookTraveller({
      name: form.travellerName.value,
      phone: form.travellerPhone.value,
      email: form.travellerEmail.value,
      age: form.travellerAge.value,
      passportNumber: form.travellerPassport.value,
      gender: form.travellerGender.value,
      bookingTime: new Date().toLocaleString(),
      seatNumber: form.travellerSeat.value,
    });
    // Reset form fields
    form.travellerName.value = '';
    form.travellerPhone.value = '';
    form.travellerEmail.value = '';
    form.travellerAge.value = '';
    form.travellerPassport.value = '';
    form.travellerGender.value = '';
    form.travellerSeat.value = '';
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Enter passenger details here. The following is an example.*/}
        <label>Full Name: </label>
        <input type="text" name="travellerName" required/>

        <label>Contact Number: </label>
        <input type="text" name="travellerPhone" required/>

        <label>Email Address: </label>
        <input type="text" name="travellerEmail" required/>

        <label>Age: </label>
        <input type="text" name="travellerAge" required/>

        <label>Passport ID: </label>
        <input type="text" name="travellerPassport" required/>

        <label>Gender: </label>
        <select name="travellerGender" required>
          <option key="male" value="male">Male</option>
          <option key="female" value="female">Female</option>
          <option key="others" value="others">Others</option>
        </select>

        <label>Seat Number: </label>
        <select name="travellerSeat" required>
          {this.props.seats[0].seats.map((row, rowIndex) => (
            row.map((seat, colIndex) => (
              <option key={`0${colIndex + 1}${String.fromCharCode(65 + rowIndex)}`} value={`0${colIndex + 1}${String.fromCharCode(65 + rowIndex)}`}>
                {`0${colIndex + 1}${String.fromCharCode(65 + rowIndex)}`}
              </option>
            )))
          )}
        </select>

        <button>Submit</button>
      </form>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    /*Q5. Fetch the passenger details from the delete form and call deleteTraveller() */
    const formElement = document.forms.deleteTraveller;
    this.props.deleteTraveller({
      name: formElement.travellerName.value,
      passportNumber: formElement.travellerPassport.value,
    });
    // Clear form fields after submission
    formElement.travellerName.value = '';
    formElement.travellerPassport.value = '';    
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/* Q5. Placeholder form to input the passenger's details to be deleted. The below code is just an example. */}
        <label>Name:</label>
        <input type="text" name="travellerName" />

        <label>Passport Number: </label>
        <input type="text" name="travellerPassport" />

        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* Q2. Placeholder for Homepage code that visually displays available seats. */}
        {this.props.seats.map((train, trainIndex) => {
          const availableCount = train.seats.reduce((accum, row) => {
            return accum + row.filter((seatStatus) => seatStatus === 'unreserved').length;
          }, 0);

          return (
            <div key={trainIndex}>
              <h3 style={{ margin: '0' }}>Train Number: {train.rideNumber}</h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {train.seats.map((row, rowIndex) => (
                  <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((seatStatus, colIndex) => (
                      <div
                        key={colIndex}
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: '5px',
                          backgroundColor: seatStatus === 'unreserved' ? 'green' : 'grey',
                          border: '1px solid black',
                          display: 'flex',
                        }}
                      >
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <h4>Available Seats: {availableCount} / 10</h4>
              <br /><br />
            </div>
          );
        })}
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.emptySeats = [
      {
        rideNumber: 'G01',
        seats: Array(2).fill().map(() => Array(5).fill('unreserved'))
      }
    ];
    this.state = { seats: this.emptySeats };    
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    if (value === 1) {
      this.setState({selector: 1});
    }
    if (value === 2) {
      this.setState({selector: 2});
    }
    if (value === 3) {
      this.setState({selector: 3});
    }
    if (value === 4) {
      this.setState({selector: 4});
    }    
  }
  componentDidMount() {
    this.setState({ selector: 1 }); 
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
    initialTravellers.forEach((traveller) => {
      this.updateSeats(traveller, 'add');
    }
    );    
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    
    // Check if all seats are occupied
    const totalSeats = this.state.seats[0].seats.length * this.state.seats[0].seats[0].length;
    if (this.state.travellers.length >= totalSeats) {
      alert("All seats are occupied. No more bookings are allowed.");
      return; // Stop adding more passengers
    }
  
    const newTravellers = this.state.travellers.slice();
  
    // Check if the seat is already booked
    if (newTravellers.some(traveller => passenger.seatNumber === traveller.seatNumber)) {
      alert('Seat is already booked');
      return;
    }
  
    // Add new passenger
    newTravellers.push({
      id: this.state.travellers.length + 1,
      name: passenger.name,
      phone: passenger.phone,
      email: passenger.email,
      age: passenger.age,
      passportNumber: passenger.passportNumber,
      gender: passenger.gender,
      bookingTime: passenger.bookingTime,
      seatNumber: passenger.seatNumber,
    });
  
    this.setState({ travellers: newTravellers });
    this.updateSeats(passenger, 'add');
    alert('Added Successfully');
  }
  

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const newTravellers = this.state.travellers.slice();
    const indicesToDelete = newTravellers
      .map((traveller, index) => 
        traveller.name === passenger.name && traveller.passportNumber === passenger.passportNumber ? index : -1
      )
      .filter(index => index !== -1);

    if (indicesToDelete.length === 0) {
      alert('Traveller not found or the passport number is incorrect');
      return;
    }

    for (let i = indicesToDelete.length - 1; i >= 0; i--) {
      newTravellers.splice(indicesToDelete[i], 1);
      passenger.seatNumber = this.state.travellers[indicesToDelete[i]].seatNumber;
      this.updateSeats(passenger, 'delete');
    }

    this.setState({travellers: newTravellers});
    alert('Deleted Successfully');
  }

  updateSeats(passenger, type) {
    const curSeat = passenger.seatNumber;
    const row = curSeat.charCodeAt(2) - 65;
    const col = parseInt(curSeat[1]) - 1;
    const newSeats = this.state.seats;
    newSeats[0].seats[row][col] = type === 'add' ? 'reserved' : 'unreserved';
    this.setState({ seats: newSeats });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
      <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <nav>
            <button style={{ marginRight: '10px' }} onClick={() => this.setSelector(1)}>Homepage</button>
            <button style={{ marginRight: '10px' }} onClick={() => this.setSelector(2)}>Display</button>
            <button style={{ marginRight: '10px' }} onClick={() => this.setSelector(3)}>Add</button>
            <button onClick={() => this.setSelector(4)}>Delete</button>
          </nav>
          <br /><br />
      </div>
      <div>
        {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
        {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
        {this.state.selector === 1 && <Homepage seats={this.state.seats}/>}
        {/*Q3. Code to call component that Displays Travellers.*/}
        {this.state.selector === 2 && <Display travellers={this.state.travellers}/>}
        {/*Q4. Code to call the component that adds a traveller.*/}
        {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} seats={this.state.seats}/>}
        {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller}/>}
      </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
