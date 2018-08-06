var Header = React.createClass({
  render: function() {
    return(
        <div>
          <h5><i><b>&nbsp;USD - United States Dollars</b></i></h5>
          <h2>
          <div className="row">
              <div className="col-auto mr-auto">&nbsp;USD</div>
              <div className="col-auto">10.0000&nbsp;</div>
          </div>
          </h2>
        </div>
      );
  }
});

var ExchangeUSD = React.createClass({
  getInitialState: function() {
    return {
      kurs: []
    }
  },

  componentDidMount: function() {
    var kursName = this.props.name;
    var url = "https://exchangeratesapi.io/api/latest?base=USD&symbols="+kursName;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({ kurs: res });
        this.setState({ kursValue: res.rates[kursName] });
        console.log("Hasil", this.state.kurs.rates[kursName])
      })
      .catch(error => console.log(error))
  },

  render: function() {
    var kursValue = this.state.kursValue*10;
    var nf = new Intl.NumberFormat('en-ID', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 4 
});
    return(
      <div className="container">
      <div className="row">
        <div className="col border border-dark">
          <h3>
          <div className="row">
          <div className="col-auto mr-auto">&nbsp;{this.props.name}</div>
          <div className="col-auto">{nf.format(kursValue)}&nbsp;</div>
          </div>
          </h3>
          <h5><i><b>&nbsp;{this.props.name} - {this.props.longname}</b></i></h5>
          <h5>&nbsp;1 USD = {this.props.name} {nf.format(this.state.kursValue)}</h5>
        </div>
        <div className="col-auto border border-dark">(&nbsp;-&nbsp;)</div>
      </div>
      </div>
      );
  }  
})

var ExchangeList = React.createClass({
  getInitialState: function() {
    return {
      firstKursList: [
        {name: "IDR", longname: "Indonesian Rupiah"},
        {name: "EUR", longname: "Euro"},
        {name: "GBP", longname: "British Pound"},
        {name: "SGD", longname: "Singapore Dollar"}
      ]
    }
  },

  addToKursList: function(exchangeName) {
    this.setState({
      firstKursList: this.state.firstKursList.concat(exchangeName)
    })
  },

  removeFromKursList(exchangeName) {
  this.setState(prevState => {
    firstKursList: prevState.firstKursList.filter(i => i !== exchangeName)
  });
  },

  render: function() {
    var kurslists = this.state.firstKursList.map(function(kurslist) {
      return (
        <div key={kurslist.name}><br/>
        <ExchangeUSD name={kurslist.name} longname={kurslist.longname}/>
        </div>
      );
    });

    return(
      <div>
        {kurslists}
        <ExchangeForm handleCreate={this.addToKursList}/>
      </div>
    );
  }
});

var ExchangeAdd = React.createClass({
  add: function(){
    return(
      alert("Add")
    );
  },

  render: function() {
    return (
      <div>
      <br/>
        <button onClick={this.add}>( + ) Add More Currency</button><br/>
      </div>
    );
  }
});

var ExchangeForm = React.createClass({
  getLongname(name) {
    switch(name) {
      case "USD":
        return "United States Dollar"; break;
      case "CAD":
        return "Canadian Dollar"; break;
      case "IDR":
        return "Indonesian Rupiah"; break;
      case "GBP":
        return "British Pound"; break;
      case "EUR":
        return "Euro"; break;
      case "CHF":
        return "Swiss Franc"; break;
      case "SGD":
        return "Singapore Dollar"; break;
      case "INR":
        return "Indian Rupee"; break;
      case "MYR":
        return "Malaysian Ringgit"; break;
      case "JPY":
        return "Japanese yen"; break;
      case "KRW":
        return "South Korean Won"; break;
    }
  },

  submit: function(e){
    e.preventDefault();
    var name= this.refs.name.value.toUpperCase();
    var longname = this.getLongname(this.refs.name.value.toUpperCase());

    var exchange={
      name: name,
      longname: longname
    }
    this.props.handleCreate(exchange);
    
    this.refs.name.value="";
  },

  render: function() {
    return (
      <form onSubmit={this.submit}>
        <br/>
        <input type="text" ref="name"/>&nbsp;
        <button>Submit</button>
      </form>
    );
  }
});

ReactDOM.render(<Header/>, document.getElementById("header"));
ReactDOM.render(<ExchangeList/>, document.getElementById("main"));