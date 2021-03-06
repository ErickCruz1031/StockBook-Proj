import React, { Component } from 'react';
import './App.css';
import { Button, Div, Icon, Input, Image} from "react-atomize";
import { ItemSection } from "./newsComponent"
import { NewsItem } from "./newsItem"
import { CompanyPage } from "./companyPage"

class App extends Component{
  state = {
    showCompanyPage : false,
    showBookPage : false,
    url : "null",
    showing: true
  }

  componentDidMount(){
    console.log("This component was mounted. Calling the API");
    fetch('https://api.polygon.io/v1/meta/symbols/AAPL/news?perpage=5&page=1&apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e')
        .then(response => response.json())
        .then(data => this.setState({ url: data[0].image }));

  }

  render () {

      return (


        <Div className="App" w = "100%" h ="100%">
          <Div className = "Top-Page" bg="brand700" d="flex" align="center "p="1rem" w="100%" h="8%" > 
              <Button
              bg="warning700"
              hoverBg="warning600"
              rounded="circle"
              shadow="2"
              hoverShadow="4">
              <Icon name="HomeSolid" color="white" />
            </Button>

          </Div>

          <Div className="Bottom-Page" w="100%" h="92%">

            <Div className="searchBar" w="100%" h="8%"  d="flex"> 
              <Div className="InputWrapper" w="50%" p={{l:"25%", t:"2%"}}>
                <Input w="100%" placeholder="Stock Ticker"/>
              </Div>

              <Div className="buttonWrapper" w="50%" p={{l:"5%", t:"2%"}}>
                <Button
                  bg="warning700"
                  hoverBg="warning600"
                  rounded="circle"
                  shadow="2"
                  hoverShadow="4"
                  onClick={() => this.setState({showing: !this.state.showing })}>
                  <Icon name="Search" color="white" />
                </Button> 
                
              </Div>
            </Div>

             <Div className="Dynamic-Page" w="100%" h="92%" d="flex" flexDir="column" p={{l:"2%", t:"2%", r:"2%",b:"2%"}} >
              { this.state.showing 
                ? 
                    <Div className="Company-Page" w="100%" h="100%">
                      <Div className="First-Module" w="100%" h="100%" flexDir="column">
                        <CompanyPage stock="TSLA"/>

                      </Div>
                    </Div>
                  
                : <Div className="Company-Page" w="100%" h="100%">
                    <Div className="First-Module" w="100%" h="100%" flexDir="column">
                      <ItemSection />

                    </Div>
                  </Div>

              }
            </Div>
          </Div>
        </Div>


        

      );

  }



}



//https://stackoverflow.com/questions/41819342/how-to-hide-and-show-a-div-in-react
//How to hide the react with an onclick function



async function activateSearch(){
  const baseURL = "https://api.polygon.io/v1/meta/symbols/" //Base URL for the call 
  const apiKey = "EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e"
  //"https://api.polygon.io/v1/meta/symbols/AAPL/company?apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e"
  //https://api.polygon.io/v1/meta/symbols/AAPL/news?perpage=50&page=1&apiKey=EwdgXn2W7ptj4vkx9B40T3HiVEvV4v3e

  console.log("Clicked the search button")
  
  var ticker = document.getElementById("searchInput").value.toUpperCase();
  console.log("The input was " + ticker)

  const req = baseURL + ticker + "/company?apikey=" + apiKey;
  console.log("We are going to call it with this URL:"+ req);

  const response = await fetch(req);
  const data = await response.json();
  console.log(data);
  //Have to implement what to do with the actual data 

}//Function gathers data from input box and calls the API to get company information


//The thing that lets you select from a dropdpwn is <select>, and each line in it is <option> 
//For the API use polygon.io
//<a id = "home" href="#home">Home</a>
export default App;
