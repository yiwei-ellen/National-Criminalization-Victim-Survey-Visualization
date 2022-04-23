import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllHouseholds, getAllPersons } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const playerColumns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
  },
  {
    title: 'Nationality',
    dataIndex: 'Nationality',
    key: 'Nationality',
    sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
  },
  {
    title: 'Rating',
    dataIndex: 'Rating',
    key: 'Rating',
    sorter: (a, b) => a.Rating - b.Rating
    
  },
  {
    title: 'Potential',
    dataIndex: 'Potential',
    key: 'Potential',
    sorter: (a, b) => a.Potential - b.Potential
    
  },
  {
    title: 'Club',
    dataIndex: 'Club',
    key: 'Club',
    sorter: (a, b) => a.Club.localeCompare(b.Club)
  },
  {
    title: 'Value',
    dataIndex: 'Value',
    key: 'Value'
  },
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  // TASK 8: add a column for Club, with the ability to (alphabetically) sort 
  // TASK 9: add a column for Value - no sorting required
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null  
    }

  }


  componentDidMount() {
    getAllHouseholds(null, null).then(res => {
      this.setState({ matchesResults: res.results })
    })

    getAllPersons().then(res => {
      console.log(res.results)
      this.setState({playersResults:res.results})
      // TASK 1: set the correct state attribute to res.results
    })

 
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h1>Home</h1>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <p>
        The NCVS contains personal crime data with details about the crime including time,
location, victim relationship, various characteristics of the offender, and other reported details
from the victim. The incident dataset is associated with a household dataset and a person
dataset, providing more insights about the background of the offender. The NCVS household
and person datasets are created through interviewing a total of seven times over three years
and random monthly sampling of households by U.S. Census Bureau. Overall each dataset
has 400-1200 columns, we are picking out the important and interesting variables in each
dataset for this project’s sake.
        </p>
        <img src="../img.png" ></img>
        </div>
        
       
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Persons</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Households</h3>
          
          <Table  dataSource={this.state.matchesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Teams">
              {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
              <Column title="Home" dataIndex="Home" key="Home" sorter= {(a, b) => a.Home.localeCompare(b.Home)}/>
              <Column title="Away" dataIndex="Away" key="Away" sorter= {(a, b) => a.Away.localeCompare(b.Away)}/>            
            </ColumnGroup>
            <ColumnGroup title="Goals">
              {/* TASK 5: add columns for home and away goals in this ColumnGroup, with the ability to sort values in these columns numerically */}
              <Column title="HomeGoals" dataIndex="HomeGoals" key="HomeGoals" sorter= {(a, b) => a.HomeGoals.localeCompare(b.HomeGoals)}/>
              <Column title="AwayGoals" dataIndex="AwayGoals" key="AwayGoals" sorter= {(a, b) => a.AwayGoals.localeCompare(b.AwayGoals)}/>
            </ColumnGroup>
            <Column title="Date" dataIndex="Date" key="Date" />
            <Column title="Time" dataIndex="Time" key="Time" />
             {/* TASK 6: create two columns (independent - not in a column group) for the date and time. Do not add a sorting functionality */}
          </Table>

        </div>


      </div>
    )
  }

}

export default HomePage

